# 09: Using promises in TypeScript &mdash; Hello, `sqlite3` with callbacks
> illustrates how to work with SQLite using the asynchronous, callback based API of [`sqlite3`](npmjs.com/package/sqlite3)

In this example, we illustrate how to work with SQLite using [`sqlite3`](npmjs.com/package/sqlite3) library and using the *in-memory* option. [`sqlite3`](npmjs.com/package/sqlite3) features a callback-based async API.

In the example we create an *in-memory* database, create a table with it, populate it with some data, and then submit a query. Finally, the connection to the database is closed.