#!/usr/bin/env bash
# This script made for testing api endpoints
# Requirements:
#   - The curl programm must be installed `apt-get install -y curl`
#   - The 'json' package must be installed globally `npm install -g json`
#
# Example Usage:
# ./test.bash {REQUEST_METHOD} {REQUESTED_RESOURCE} {REQUEST_PAYLOAD}

curl -s -X "$1" -H "Content-Type: application/json" -d "$3" localhost:3000/api/v1/"$2" | json
