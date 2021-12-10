# 10: Using promises in TypeScript &mdash; Hello, `sqlite` with promises
> illustrates how to work with SQLite using the asynchronous, promised based API of [`sqlite`](npmjs.com/package/sqlite)

In this example, we illustrate how to work with SQLite using [`sqlite`](npmjs.com/package/sqlite3) library, which adapts the [`sqlite3`](npmjs.com/package/sqlite3) so that it we can use a promise-based API instead of a callback-based API.

In the example we create an *in-memory* database, create a table with it, populate it with some data, and then submit a query. Finally, the connection to the database is closed.