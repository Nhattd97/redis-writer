import { discovery } from "@kobiton/core-service-new"
import {
  CONSUL_AGENT_HOST,
  CONSUL_AGENT_PORT,
  CONSUL_AUTH_TOKEN,
} from "../config"

export function setupDiscovery() {
  discovery.initialize({
    host: CONSUL_AGENT_HOST,
    port: CONSUL_AGENT_PORT,
    token: CONSUL_AUTH_TOKEN,
  })
}
