#!/bin/bash -e

DIST_DIRECTORY=${npm_package_config_dist:-dist}
PACKAGE_NAME=${npm_package_name:-function}-${npm_package_version:-0.0.0}

echo -e "Removing AWS Lambda package:"
echo -e "  + Destination directory: \e[1m\e[92m$DIST_DIRECTORY\e[0m"
echo -e "  + Package name: \e[1m\e[92m$PACKAGE_NAME\e[0m"

rm -f $DIST_DIRECTORY/$PACKAGE_NAME.zip

echo -e "Package \e[1m\e[92m./$DIST_DIRECTORY/$PACKAGE_NAME.zip\e[0m removed"