#!/bin/bash -e

PROFILE_NAME=${1:-default}
STACK_NAME=sam-auto-tag-instance

# ANSI styling
ANSI_BOLD="\e[1m"
ANSI_UNDERLINE="\e[4m"
ANSI_RED="\e[31m"
ANSI_BLUE="\e[34m"
ANSI_GREEN="\e[92m"
ANSI_RESET="\e[0m"

# a few shortcuts
LOG_INFO="${ANSI_BOLD}${ANSI_GREEN}INFO:${ANSI_RESET}"

echo -e "$LOG_INFO Deploying ${ANSI_BOLD}${ANSI_BLUE}${STACK_NAME}${ANSI_RESET}"

aws --profile $PROFILE_NAME \
cloudformation deploy \
--stack-name $STACK_NAME \
--template-file output.yml \
--parameter-overrides "ParameterKey=CreateCloudTrail,ParameterValue=true" \
--capabilities CAPABILITY_IAM \

echo -e "$LOG_INFO Successfully completed"