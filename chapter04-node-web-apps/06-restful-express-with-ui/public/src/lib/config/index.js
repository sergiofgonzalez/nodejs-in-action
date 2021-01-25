"use strict";

/*
    config: an opinionated wrapper on top of `nconf` to provide a waterfall approach
            for configuration properties supporting YAML/JSON.
*/

const path = require("path");
const yaml = require("js-yaml");
const nconf = require("nconf");


const propertiesFilename = process.env.npm_package_config_PROPERTIES_FILENAME || "application.yml";

function getFileConfigurationObjectFor(propertiesFilename) {
  const configObject = {
    file: propertiesFilename,
    dir: __dirname,
    search: true
  };
  if (path.extname(propertiesFilename).toLowerCase() === ".yml") {
    configObject.format = { parse: yaml.safeLoad, stringify: yaml.safeDump };
  }
  return configObject;
}


nconf.argv();           // parameters received via command-line get the top precedence
nconf.env();             // environment variables are next
nconf.file("fileconfig", getFileConfigurationObjectFor(propertiesFilename));  // file is last

module.exports = nconf.get.bind(nconf);
