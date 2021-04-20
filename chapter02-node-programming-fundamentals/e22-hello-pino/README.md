# e22 &mdash; Hello, pino!
> Playing with [pino](https://github.com/pinojs/pino) Node.js logger

## About the example

The project illustrates a few features of [pino](https://github.com/pinojs/pino) Node.js logger. In the example, a `logger.js` library is defined and used within `main.js` and `./lib/greeter.js` modules to demonstrate how to do a few things.

[pino](https://github.com/pinojs/pino) is a JSON logger. In order to get human readable output, the [pino-pretty](https://github.com/pinojs/pino-pretty) module is used. The output of the program must be piped into [pino-pretty](https://github.com/pinojs/pino-pretty) and the output can be configured through the [`.pino-prettyrc`](.pino-prettyrc) file.

To view the raw JSON and *prettified* output you can use:
```bash
# raw JSON
$ npm start

# raw JSON piped into pretty-pino
$ npm run start-pretty-logging
```

| NOTE: |
| :---- |
| [pino](https://github.com/pinojs/pino) approach to logging is both very powerful and simplistic. This means that [pino](https://github.com/pinojs/pino) is well prepared to to be used *as-is* without having to create a `logger.js` module like the one used in the current project. |
