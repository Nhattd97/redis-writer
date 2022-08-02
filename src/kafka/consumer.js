import {noop} from 'lodash'
import BPromise from 'bluebird'
import {debug} from '@kobiton/core-util'
import {scheduler} from '@kobiton/core-node'
import { discovery } from "@kobiton/core-service-new"
import KafkaTopicConsumer from '@kobiton/core-service-new/kafka-client/kafka-topic-consumer'

const DEFAULT_KAFKA_CONSUMER_MESSAGES_TO_FETCH_PER_INTERVAL = 1
const DEFAULT_KAFKA_CONSUMER_INTERVAL_TIME_IN_MS = 2000

export async function initKafkaTopicConsumer(consumerConfig, handleMessage = noop, opts = {}) {

  const {serviceKey, ns, groupId, kafkaBrokerList} = consumerConfig
  const {
    numberOfMessagesToFetchPerInterval = DEFAULT_KAFKA_CONSUMER_MESSAGES_TO_FETCH_PER_INTERVAL,
    intervalTimeInMs = DEFAULT_KAFKA_CONSUMER_INTERVAL_TIME_IN_MS
  } = opts
  let deregisterConsumer = noop
  let topicConsumer

  try {
    const serviceConfig = discovery.kafka.getKafkaConfigurationsByServiceKey(serviceKey)

    topicConsumer = new KafkaTopicConsumer(
      {
        ns: ns,
        topicName: serviceConfig.topicName,
        errorListener: (err) => {
          debug.error(ns, "Error on Kafka:", err)
        },
        deliveryReportListener: (err, report) => {
          if (err) {
            debug.error(ns, "Error on delivering message to Kafka", err, report)
          }
        },
      },
      {
        "metadata.broker.list": kafkaBrokerList,
        "group.id": groupId
      }
    )
  
    let messages = []
  
    const unscheduleTask = scheduler.runPeriodically(async () => {
      messages = [] // Drain all messages
      try {
        messages = await topicConsumer.pullMessage(numberOfMessagesToFetchPerInterval)
      }
      catch (ignored) {
        debug.error(ns, 'Error while fetching messages', ignored)
      }
  
      // No need to catch here since _processKafkaMessages already handle exceptions
      await _processKafkaMessages(ns, messages, handleMessage)
    }, {
      intervalTimeInMs,
      shouldScheduleNextTaskImmediately: () => (messages.length > 0),
      onError: (error) => {
        debug.error(ns, 'Error while consuming message from Kafka', error)
      }
    })
  
    deregisterConsumer = async () => {
      unscheduleTask()
      await topicConsumer.disconnect()
    }

    await topicConsumer.connect()
    debug.log(ns, `Listening to Kafka topic "${serviceConfig.topicName}" with consumer group ID "${groupId}"`)
  }
  catch (error) {
    topicConsumer && await topicConsumer.disconnect()
    throw error
  }

  return deregisterConsumer
}

async function _processKafkaMessages(ns, messages = [], handleMessage) {
  await BPromise.each(messages, async (message) => {
    let _ns = ns

    try {
      const value = message.body.value
      const key = message.body.key
      const offset = message.body.offset
      const partition = message.body.partition

      _ns = `${_ns}-offset-${offset}-key-${key}-partition-${partition}`

      const messagePayload = {value, key, offset, partition}

      await BPromise.fromCallback((done) => {
        try {
          handleMessage(_ns, messagePayload, done)
        }
        catch (err) {
          done(err)
        }
      })
    }
    catch (err) {
      debug.error(_ns, 'Error while parsing message from Kafka', err)
    }
    finally {
      // Always commit the message after finish handling it
      // to make sure we won't consume the same message again
      try {
        message.commit()
      }
      catch (ignored) {}
    }
  })
}
