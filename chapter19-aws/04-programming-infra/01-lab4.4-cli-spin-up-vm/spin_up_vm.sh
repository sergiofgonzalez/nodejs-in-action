#!/bin/bash -e

PROFILE_NAME=${1:-default}
IMAGE_NAME='amzn2-ami-hvm-2.0.20210219.*-x86_64-gp2'

# ANSI styling
BOLD_START="\e[1m"
UNDERLINE_START="\e[4m"
RED_START="\e[31m"
BLUE_START="\e[34m"
GREEN_START="\e[92m"
STYLE_END="\e[0m"

if [[ "$PROFILE_NAME" != "default" ]]; then
    echo -e "INFO: Using ${BOLD_START}${BLUE_START}--profile $PROFILE_NAME${STYLE_END}"
    KEY_PAIR_NAME=$2
    if [ -z "$KEY_PAIR_NAME" ]; then
        echo "WARN: key pair has not been explicitly set"
        KEY_PAIR_NAME=$1
    fi
    echo -e "INFO: Will use key pair ${BOLD_START}${BLUE_START}$KEY_PAIR_NAME${STYLE_END}"
fi

echo -e "About to spin up a ${BOLD_START}${RED_START}new EC2 instance${STYLE_END}:"
echo -e " * AWS Profile : ${BOLD_START}${GREEN_START}${PROFILE_NAME}${STYLE_END}"
echo -e " * Key pair    : ${BOLD_START}${GREEN_START}${KEY_PAIR_NAME}${STYLE_END}"
echo -e " * Image Name  : ${BOLD_START}${GREEN_START}${IMAGE_NAME}${STYLE_END}"

read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo "${BOLD_START}${RED_START}ERROR${STYLE_END}: operation aborted by the user"
    exit 1
fi

## Obtain the AMI_ID whose name matches a given pattern

# using the AMI ID from the console is easier and faster,
# but kept the call here for reference
AMI_ID="$(aws \
--profile $PROFILE_NAME \
ec2 describe-images \
--filters "Name=name,Values=$IMAGE_NAME" \
--query "Images[0].ImageId" \
--output text)"

echo -e "INFO: will use ${BOLD_START}${BLUE_START}AMI_ID=${AMI_ID}${STYLE_END}"

## Obtain the default VPC_ID and first subnet_id
VPC_ID="$(aws \
--profile $PROFILE_NAME \
ec2 describe-vpcs \
--filters "Name=isDefault,Values=true" \
--query "Vpcs[0].VpcId" \
--output text)"

SUBNET_ID="$(aws \
--profile $PROFILE_NAME \
ec2 describe-subnets \
--filters "Name=vpc-id,Values=$VPC_ID" \
--query "Subnets[0].SubnetId" \
--output text)"

echo -e "INFO: machine will be placed into ${BOLD_START}${BLUE_START}$VPC_ID (subnet: $SUBNET_ID)${STYLE_END}"


## Create a security group that allows inbound traffic in port 22
SG_ID="$(aws \
--profile $PROFILE_NAME \
ec2 create-security-group \
--group-name temp-security-group \
--description "Temporaty security group created by spin_up_vm.sh" \
--vpc-id "$VPC_ID" \
--output text)"

aws \
--profile $PROFILE_NAME \
ec2 authorize-security-group-ingress \
--group-id "$SG_ID" \
--protocol tcp --port 22 --cidr 0.0.0.0/0

echo -e "INFO: created security group ${BOLD_START}${BLUE_START}$SG_ID${STYLE_END} with port ${BOLD_START}${RED_START}22 opened to the world${STYLE_END}"

## Spin up the EC2 instance
INSTANCE_ID=$(aws \
--profile $PROFILE_NAME \
ec2 run-instances \
--image-id "$AMI_ID" \
--key-name "$KEY_PAIR_NAME" \
--instance-type t2.micro \
--security-group-ids "$SG_ID" \
--subnet-id "$SUBNET_ID" \
--query "Instances[0].InstanceId" \
--output text)

echo -e "INFO: instance ${BOLD_START}${GREEN_START}$INSTANCE_ID${STYLE_END} starting!"

aws \
--profile $PROFILE_NAME \
ec2 wait instance-running \
--instance-ids "$INSTANCE_ID"

## Print the ssh command to connect to the instance
PUBLIC_DNS_NAME="$(aws \
--profile $PROFILE_NAME \
ec2 describe-instances \
--instance-ids "$INSTANCE_ID" \
--query "Reservations[0].Instances[0].PublicDnsName" \
--output text)"

echo -e "INFO: instance ${BOLD_START}${BLUE_START}$INSTANCE_ID${STYLE_END} accepting request under ${BOLD_START}${BLUE_START}$PUBLIC_DNS_NAME${STYLE_END}"
echo -e "INFO: type ${BOLD_START}'ssh -i ~/.ssh/${KEY_PAIR_NAME}.pem ec2-user@${PUBLIC_DNS_NAME}'${STYLE_END} to connect"

read -r -p "$(echo -e "Press ${BOLD_START}[ENTER]${STYLE_END} to ${BOLD_START}${RED_START}terminate${STYLE_END} ${BOLD_START}${BLUE_START}$INSTANCE_ID${STYLE_END}")"

## Cleanup: terminate instance and delete created security group
TERMINATION_JSON="$(aws \
--profile $PROFILE_NAME \
ec2 terminate-instances \
--instance-ids "$INSTANCE_ID")"

echo -e "INFO: terminating ${BOLD_START}${BLUE_START}$INSTANCE_ID${STYLE_END}..."

aws \
--profile $PROFILE_NAME \
ec2 wait instance-terminated \
--instance-ids "$INSTANCE_ID" \

echo -e "INFO: deleting security group ${BOLD_START}${BLUE_START}$SG_ID${STYLE_END}..."
aws \
--profile $PROFILE_NAME \
ec2 delete-security-group \
--group-id "$SG_ID"

echo -e "INFO: ${BOLD_START}${GREEN_START}completed${STYLE_END}"
