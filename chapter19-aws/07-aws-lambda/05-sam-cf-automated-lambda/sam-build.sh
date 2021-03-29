#!/bin/bash -e

STACK_NAME=lambda-health-check

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


echo -e "${LOG_INFO} Packaging ${STACK_NAME} using AWS SAM..."
sam build \
--template-file ${STACK_NAME}.yml

echo -e "$LOG_INFO Successfully completed"

