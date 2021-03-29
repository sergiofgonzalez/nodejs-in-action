#!/bin/bash -e

PROFILE_NAME=${1:-default}
STACK_NAME=sam-auto-tag-instance
CLOUD_TRAIL_BUCKET_PREFIX="${STACK_NAME}-"
CLOUD_TRAIL_BUCKET_SUFFIX="-cloudtrail-logs"

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
LOG_ERROR="${ANSI_BOLD}${ANSI_RED}ERROR:${ANSI_RESET}"

if [[ "$PROFILE_NAME" != "default" ]]; then
    echo -e "$LOG_INFO Using AWS profile ${ANSI_BOLD}${ANSI_BLUE}${PROFILE_NAME}${ANSI_RESET}"
else
    echo -e "$LOG_INFO using ${ANSI_BOLD}${ANSI_BLUE}default${ANSI_RESET} profile"
fi

# Getting AccountID
echo -e "$LOG_INFO Getting AWS Account ID to identify CloudTrail bucket"
ACCOUNT_ID="$(aws --profile $PROFILE_NAME \
sts get-caller-identity \
--query "Account" \
--output text
)"

CLOUD_TRAIL_BUCKET=${CLOUD_TRAIL_BUCKET_PREFIX}${ACCOUNT_ID}${CLOUD_TRAIL_BUCKET_SUFFIX}
echo -e "$LOG_INFO CloudTrail bucket: ${ANSI_BLUE}${ANSI_BOLD}${CLOUD_TRAIL_BUCKET}${ANSI_RESET}"


# Checking if stack exists: the command itself throws an error if it doesn't exist
STACK_INFO="$(aws --profile $PROFILE_NAME \
cloudformation describe-stacks \
--stack-name $STACK_NAME)"

echo -e "$LOG_INFO About to delete stack ${ANSI_BOLD}${ANSI_RED}${STACK_NAME}${ANSI_RESET}:"

read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo -e "$LOG_ERROR Operation aborted by the user"
    exit 1
fi


aws --profile $PROFILE_NAME \
cloudformation delete-stack \
--stack-name $STACK_NAME

echo -e "$LOG_INFO Deleting stack ${ANSI_BLUE}${ANSI_BOLD}$STACK_NAME${ANSI_RESET}"

aws --profile $PROFILE_NAME \
cloudformation wait stack-delete-complete \
--stack-name $STACK_NAME

echo -e "$LOG_INFO ${ANSI_GREEN}${ANSI_BOLD}$STACK_NAME${ANSI_RESET} deletion completed"

echo -e "$LOG_INFO ${ANSI_RED}${ANSI_BOLD}deleting${ANSI_RESET} cloudtrail logs bucket"
aws --profile $PROFILE_NAME \
s3 rb \
s3://${CLOUD_TRAIL_BUCKET} --force

echo -e "$LOG_INFO ${ANSI_RED}${ANSI_BOLD}deleting${ANSI_RESET} deployment bucket"
aws --profile $PROFILE_NAME \
s3 rb \
s3://${DEPLOYMENT_BUCKET} --force

echo -e "$LOG_INFO removal completed"
echo -e "   + Stack: ${ANSI_GREEN}${ANSI_BOLD}$STACK_NAME${ANSI_RESET}"
echo -e "   + CloudTrail Bucket: ${ANSI_GREEN}${ANSI_BOLD}$CLOUD_TRAIL_BUCKET${ANSI_RESET}"
echo -e "   + Deployment Bucket: ${ANSI_GREEN}${ANSI_BOLD}$DEPLOYMENT_BUCKET${ANSI_RESET}"

echo -e "$LOG_INFO Successfully completed"