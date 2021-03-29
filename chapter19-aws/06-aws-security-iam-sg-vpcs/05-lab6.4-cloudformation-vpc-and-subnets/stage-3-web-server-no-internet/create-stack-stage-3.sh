#!/bin/bash -e


KEY_PAIR_NAME=$1
WEB_SERVER_AMI_ID=$2
PROFILE_NAME=${3:-default}
MY_PUBLIC_IP_ADDRESS="$(curl --silent 'https://api64.ipify.org?format=text')"
STACK_NAME="vpc-subnets-stage-3"

if [ -z "$KEY_PAIR_NAME" ]; then
    echo "ERROR: You must pass the key pair name as the first argument"
    echo "e.g. $0 mykey ami-xyz"
    exit 1
else
    echo "INFO: Key Pair name=$KEY_PAIR_NAME"
fi

if [ -z "$WEB_SERVER_AMI_ID" ]; then
    echo "ERROR: You must pass the AMI ID of an image with httpd preinstalled as second argument"
    echo "e.g. $0 mykey ami-xyz"
    exit 1
else
    echo "INFO: Web server AMI ID=$WEB_SERVER_AMI_ID"
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
cloudformation create-stack \
--stack-name $STACK_NAME \
--template-body file://${STACK_NAME}.yml \
--parameters "ParameterKey=KeyName,ParameterValue=$KEY_PAIR_NAME" \
"ParameterKey=IpForBastionSSHAccess,ParameterValue=$MY_PUBLIC_IP_ADDRESS" \
"ParameterKey=AmazonLinux2AMIWithHttpd,ParameterValue=$WEB_SERVER_AMI_ID" \
--capabilities CAPABILITY_IAM

echo "INFO: creating stack $STACK_NAME"

aws --profile $PROFILE_NAME \
cloudformation wait stack-create-complete \
--stack-name $STACK_NAME

echo "INFO: $STACK_NAME creation completed"

aws --profile $PROFILE_NAME \
cloudformation describe-stacks \
--stack-name $STACK_NAME \
--query "Stacks[0].Outputs"
