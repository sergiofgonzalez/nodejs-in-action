#!/bin/bash -e

PROFILE_NAME=${1:-default}
STACK_NAME=lambda-health-check
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
HIGHLIGHT_DANGER="${ANSI_BOLD}${ANSI_RED}"
HIGHLIGHT="${ANSI_BLUE}${ANSI_BOLD}"

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

# Getting AccountID
echo -e "$LOG_INFO Getting AWS Account ID to identify CloudTrail bucket"
ACCOUNT_ID="$(aws --profile $PROFILE_NAME \
sts get-caller-identity \
--query "Account" \
--output text
)"

# Checking if stack exists: the command itself throws an error if it doesn't exist
# STACK_INFO="$(aws --profile $PROFILE_NAME \
# cloudformation describe-stacks \
# --stack-name $STACK_NAME)"

# echo -e "$LOG_INFO About to delete stack ${HIGHLIGHT_DANGER}${STACK_NAME}${ANSI_RESET} and associated ${ANSI_BOLD}${ANSI_RED}ECR repo${ANSI_RESET}:"

# read -p "Are you sure you want to continue (y/n)? " -n 1 -r
# echo ""
# if [[ $REPLY =~ ^[Nn]$ ]]; then
#     echo -e "$LOG_ERROR Operation aborted by the user"
#     exit 1
# fi


# aws --profile $PROFILE_NAME \
# cloudformation delete-stack \
# --stack-name $STACK_NAME

# echo -e "$LOG_INFO Deleting stack ${HIGHLIGHT}$STACK_NAME${ANSI_RESET}"

# aws --profile $PROFILE_NAME \
# cloudformation wait stack-delete-complete \
# --stack-name $STACK_NAME

echo -e "$LOG_INFO ${HIGHLIGHT}$STACK_NAME${ANSI_RESET} deletion completed"

ECR_REPOSITORY_URI="$(aws --profile $PROFILE_NAME \
ecr describe-repositories \
--repository-names "${NAMESPACE}/${STACK_NAME}" \
--query "repositories[0].repositoryUri" \
--output text)"

if [[ $? -eq 0 ]]; then
    echo -e "$LOG_INFO Deleting the ECR repository ${HIGHLIGHT}${ECR_REPOSITORY_URI}${ANSI_RESET} associated to the Lambda function"
    aws --profile $PROFILE_NAME \
    ecr delete-repository \
    --repository-name ${NAMESPACE}/${STACK_NAME} \
    --force
else
    echo -e "${LOG_INFO} No ECR repository was found: ${HIGHLIGHT}${ECR_REPOSITORY_URI}${ANSI_RESET}"
fi

echo -e "$LOG_INFO removal completed"
echo -e "   + Stack: ${HIGHLIGHT}$STACK_NAME${ANSI_RESET}"
echo -e "   + ECR: ${HIGHLIGHT}$ECR_REPOSITORY_URI${ANSI_RESET}"

echo -e "$LOG_INFO Successfully completed"