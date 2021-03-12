#!/bin/bash -e

PROFILE_NAME=${1:-default}
STACK_NAME=bastion-host-infra

if [[ "$PROFILE_NAME" != "default" ]]; then
    echo "INFO: using AWS profile ${PROFILE_NAME}"
else
    echo "INFO: using default profile"
fi

# ANSI styling
BOLD_START="\e[1m"
UNDERLINE_START="\e[4m"
RED_START="\e[31m"
BLUE_START="\e[34m"
GREEN_START="\e[92m"
STYLE_END="\e[0m"


# Checking if stack exists: the command itself throws an error
STACK_INFO="$(aws --profile $PROFILE_NAME \
cloudformation describe-stacks \
--stack-name $STACK_NAME)"

echo -e "About to delete stack ${BOLD_START}${RED_START}${STACK_NAME}${STYLE_END}:"

read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo "${BOLD_START}${RED_START}ERROR${STYLE_END}: operation aborted by the user"
    exit 1
fi


aws --profile $PROFILE_NAME \
cloudformation delete-stack \
--stack-name $STACK_NAME

echo "INFO: deleting stack $STACK_NAME"

aws --profile $PROFILE_NAME \
cloudformation wait stack-delete-complete \
--stack-name $STACK_NAME

echo "INFO: $STACK_NAME deletion completed"
