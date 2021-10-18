# e02: TypeScript functions &mdash; Writing unit tests for the Flight Booking System
> configuring and implementing Jest testing in a TypeScript project

## Activity 3.02

In this activity, you will write unit tests to validate a part of the Flight Booking System functionality from [e01: Building a flight booking system with functions](e01-flight-booking-system).

The idea is not to create a thorough test, but rather, to come up with a complete and robust configuration for the tests.

The activities to complete are the following:
+ You will have two test files, one for the Bookings module and another one for the Flights module.
+ Initially, both tests will be stubs that fail when executed. This is expected from a TDD perspective.
+ You will create the assertions for the Flights module, so that you get a 100% pass rate and coverage for that module.
+ As you won't be writing the tests for the Booking module, you will have to use `describe.skip()` to skip the tests for that module.

## Notes and hints
The configuration has been adjusted so that Jest tests are not ran twice (once for the TypeScript files, and another one for the JavaScript files).

You can skip files by simply using: `describe.skip()` in the test for the Bookings module.

You can force a test to fail writing:

```typescript
test('scenario X', () => {
  expect(true).toBeFalsy(); // unimplemented
});
```

You can obtain the test coverage running the goal `$ npm run test-coverage`. It has been configured to open the HTML report on your host's Chrome once completed.