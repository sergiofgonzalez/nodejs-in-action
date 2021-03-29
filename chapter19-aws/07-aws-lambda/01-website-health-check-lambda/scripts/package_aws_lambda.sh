#!/bin/bash -e

# Check that zip is available in the system, otherwise stop
hash zip > /dev/null 2>&1
if [[ $? -ne 0 ]]; then
  echo -e "\e[1m\e[31m\e[EError:\e[0m The utility \e[1m\e[92mzip\e[0m must be available but was not found"
  echo -e "Exiting..."
  exit 1
fi

DIST_DIRECTORY=${npm_package_config_dist:-dist}
PACKAGE_NAME=${npm_package_name:-function}-${npm_package_version:-0.0.0}

echo -e "Packaging AWS Lambda \e[1m\e[92msource code + dependencies\e[0m"
echo -e "  + Destination directory: \e[1m\e[92m$DIST_DIRECTORY\e[0m"
echo -e "  + Package name: \e[1m\e[92m$PACKAGE_NAME\e[0m"

mkdir -p $DIST_DIRECTORY

echo -e "\nAdding \e[1msource files\e[0m..."
cd app/src && \
zip --quiet --recurse-paths --filesync ../../$DIST_DIRECTORY/$PACKAGE_NAME.zip * && \
cd ../..

if [ -d node_modules ]
then
  echo -e "Adding \e[1mdependencies\e[0m..."
  zip --quiet --recurse-paths $DIST_DIRECTORY/$PACKAGE_NAME.zip node_modules
fi

echo -e "Package written to \e[1m\e[92m./$DIST_DIRECTORY/$PACKAGE_NAME.zip\e[0m"

echo ""
echo -e "Reinstalling \e[1mfull dependencies\e[0m..."
npm install