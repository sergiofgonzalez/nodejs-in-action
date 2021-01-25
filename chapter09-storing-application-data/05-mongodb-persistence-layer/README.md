# 05-mongodb-persistence-layer
> creating a module to handle persistence in a *MongoDB* instance

## Description

The example creates a persistence layer for a model `Article` using `mongodb` module. As `mongodb` is promise-based, the client uses *async/await* for synchronization.

In the client it is illustrated:
+ How to connect
+ How to create new entries
+ How to query the database
+ How to delete entries
+ How to interact with the *MongoDB* identifiers to check for equality or extract the timestamp metadata

### Interacting with MongoDB
In contrast with SQL databases, NoSQL databases expose a non-standard API to interact with the backend. This section describe the high-level details of the interaction API.

#### Connecting to MongoDB

Before interacting with a *MongoDB* instance, you must connect to it using the `mongodb` client. The connect method returns a *promise* to a database client that will be subsequently used for the different operations:

```javascript
const { MongoClient } = require(`mongodb`); // object destructuring to obtain the MongoClient

const dbClient = await MongoClient.connect(`<mongo-db-connection-string>`);
```

Note that the connection string follows this structure:
`mongodb://<mongo-db-ip-address>:<port>/{<collection>}`

For example:
`mongodb://localhost:27017/` or `mongodb://localhost:27017/articles` are valid connection strings for a MongoDB instance running on the standard port on the localhost.

#### API Overview

Most interactions with the backend are performed via the collection API. Note that some operations come in few flavors to enable for enhanced flexibility:

| API Call                              | Purpose                                   | 
|---------------------------------------|-------------------------------------------|
| `collection.insert(doc)`              | Insert one or more documents              |
| `collection.insertOne(doc)`           | Insert a single document                  |
| `collection.insertMany([doc1, doc2])` | Insert many documents                     |
| `collection.find(query)`              | Find documents matching the query         |
| `collection.findOne(query)`           | Find a single document matching the query |
| `collection.remove(query)`            | Remove documents matching the query       |
| `collection.drop()`                   | Remove the entire collection              |
| `collection.update(query)`            | Update documents matching the query       |
| `collection.updateMany(query)`        | Update all documents matching the query   |
| `collection.count(query)`             | Count documents matching the query        |

Note that all the API calls return promises:
+ In the insertions, the success handler is passed a promise to an object containin metadata about the state of the operation. When using `insertOne` the response features a `insertedId` field containing id of the object that has been inserted; in `insertMany` operations the response object will feature an array of `insertedId` with the ids of the objects inserted in the giver order.

##### Querying in MongoDB

Methods that read documents from the collection, such as `find`, `update` or `remove` take a query argument that is used to match documents in the database.

The simplest form of a query is an object with which *MongoDB* will match documents with the same structure and values:
```javascript
const articlesWithGivenTitle = await db.collection("articles")
                                      .find({ title: "Hello Article!" })
                                      .toArray();
```

You can also find documents by their unique _id:
```javascript
const articlesWithGivenId = await db.collection("articles")
                                      .findOne({ _id: someID });
```

or use *regex* in the query:
```javascript
const articlesWithGivenRegexInTitle = await db.collection("articles")
                                      .find({ title: { $regix /Isaacs$/I } })  // ends with Isaacs, case-insensitive
                                      .toArray();
```

MongoDB query language features the following operators:
+ `$eq`, `$neq` &mdash; equality, inequality to some value
+ `$in`, `$nin` &mdash; find some value in/not-in an array
+ `$lt`, `$lte`, `$gt`, `$gte` &mdash; greater/less than or equal to comparisons
+ `$near` &mdash; geospatial value is near a given coordinate
+ `$not`, `$and`, `$or`, `$nor` &mdash; logical operators

##### MongoDB Identifiers

Objects stores in a *MongoDB* backend are given a *MongoDB* identifier `_id`, which is encoded in *BSON* (binary JSON format). This identifier encodes metadata about where and when the id was generated, so it's more than just a random sequence of bytes.

As such, there are some *API operations* available on IDs:
```javascript
const id = new ObjectID(...);
console.log(`object created at: ${ id.getTimestamp() }`);
```

As objects, id's should be compared using ObjectID's `equal` operator, as simple equals will say two objects with the same `_id` and properties are not equal if they reference to different object instances:
```javascript
if (article1._id.equals(article2._id)) {
  // ... correct way to do it ...
}
```