# e01: Dependency Injection &mdash; Hello, DI using InversifyJS!
> reworking the [01: Hello, DI!](../01-hello-di) example using InversifyJS


## Prerequisites
Note that the `./ts.config.json` has been updated to comply with InversifyJS requirements.

Namely:

```json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "lib": ["ES2021", "DOM"],
    "moduleResolution": "node",
    // "types": ["reflect-metadata"],     /* removed as it was creating problems with Node.js modules such as `fs` */
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```

Also, you need to include `inversifyjs` and `reflect-metadata` in your dependencies:

```typescript
npm install --save inversify reflect-metadata
```
