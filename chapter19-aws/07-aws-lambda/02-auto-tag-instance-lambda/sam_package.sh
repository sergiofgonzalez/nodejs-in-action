#!/bin/bash

PROFILE_NAME=${1:-default}
STACK_NAME=sam-auto-tag-instance
DEPLOYMENT_BUCKET=${STACK_NAME}-deployment

# ANSI styling
ANSI_BOLD="\e[1m"
ANSI_UNDERLINE="\e[4m"
ANSI_RED="\e[31m"
ANSI_BLUE="\e[34m"
ANSI_GREEN="\e[92m"
ANSI_RESET="\e[0m"

# a few shortcuts
LOG_INFO="${ANSI_BOLD}${ANSI_GREEN}INFO:${ANSI_RESET}"


if [[ "$PROFILE_NAME" != "default" ]]; then
    echo -e "${LOG_INFO} Using AWS profile ${ANSI_BOLD}${ANSI_BLUE}${PROFILE_NAME}${ANSI_RESET}"
else
    echo -e "${LOG_INFO} Using ${ANSI_BOLD}${ANSI_BLUE}default${ANSI_RESET} profile"
fi

aws --profile $PROFILE_NAME \
s3api \
head-bucket --bucket $DEPLOYMENT_BUCKET
if [[ $? -ne 0 ]]; then
    echo -e "${LOG_INFO} Creating deployment bucket: ${ANSI_BOLD}${ANSI_GREEN}${DEPLOYMENT_BUCKET}${ANSI_RESET}"
    aws --profile $PROFILE_NAME \
    s3 mb s3://${DEPLOYMENT_BUCKET}

    # blocking public access to bucket
    aws --profile $PROFILE_NAME \
    s3api put-public-access-block \
    --bucket ${DEPLOYMENT_BUCKET} \
    --public-access-block-configuration '{"BlockPublicAcls": true, "IgnorePublicAcls": true, "BlockPublicPolicy": true, "RestrictPublicBuckets": true}'

    # putting default bucket encryption
    aws --profile $PROFILE_NAME \
    s3api put-bucket-encryption \
    --bucket ${DEPLOYMENT_BUCKET} \
    --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
else
    echo -e "${LOG_INFO} Using deployment bucket: ${ANSI_BOLD}${ANSI_BLUE}${DEPLOYMENT_BUCKET}${ANSI_RESET}"
fi

echo -e "${LOG_INFO} Packaging ${STACK_NAME}..."
aws --profile $PROFILE_NAME \
cloudformation package \
--template-file ${STACK_NAME}.yml \
--s3-bucket ${DEPLOYMENT_BUCKET} \
--output-template-file output.yml

echo -e "$LOG_INFO Successfully completed"