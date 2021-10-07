# e01: TypeScript Fundamentals &mdash; Creating a library for working with strings
> creating a series of simple functions that operate on strings.

## Activity 1.01

In this activity, you will create a series of simple functions tht will help you do some common operations on strings. Some of the operations will be trivial, as they're supported by the standard JavaScript library, but the idea is to familiarize yourself with TypeScript fundamentals.

The library will feature the following functions:
+ `toTitleCase` &mdash; this will process a string and capitalize the first letter of each word, and making all the other letters lowercase:
  + 'war AND peace' => 'War And Peace'
  + 'Catcher in the Rye' => 'Catcher In The Rye'
  + 'tO kILL A mOCKINGBIRD' => 'To Kill A Mockingbird'

+ `countWords` &mdash; this will count the number of separate words within a string. Words are considered to be delimited by spaces, dashes or underscores:
  + 'War and Peace' => 3
  + 'catcher-in-the-rye' => 4
  + 'for_whom_the_bell_tolls' => 5

+ `toWords` &mdash; this will return all the words that are within a string. Words are considered to be delimited by spaces, dashes or underscores:
  + 'War and Peace' => ['War', 'and', 'Peace']
  + 'catcher-in-the-rye' => ['catcher', 'in', 'the', 'rye']
  + 'for_whom_the_bell_tolls' => ['for', 'whom', 'the', 'bell', 'tolls']

+ `repeat` &mdash; this will take a string and a number and return the same string repeated that number of times:
  + 'War', 3 => 'WarWarWar'
  + 'rye', 1 => 'rye'
  + 'bell', 0 => ''

+ `isAlpha` &mdash; this will return `true` if the string only has alphabetic characters (letters):
  + 'War and Peace' => false
  + 'Atonement' => true
  + '1Q84' => false

+ `isBlank` &mdash; this will return `true` if the string is blank, that is, consists only of whitespace characters:
  + 'War and Peace' => false
  + '             ' => true
  + '' => true


## About the tests

This project includes a set of unit tests to validate the functions' behavior. Additionally, the capability to generate HTML coverage reports and the automatic opening of such report has been added to the `test-coverage` script.

These are the details:
+ `jest` and `@types/jest` have been added to `package.json` as development dependencies
```json
"devDependencies": {
  "@types/jest": "27.0.2",
...
  "jest": "27.2.4",
...
},
```

+ `jest.config.js` has been updated to include `coverageReporters` property, and configured to enable HTML reporting:
```typescript
module.exports = {
...
  coverageReporters: ['clover', 'json', 'lcov', 'html', 'text']
};

```

+ The `test-coverage` script has been enhanced to allow opening the report when the script has finished. This requires a couple of properties configured in `package.json` to locate where Chrome can be started from and how to locate the files:
```json
  "config": {
    "tsc_outDir": "dist/",
    "chrome_path": "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "wsl_path_prefix": "wsl$/Ubuntu-20.04"
  },
...
  "scripts": {
...
    "test": "jest --verbose",
    "test-watch": "jest --watchAll --verbose",
    "test-coverage": "jest --verbose --coverage && \"${npm_package_config_chrome_path}\" file://${npm_package_config_wsl_path_prefix}/${PWD}/coverage/index.html"
  }
```
