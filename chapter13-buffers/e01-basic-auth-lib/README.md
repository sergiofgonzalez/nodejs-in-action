# e01-basic-auth-lib
> creating a basic authentication header library with the help of the `Buffer` class

## Description
A very simple library for creating the basic authentication header with the following API:
+ `getAuthHeader(user, password)` &mdash; returns the authorization HTTP header for the given user and password.
+ `getCredentials(authHeader)` &mdash; returns an object { user, password } that is the decoding of the given basic authentication header given.

The tests has been performed with the `tap` module.
