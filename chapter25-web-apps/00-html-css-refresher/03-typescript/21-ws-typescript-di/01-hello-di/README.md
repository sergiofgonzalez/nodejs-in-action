# 01: Dependency Injection &mdash; Hello, DI!
> illustrates a custom implementation of the **DI** pattern and the benefits it brings.


## Project configuration changes
In `tsconfig.json`, `"app/test/**/*"` was removed from the include configuration, as it resulted on test scripts being transpiled and included in `dist/` and breaking the starting scripts, etc.


As a result `tsconfig.json` ended up as:

```typescript
...
,
  "include": [
    "app/src/**/*"
  ]
...
```
