#!/bin/bash

PROFILE_NAME=${1:-default}
STACK_NAME=lambda-health-check
DEPLOYMENT_BUCKET=${STACK_NAME}-deployment
NAMESPACE=${PROFILE_NAME}

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
HIGHLIGHT="${ANSI_BOLD}${ANSI_BLUE}"


# Checking the profile to use: require manual verification if using default
if [[ "$PROFILE_NAME" != "default" ]]; then
    echo -e "${LOG_INFO} Using AWS profile ${HIGHLIGHT}${PROFILE_NAME}${ANSI_RESET}"
else
    echo -e "${LOG_INFO} Using ${HIGHLIGHT}default${ANSI_RESET} profile"
    read -p "Are you sure you want to continue (y/n)? " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo -e "$LOG_ERROR Operation aborted by the user"
        exit 1
    fi
fi

# Creating the ECR repository for the image
echo -e "$LOG_INFO Getting AWS Account ID to identify ECR prefix"
ACCOUNT_ID="$(aws --profile $PROFILE_NAME \
sts get-caller-identity \
--query "Account" \
--output text
)"

ECR_REPOSITORY_URI="$(aws --profile $PROFILE_NAME \
ecr describe-repositories \
--repository-names "${NAMESPACE}/${STACK_NAME}" \
--query "repositories[0].repositoryUri" \
--output text)"

if [[ $? -ne 0 ]]; then
    echo -e "$LOG_INFO Creating an ECR repository for the Lambda function"
    ECR_REPOSITORY_URI="$(aws --profile $PROFILE_NAME \
    ecr create-repository \
    --repository-name ${NAMESPACE}/${STACK_NAME} \
    --encryption-configuration '{"encryptionType": "AES256"}' \
    --query "repository.repositoryUri" \
    --output text)"
else
    echo -e "${LOG_INFO} Using existing ECR repository: ${HIGHLIGHT}${ECR_REPOSITORY_URI}${ANSI_RESET}"
fi


echo -e "${LOG_INFO} Deploying ${STACK_NAME}..."
sam deploy \
--profile $PROFILE_NAME \
--stack-name $STACK_NAME \
--image-repository $ECR_REPOSITORY_URI \
--capabilities CAPABILITY_IAM

echo -e "$LOG_INFO Successfully completed"

