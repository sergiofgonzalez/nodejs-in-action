#!/bin/bash -e

PROFILE_NAME=${1:-default}
IMAGE_NAME="lambda-health-check:latest"
LOCAL_PACKAGE="sergiofgonzalez"
ECR_PACKAGE="awsia"
ECR_SUFFIX=".dkr.ecr.us-east-1.amazonaws.com"

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


# build the container
echo -e "$LOG_INFO Building ${IMAGE_NAME}"
docker build -t="${LOCAL_PACKAGE}/${IMAGE_NAME}" .

# tagging
echo -e "$LOG_INFO Getting AWS Account ID to identify ECR prefix"
ACCOUNT_ID="$(aws --profile $PROFILE_NAME \
sts get-caller-identity \
--query "Account" \
--output text
)"

ECR_URI=${ACCOUNT_ID}${ECR_SUFFIX}
echo -e "$LOG_INFO ECR URI: ${HIGHLIGHT}${ECR_URI}${ANSI_RESET}"

echo -e "$LOG_INFO Tagging ${HIGHLIGHT}${IMAGE_NAME}${ANSI_RESET} for ECR"
docker tag ${LOCAL_PACKAGE}/${IMAGE_NAME} ${ECR_URI}/${ECR_PACKAGE}/${IMAGE_NAME}

# pushing to ECR
echo -e "$LOG_INFO Pushing ${HIGHLIGHT}${IMAGE_NAME}${ANSI_RESET} to ${HIGHLIGHT}${ECR_URI}${ANSI_RESET}"
docker push ${ECR_URI}/${ECR_PACKAGE}/${IMAGE_NAME}

echo -e "$LOG_INFO Successfully completed"
