# 01-hello-postgres
> basic operations using `pg` module

## Description

A simple program that illustrates how to submit DDL and DML queries using the `pg` module to a Postgres backend. The source code does not use parameterized queries but rather, uses ES6 template literals to interpolate the data passed to the queries.

The `pg` module is callback based, but as an example, the callbacks have been transformed into *Promises*.