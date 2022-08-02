export const ENVIRONMENT = process.env.KOBITON_ENVIRONMENT || "dev";

//------------ Kafka ----------------//
export const KAFKA_NODE_ID =
  process.env.KOBITON_KAFKA_NODE_ID || "kafka-cluster-1"

// Parameters for communicating with Consul service
export const CONSUL_AGENT_HOST = process.env.KOBITON_CONSUL_HOST || "localhost" // domain or IP
export const CONSUL_AGENT_PORT = Number(
  process.env.KOBITON_CONSUL_PORT || 8500
)
export const CONSUL_AUTH_TOKEN = process.env.KOBITON_CONSUL_AUTH_TOKEN

//------------ Logs ----------------//
export const LOGSTASH_SERVER_HOST =
  process.env.KOBITON_LOGSTASH_SERVER_HOST || ""
export const LOGGING_COMPONENT_NAME =
  process.env.KOBITON_LOGGING_COMPONENT_NAME || "redis-writer"

