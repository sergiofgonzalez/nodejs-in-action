# 01: Strict compiler options &mdash; Hello, nested configurations!
> Illustrates how to use nested `tsconfig.json` and how to perform the build when using this technique.



In the example we have the following structure:

```
prj/
├── app/
│   └── src/
│       ├── js-libs/
|       |   ├── my-lib.js
|       |   └── tsconfig.json
|       ├── main.ts
│       └── tsconfig.json
 tsconfig.json
```
+ The project's root `tsconfig.json` does not include support for decorators.
+ The `tsconfig.json` found in `src/` extends from the project's root configuration and enables the experimental decorators.
+ Finally, the `tsconfig.json` found in `js-libs/` enables support for JavaScript libraries.

To perform the build you need to do:

```bash
cd app/src
../../node_modules/.bin/tsc # compile main.ts with decorator
cd lib/
../../../node_modules/.bin/tsc # compile js librry
```


