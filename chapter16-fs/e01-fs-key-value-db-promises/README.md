# e01-fs-key-value-db-promises
> building a promises-based, key/value datastore with persistence on an append-only file

## Description
The example illustrates how to write a simple key/value database module that provides in-memory access to the current state for speed and use an append-only storage format on disk for persistence.

Each line in the file will be a record &mdash; a simple JSON object with two properties: a key and a value.
The key will be a string representing a lookup for the value, and the value will be aything that can be JSON-serializable.

Examples:
```javascript
{ "key":"a","value":23 }
{ "key":"b","value":["a", "list", "of", "things"] }
{ "key":"c","value":{"an":"object"} }
{ "key":"d","value":"a string" }
```

If a record is updated, the previous entry found in the file will not be modified, but rather, an entry with the new value will be appended:
```javascript
{ "key":"a","value": "old value" }
...
{ "key":"a","value": "new value" }
```

If a record is deleted, the previous entry found in the file will not be modified, but rather, an entry with a null value will be appended:
```javascript
{ "key":"a","value": "about to delete" }
...
{ "key":"a","value": null }
```

When the database is started, the *journal* that keeps the database state will be streamed from top to bottom into the memory.

The `database`module will expose the following API:
+ Operations:
  + `const client = new Database(<path-to-journal>)` &mdash; creates a new instance of the Database using the given path. If the file does not exist it will be created.
  + `client.get(key)` &mdash; returns a *promise* that will be resolved with the value for the key or null if there is no value associated to that key
  + `client.set(key, value)` &mdash; returns a promise that will be resolved when the value is persisted for the given key. The promise will be rejected if the operation fails. If the key already exist it will be deleted. Passing `null` as the value will delete the entry, although it is recommended to use the `client.del` operation instead.
  + `client.del(key)` &mdash; returns a promise that will be resolved when the given key is deleted.


+ Events:
  + `"load"` &mdash; data has been loaded into the memory
  + `"error"` &mdash; an error was found while loading the data into the memory (probably a syntax error in the file)

Note:
+ You can find a callback-version of this concept [08-fs-key-value-db](../08-fs-key-value-db), but why would you like to use the callback version?
+ Note that records are appended, even when they're already there with the same values
