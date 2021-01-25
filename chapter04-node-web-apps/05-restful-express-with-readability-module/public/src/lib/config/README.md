# config
> Use the `config` module to enable a predefined, waterfall configuration approach to configuration parameters for your application

## Usage

```javascript
const config = require("./lib/config");
const port = config("server:port");  // to retrieve server.port
const port = config("logLevel");     // to retrieve logLevel
```

The default configuration filename is `application.yml`, and therefore *YAML* is the default format.
```YAML
logLevel: value

logger:
  level: DEBUG

server:
  port: 3000
```

## Description
The `config` module defines the following configuration parameters sources (sorted by priority):
1. **Parameters** received via the command line
2. **Environment Variables** accessible from the running process
3. **Configuration File** found in the project's directory

### Configuration File Details
The `config` module allows both **JSON** and **YAML** formats, and the customization of the *properties filename*. 

In order to do that, you can either include the following section in your `package.json`.
```json
...
  "config": {
    "PROPERTIES_FILENAME": "development.json"
  },
  "scripts": {
...
```
or use `npm config set *application-name*:PROPERTIES_FILENAME development.json`
