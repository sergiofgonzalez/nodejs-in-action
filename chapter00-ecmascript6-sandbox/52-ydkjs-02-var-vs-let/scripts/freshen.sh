#!/bin/bash

# Check that jq is available in the system, otherwise stop
hash jq > /dev/null 2>&1
if [[ $? -ne 0 ]]; then
  echo -e "\e[1m\e[31m\e[EError:\e[0m The command \e[1m\e[92mjq\e[0m must be available but was not found"
  echo -e "Exiting..."
  exit 1
fi

echo "About to freshen dependencies in the project."
echo -e "This action \e[1m\e[31mwill\e[0m:"
echo -e "* \e[1m\e[31mdelete\e[0m \e[1mnode_modules\e[0m from the project"
echo -e "* \e[1m\e[31mdelete\e[0m the \e[1mpackage-lock.json\e[0m"
echo -e "* \e[1m\e[92madd\e[0m the latest versions of the current \e[1mdev dependencies\e[0m"
echo -e "* \e[1m\e[92madd\e[0m the latest versions of the current \e[1mdependencies\e[0m"
echo -e "These actions are \e[1m\e[31m\e[4mdestructive\e[0m"
read -p "Are you sure you want to continue (y/n)? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
  TSTAMP=$( date --iso-8601=seconds )
  mkdir -p ./scripts/bkp/${TSTAMP}
  cp ./package.json ./scripts/bkp/${TSTAMP}/package.json
  cp ./package-lock.json ./scripts/bkp/${TSTAMP}/package-lock.json
  echo -e "A backup of existing files has been saved in \e[1m\e[92m./scripts/bkp/${TSTAMP}\e[0m"

  FRESHEN_CMD="rm -rf node_modules package-lock.json \
  && npm install --save-dev $( jq -r '.devDependencies | keys | join(" ")' package.json ) \
  && npm install --save $( jq -r '.dependencies | keys | join(" ")' package.json )"
  CLEAN_PKG_CMD="jq 'del(.dependencies[]) | del(.devDependencies[])' ./scripts/bkp/${TSTAMP}/package.json > package.json"

  eval ${CLEAN_PKG_CMD}
  eval ${FRESHEN_CMD}
fi