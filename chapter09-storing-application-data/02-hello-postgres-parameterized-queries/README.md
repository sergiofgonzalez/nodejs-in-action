# 02-hello-postgres-parameterized-queries
> basic operations using `pg` module, but using parameterized queries

## Description

An enhancement on [Hello Postgres](../01-hello-postgres) that uses parameterized queries instead of ES6 template literals.

As a result, queries such as:
```javascript
    db.query(`
      UPDATE snippets
         SET body = '${ body }'
       WHERE id = ${ snippetId };
    `, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rowCount);
    });
```

end up being coded as:
```javascript
    db.query(`
      UPDATE snippets
         SET body = $1
       WHERE id = $2;
    `, [body, snippetId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rowCount);
    });
```

wich is not only prettier, but it's also more resilient to SQL injection attacks.
