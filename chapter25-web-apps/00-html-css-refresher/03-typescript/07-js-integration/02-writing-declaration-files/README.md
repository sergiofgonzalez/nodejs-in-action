# 02: Integration with JavaSCript &mdash; Writing declaration files
> illustrates how to integrate a home-built JavaScript library in a TypeScript project.


In the example, we have a JavaScript library `lib/error-helper.js` that is imported in `main.ts` and used in the TypeScript program.

In order to make it work, we have enabled `allowsJs` option in `tsconfig.js`, and also has created a custom declaration file for the library in `types/globals.d.ts`.

When doing so, you can interact with the JavaScript library seamlessly, also ensuring that that there is strict type checking as declared in `types/globals.d.ts`.