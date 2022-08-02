import { debug } from "@kobiton/core-util"
import { setupDiscovery } from "./consul"
import { initLogStash } from "./log"
import { setupKafka } from "./kafka"
import { LOGGING_COMPONENT_NAME } from "./config"

/**
 * Initialize services
 */
async function start() {
  try {
    initLogStash()
    setupDiscovery()
    await setupKafka()
    debug.log(LOGGING_COMPONENT_NAME, `Start success!`)
  } catch (err) {
    debug.log(LOGGING_COMPONENT_NAME, `Fail to start redis-writer with error: ${err}`)
  }
}

start()
