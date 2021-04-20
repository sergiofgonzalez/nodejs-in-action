#!/bin/bash -e

export BUCKET_NAME=$1
PROFILE_NAME=${2:-default}

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
  echo "${log_info} Using AWS profile ${highlight}${PROFILE_NAME}${normal}"
else
  echo "${log_info} Using ${highlight}default${normal} profile"
  read -p "Are you sure you want to continue (y/n)? " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo -e "$log_error Operation aborted by the user"
    exit 1
  fi
fi

echo "The bucket ${red}${bold}${BUCKET_NAME}${normal} and its contents will be ${red}${bold}removed${normal}"
read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
  echo -e "$log_error Operation aborted by the user"
  exit 1
fi

aws --profile ${PROFILE_NAME} \
s3 rb --force s3://${BUCKET_NAME}
echo "${log_info} Successfully removed bucket ${BUCKET_NAME}"
