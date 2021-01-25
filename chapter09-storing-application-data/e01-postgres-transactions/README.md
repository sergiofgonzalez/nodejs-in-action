# e01-postgres-transactions
> performing operations within a transaction with the `pg` module.

## Description

The transactional support in *Node.js* SQL modules such as `pg` is really low-level, forcing the developer to use `BEGIN` and `ROLLBACK` and `COMMIT` SQL statements.

In the example, we create two tables, and populate them in a transaction which is later being rollbacked.
