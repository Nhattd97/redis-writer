#!/bin/bash

echo "Use following env vars: \

  - KOBITON_DEVICE_CONNECTOR_GRPC_NODE_ID=device-connector-1
  - KOBITON_DEVICE_CONNECTOR_GRPC_HOST=localhost
  - KOBITON_DEVICE_CONNECTOR_GRPC_PORT=7018
to override default values"

# DEVICE CONNECTOR environment variables
device_connector_grpc_node_id=${KOBITON_DEVICE_CONNECTOR_GRPC_NODE_ID:-device-connector-1}
device_connector_grpc_port=${KOBITON_DEVICE_CONNECTOR_GRPC_PORT:-7018}
device_connector_grpc_host=${KOBITON_DEVICE_CONNECTOR_GRPC_HOST:-localhost}

# Other
consul_client_container_name=consul-client-node
filename=device-connector.json
temp_service_file=/tmp/$filename

# This json file is for local development therefore configurations are for that purpose
cat <<EOT > $temp_service_file
{
  "service": {
    "id": "$device_connector_grpc_node_id",
    "name": "device-connector",
    "tags": ["aws-us-east-1"],
    "Address": "$device_connector_grpc_host",
    "Port": $device_connector_grpc_port,
    "meta": {
      "grpc_service_private_url": "$device_connector_grpc_host:$device_connector_grpc_port"
    }
  }
}
EOT

# Execute to Docker
docker cp $temp_service_file $consul_client_container_name:/consul/config/$filename
docker exec $consul_client_container_name consul services deregister /consul/config/$filename
docker exec $consul_client_container_name consul services register /consul/config/$filename
