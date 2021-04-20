#!/bin/bash

export BUCKET_NAME=$1
PROFILE_NAME=${2:-default}

PATH_TO_STATIC_WEBSITE="static-web-site/"
STATIC_WEBSITE_INDEX_DOCUMENT="index.html"

set_colors_if_terminal() {
  if test -t 1; then
    # see if it supports colors...
    ncolors=$(tput colors)
    if test -n "$ncolors" && test $ncolors -ge 8; then
        bold="$(tput bold)"
        underline="$(tput smul)"
        standout="$(tput smso)"
        normal="$(tput sgr0)"
        black="$(tput setaf 0)"
        red="$(tput setaf 1)"
        green="$(tput setaf 2)"
        yellow="$(tput setaf 3)"
        blue="$(tput setaf 4)"
        magenta="$(tput setaf 5)"
        cyan="$(tput setaf 6)"
        white="$(tput setaf 7)"

        log_info="${green}${bold}INFO:${normal}"
        log_error="${red}${bold}ERROR:${normal}"
        highlight="${blue}${bold}"
    fi
  fi
}

set_colors_if_terminal

# Checking we've received the BUCKET_NAME as first arg
if [ -z "$BUCKET_NAME" ]; then
  echo "${log_error} You must pass the ${highlight}bucket name${normal} for the static website as the ${bold}first${normal} argument"
  echo "e.g. $0 bucket-name [profile]"
  exit 1
else
  echo "${log_info}: BUCKET_NAME=${highlight}$BUCKET_NAME${normal}"
fi

# Checking the profile to use: require manual verification if using default
if [[ "$PROFILE_NAME" != "default" ]]; then
  echo -e "${log_info} Using AWS profile ${highlight}${PROFILE_NAME}${normal}"
else
  echo -e "${log_info} Using ${highlight}default${normal} profile"
  read -p "Are you sure you want to continue (y/n)? " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo -e "$log_error Operation aborted by the user"
    exit 1
  fi
fi

# First check if bucket exists
RESULT_MSG="$(aws --profile $PROFILE_NAME \
s3api head-bucket --bucket $BUCKET_NAME 2>&1)"
HEAD_BUCKET_RETCODE=$?

if [[ $HEAD_BUCKET_RETCODE -ne 0 ]]; then
  # either bucket does not exist or permissions error
  echo $RESULT_MSG | grep "(404)"
  if [[ $? -eq 0 ]]; then
    # bucket does not exist: we create it
    echo "${log_info} Creating new bucket ${highlight}${BUCKET_NAME}${normal}"
    aws --profile ${PROFILE_NAME} \
      s3 mb s3://${BUCKET_NAME}
    if [[ $? -ne 0 ]]; then
      echo "${log_error} Bucket ${highlight}${BUCKET_NAME}${highlight} could not be created"
      exit 1
    fi
  else
    # not a 404
    echo "${log_error} Cannot use specified bucket ${highlight}${BUCKET_NAME}${normal}. Please confirm name and permissions."
  fi
else
  # bucket already exists
  echo "${log_info} Bucket ${highlight}${BUCKET_NAME}${normal} already exists and will be reused"
fi

echo "${log_info} Synchronizing ${highlight}${BUCKET_NAME}${normal} content with ${highlight}${PATH_TO_STATIC_WEBSITE}${normal} dir"
aws --profile ${PROFILE_NAME} \
s3 sync ${PATH_TO_STATIC_WEBSITE} s3://${BUCKET_NAME}

echo "${log_info} Preparing JSON policy for '${highlight}$BUCKET_NAME${normal}'"
envsubst < bucket-policy.json > /tmp/bucket-policy-${BUCKET_NAME}.json

echo "${log_info} Setting bucket policy for '${highlight}$BUCKET_NAME${normal}'"
aws --profile ${PROFILE_NAME} \
s3api put-bucket-policy --bucket $BUCKET_NAME \
--policy file:///tmp/bucket-policy-${BUCKET_NAME}.json
if [[ $? -ne 0 ]]; then
  echo "${log_error} Could not apply bucket policy"
  exit 1
fi

echo "${log_info} Enabling static website hosting for '${highlight}$BUCKET_NAME${normal}'"
aws --profile ${PROFILE_NAME} \
s3 website s3://${BUCKET_NAME} \
--index-document ${STATIC_WEBSITE_INDEX_DOCUMENT}
if [[ $? -ne 0 ]]; then
  echo "${log_error} Could not enable static website hosting"
  exit 1
fi

BUCKET_REGION="$(aws \
--profile $PROFILE_NAME \
s3api get-bucket-location --bucket ${BUCKET_NAME} \
--query "LocationConstraint" \
--output text)"
if [[ $? -ne 0 ]]; then
  echo "${log_error} Could not obtain bucket region"
  exit 1
fi

if [[ "$BUCKET_REGION" == "None" ]]; then
  BUCKET_REGION='us-east-1'
fi
echo "${log_info} Successfully completed: visit ${highlight}http://${BUCKET_NAME}.s3-website-${BUCKET_REGION}.amazonaws.com${normal}"