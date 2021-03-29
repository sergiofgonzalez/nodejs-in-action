#!/bin/bash -e


KEY_PAIR_NAME=$1
PROFILE_NAME=${2:-default}
MY_PUBLIC_IP_ADDRESS="$(curl --silent 'https://api64.ipify.org?format=text')"
STACK_NAME="vpc-subnets-stage-2"

if [ -z "$KEY_PAIR_NAME" ]; then
    echo "ERROR: You must pass the key pair name as the first argument"
    echo "e.g. $0 mykey"
    exit 1
else
    echo "INFO: Key Pair name=$KEY_PAIR_NAME"
fi

if [ -z "$MY_PUBLIC_IP_ADDRESS" ]; then
    echo "ERROR: Could not obtain my public ip address"
    exit 1
else
    echo "INFO: my public IP address is $MY_PUBLIC_IP_ADDRESS"
fi

if [[ "$PROFILE_NAME" != "default" ]]; then
    echo "INFO: using AWS profile ${PROFILE_NAME}"
else
    echo "INFO: using default profile"
fi


aws --profile $PROFILE_NAME \
cloudformation update-stack \
--stack-name $STACK_NAME \
--template-body file://${STACK_NAME}.yml \
--parameters "ParameterKey=KeyName,ParameterValue=$KEY_PAIR_NAME" \
"ParameterKey=IpForBastionSSHAccess,ParameterValue=$MY_PUBLIC_IP_ADDRESS" \
--capabilities CAPABILITY_IAM

echo "INFO: updating stack $STACK_NAME"

aws --profile $PROFILE_NAME \
cloudformation wait stack-update-complete \
--stack-name $STACK_NAME

echo "INFO: $STACK_NAME update completed"

aws --profile $PROFILE_NAME \
cloudformation describe-stacks \
--stack-name $STACK_NAME \
--query "Stacks[0].Outputs"
