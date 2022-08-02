import { discovery } from "@kobiton/core-service-new"
import { initKafkaTopicConsumer } from "./consumer"
import { KAFKA_NODE_ID } from "../config"
import { isEmpty } from "lodash"
import { 
  DEVICE_CONNECT_DEVICE_STATE_FEATURE_KEY,
} from "../constants"
import {
  deviceStateMessageHandler,
} from './handlers'

export async function setupKafka() {
  await discovery.kafka.initializeClusterMetadata(KAFKA_NODE_ID)
  const bootstrapServers = discovery.kafka.getBootstrapServers()

  if (isEmpty(bootstrapServers)) {
    throw new Error(
      "Kafka bootstrap servers is empty. Please double check in discovery service. Exiting..."
    )
  }

  // Init kafka topic consumers
  await initKafkaTopicConsumer(
    {
      serviceKey: DEVICE_CONNECT_DEVICE_STATE_FEATURE_KEY,
      ns: "device-connect-device-state-consumer",
      groupId: "device-connect-device-state-consumer",
      kafkaBrokerList: bootstrapServers
    }, deviceStateMessageHandler,
    {
      numberOfMessagesToFetchPerInterval: 10,
      intervalTimeInMs: 1000
    }
  )
}
