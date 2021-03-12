#!/bin/bash -e

KEY_PAIR_NAME=$1
NUM_MINUTES=$2
PROFILE_NAME=${3:-default}

if [ -z "$KEY_PAIR_NAME" ]; then
    echo "ERROR: You must pass the key pair name as the first argument"
    echo "e.g. $0 mykey {num-minutes}"
    exit 1
else
    echo "INFO: Key Pair name=$KEY_PAIR_NAME"
fi

if [ -z "$NUM_MINUTES" ]; then
    echo "ERROR: You must pass the lifetime of the instance as the second parameter"
    echo "e.g. $0 {key-pair-name} 5"
    exit 1
else
    echo "INFO: Lifetime=$NUM_MINUTES"
fi

if [[ "$PROFILE_NAME" != "default" ]]; then
    echo "INFO: using AWS profile ${PROFILE_NAME}"
else
    echo "INFO: using default profile"
fi

if [ -z "$NUM_MINUTES" ]; then
    echo "ERROR: You must pass the lifetime of the instance as the second parameter"
    echo "e.g. $0 {key-pair-name} 5"
    exit 1
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

STACK_NAME=ec2-instance-self-stop-stack

aws --profile $PROFILE_NAME \
cloudformation create-stack \
--stack-name $STACK_NAME \
--template-body file://ec2-instance-self-stop.yml \
--parameters "ParameterKey=KeyName,ParameterValue=$KEY_PAIR_NAME" \
"ParameterKey=VPC,ParameterValue=$VpcId" \
"ParameterKey=Subnet,ParameterValue=$SubnetId" \
"ParameterKey=Lifetime,ParameterValue=$NUM_MINUTES" \
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

