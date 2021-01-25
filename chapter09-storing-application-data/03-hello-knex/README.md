# 03-hello-knex
> introducing `knex`, a lightweight query builder with support for multiple database engines 

## Description

*Knex* is a query-building framework that also supports interacting with the database to perform DDL and DML operations. It supports several DB engine backends such as PostgreSQL, MySQL, Sqlite3... and includes a connection pool by default.

*Knex* API is primaryly Promise-based although it also supports callbacks.

In the example it is demonstrated how to use the query building API, and then it is illustrated how to interact with a Postgres and Sqlite3 backend.