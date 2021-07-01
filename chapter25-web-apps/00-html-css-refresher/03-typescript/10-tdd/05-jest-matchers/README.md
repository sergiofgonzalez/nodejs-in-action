# 05: Test-driven development &mdash; *Jest* matchers
> a sandbox that illustrates *Jest* matchers


## A few notes about this project...
When checking the tests it is useful to mark all the test files (except for the one you're interested in) with:

```typescript
describe.skip(...);
```

Than ensures that when you run: `npm test`, only that test is executed.


Also, this test is configured with the tests on a separate directory (instead of using `*.spec.ts`), and has the `jest.config.js` configured as per the [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter) project.