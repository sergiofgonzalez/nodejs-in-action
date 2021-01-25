# e02 &mdash; Hello, Proxyquire
> mocking dependencies with `proxyquire`

## Description
Many times modules *require* other modules, which in turn *require* additional modules which would complicate the unit tests. Unit tests are about controlling the environment, detecting the necessary pieces needed and *mocking* everything else.

The library `proxyquire` helps you address that.

In the example we have a *service*  `findUserById` that depends on a model component `user` that access the database. The example illustrates how you can *mock* the db access and service so that you can test the functionality without accessing the db.