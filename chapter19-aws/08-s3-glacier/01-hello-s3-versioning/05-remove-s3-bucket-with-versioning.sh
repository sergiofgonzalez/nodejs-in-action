#!/bin/bash -e

BUCKET_NAME=$1
PROFILE_NAME=${3:-default}
PATH_TO_S3_FILE="profile-pics/profile.png"
OLD_VERSION_ID=${2}

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
    echo -e "$LOG_ERROR Example: ${ANSI_BOLD}$0 my-bucket-name version-id <aws-profile-name>${ANSI_RESET}"
    exit 1
else
    echo -e "$LOG_INFO Bucket=$BUCKET_NAME"
fi

if [ -z "$OLD_VERSION_ID" ]; then
    echo -e "$LOG_ERROR You must pass the ${HIGHLIGHT_DANGER}VersionId${ANSI_RESET} as the second parameter"
    echo -e "$LOG_ERROR Example: ${ANSI_BOLD}$0 my-bucket-name version-id <aws-profile-name>${ANSI_RESET}"
    exit 1
else
    echo -e "$LOG_INFO VersionId=$OLD_VERSION_ID"
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

# removing the bucket
echo -e "${LOG_INFO} About to remove ${HIGHLIGHT_DANGER}${BUCKET_NAME}${ANSI_RESET} and its contents:"
read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo -e "$LOG_ERROR Operation aborted by the user"
    exit 1
fi

# we need to remove object versions first
echo -e "${LOG_INFO} About to remove object's latest version"
aws --profile ${PROFILE_NAME} \
s3api delete-object \
--bucket ${BUCKET_NAME} \
--key ${PATH_TO_S3_FILE}

echo -e "${LOG_INFO} About to remove object's version ${HIGHLIGHT}${OLD_VERSION_ID}${ANSI_RESET}"
aws --profile ${PROFILE_NAME} \
s3api delete-object \
--bucket ${BUCKET_NAME} \
--key ${PATH_TO_S3_FILE} \
--version-id ${OLD_VERSION_ID}

echo -e "$LOG_INFO Removing bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET} and its contents"
aws --profile ${PROFILE_NAME} \
s3 rb \
s3://${BUCKET_NAME} \
--force

echo -e "$LOG_INFO Successfully completed"