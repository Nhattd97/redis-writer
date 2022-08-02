import { network } from "@kobiton/core-node"
import { debug } from "@kobiton/core-util"
import {
  ENVIRONMENT,
  LOGGING_COMPONENT_NAME,
  LOGSTASH_SERVER_HOST,
} from "../config"

export function initLogStash() {
  let ipMachine

  try {
    const interfaceInfo = network.getDefaultInterface()
    ipMachine = interfaceInfo ? interfaceInfo.address : null
  } catch (err) {
    debug.error(LOGGING_COMPONENT_NAME, "Failed to get ip machine", err)
  }

  debug.enable("*", {
    logstash: LOGSTASH_SERVER_HOST,
    ipMachine,
    environment: ENVIRONMENT,
    component: LOGGING_COMPONENT_NAME,
  })

  debug.log(LOGGING_COMPONENT_NAME, "Init log stash success!")
}
