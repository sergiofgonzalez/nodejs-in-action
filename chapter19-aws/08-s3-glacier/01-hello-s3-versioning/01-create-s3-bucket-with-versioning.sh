#!/bin/bash -e

BUCKET_NAME=$1
PROFILE_NAME=${2:-default}

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
HIGHLIGHT_DANGER="${ANSI_BOLD}${ANSI_RED}"

if [ -z "$BUCKET_NAME" ]; then
    echo -e "$LOG_ERROR You must pass the ${HIGHLIGHT_DANGER}bucket name${ANSI_RESET} as the first parameter"
    echo -e "$LOG_ERROR Example: ${ANSI_BOLD}$0 my-bucket-name <aws-profile-name>${ANSI_RESET}"
    exit 1
else
    echo -e "$LOG_INFO Bucket=$BUCKET_NAME"
fi

# Checking the profile to use: require manual verification if using default
if [[ "$PROFILE_NAME" != "default" ]]; then
    echo -e "${LOG_INFO} Using AWS profile ${HIGHLIGHT}${PROFILE_NAME}${ANSI_RESET}"
else
    echo -e "${LOG_INFO} Using ${HIGHLIGHT}default${ANSI_RESET} profile"
    read -p "Are you sure you want to continue with this profile (y/n)? " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo -e "$LOG_ERROR Operation aborted by the user"
        exit 1
    fi
fi

# creating the bucket and setting the versioning policy
echo -e "$LOG_INFO Creating bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET}"
aws --profile ${PROFILE_NAME} \
s3 mb \
s3://${BUCKET_NAME}

# blocking public access to bucket
echo -e "$LOG_INFO Blocking ${HIGHLIGHT}public access${ANSI_RESET} on bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET}"
aws --profile $PROFILE_NAME \
s3api put-public-access-block \
--bucket ${BUCKET_NAME} \
--public-access-block-configuration '{"BlockPublicAcls": true, "IgnorePublicAcls": true, "BlockPublicPolicy": true, "RestrictPublicBuckets": true}'

# putting default bucket encryption
echo -e "$LOG_INFO Enabling ${HIGHLIGHT}AES-256 encryption${ANSI_RESET} on bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET}"
aws --profile $PROFILE_NAME \
s3api put-bucket-encryption \
--bucket ${BUCKET_NAME} \
--server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'

echo -e "$LOG_INFO Enabling ${HIGHLIGHT}versioning${ANSI_RESET} on bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET}"
aws --profile ${PROFILE_NAME} \
s3api put-bucket-versioning \
--bucket ${BUCKET_NAME} \
--versioning-configuration Status=Enabled

echo -e "$LOG_INFO Successfully completed"