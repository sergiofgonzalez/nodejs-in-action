#!/bin/bash -e

KEY_PAIR_NAME=$1
MY_PUBLIC_IP_ADDRESS="$(curl --silent 'https://api64.ipify.org?format=text')"
PROFILE_NAME=${2:-default}

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


VpcId="$(aws --profile $PROFILE_NAME \
ec2 describe-vpcs \
--filters "Name=isDefault,Values=true" \
--query "Vpcs[0].VpcId" \
--output text)"

SubnetId="$(aws --profile $PROFILE_NAME \
ec2 describe-subnets \
--filters "Name=vpc-id,Values=$VpcId" \
--query "Subnets[0].SubnetId" \
--output text)"

echo "INFO: VPC ID: $VpcId, Subnet ID: $SubnetId"

STACK_NAME=ec2-instance-with-sg

aws --profile $PROFILE_NAME \
cloudformation create-stack \
--stack-name $STACK_NAME \
--template-body file://ec2-instance-security-group.yml \
--parameters "ParameterKey=KeyName,ParameterValue=$KEY_PAIR_NAME" \
"ParameterKey=VPC,ParameterValue=$VpcId" \
"ParameterKey=Subnet,ParameterValue=$SubnetId" \
"ParameterKey=IpForSSH,ParameterValue=$MY_PUBLIC_IP_ADDRESS"

echo "INFO: creating stack $STACK_NAME"

aws --profile $PROFILE_NAME \
cloudformation wait stack-create-complete \
--stack-name $STACK_NAME

echo "INFO: $STACK_NAME creation completed"

aws --profile $PROFILE_NAME \
cloudformation describe-stacks \
--stack-name $STACK_NAME \
--query "Stacks[0].Outputs"
