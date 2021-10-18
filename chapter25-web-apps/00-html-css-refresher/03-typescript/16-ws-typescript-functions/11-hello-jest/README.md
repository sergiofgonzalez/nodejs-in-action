# 11: TypeScript functions &mdash; Hello, unit testing with Jest
> writing a simple test case with jest

## Description

This exercise illustrates how to test with Jest using [03: Writing arrow functions](../03-writing-arrow-functions) as the starting point for the project.


In this test the `tsconfig.json` has been slightly modified to include the test directory as part of the include array. This ensures that no errors are shown on VS Code.

```json
 "include": [
    "app/src/**/*",
    "app/test/**/*"
  ]
```