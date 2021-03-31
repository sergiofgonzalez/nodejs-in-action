#!/bin/bash -e

BUCKET_NAME=$1
PROFILE_NAME=${2:-default}
PATH_TO_FILE_V1="pics/profile-old.png"
PATH_TO_FILE_V2="pics/profile-new.png"


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

# uploading to S3 version one of the object
echo -e "$LOG_INFO Uploading to bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET} object v1"
aws --profile ${PROFILE_NAME} \
s3 cp \
$PATH_TO_FILE_V1 \
s3://${BUCKET_NAME}/profile-pics/profile.png

# uploading to S3 version two of the object
echo -e "$LOG_INFO Uploading to bucket ${HIGHLIGHT}${BUCKET_NAME}${ANSI_RESET} object v2"
aws --profile ${PROFILE_NAME} \
s3 cp \
$PATH_TO_FILE_V2 \
s3://${BUCKET_NAME}/profile-pics/profile.png


echo -e "$LOG_INFO Successfully completed"