# Logger
> a simple, heavily opinionated application logging library based on [winston](https://github.com/winstonjs/winston)

## Usage

Require a `logger` object in your code and pass it the module name (or a similar string) that will let you identify from where the logging line has been identified. 

```javascript
const logger = require('./lib/logger')('index');

logger.info(`Hello to Jason Isaacs`); // 2019-12-28T19:49:00.557Z |-info [index]: Hello to Jason Isaacs
```

The only configurable option is the active logging level, which is read from a configuration property named`logger:level`, and therefore can be configured from an environment variable `logger__level`.

The default logging level is `info`.