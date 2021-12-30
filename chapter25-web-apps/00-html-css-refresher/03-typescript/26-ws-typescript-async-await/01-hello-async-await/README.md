# 01: *Async/Await* in TypeScript &mdash; Hello, async/await!
> basic usage of *async/await* keywords and the top-level await.

## Notes
To enable top-level await:
+ The project is configured as a `type: "module"` in the `package.json`.
+ The `tsconfig.json` is configured with `"module": "es2022"`.
+ `main.ts` needs to export something. As this is a simple program, we're exporting an empty object: `export {};`.