"use strict";

const { MongoClient, ObjectID } = require("mongodb");

let db = undefined;

module.exports.initialize = async (connectionUrl) => {
  console.log(`Connecting to MongoDB instance`);
  db = await MongoClient.connect(connectionUrl);
};

module.exports.shutdown = () => {
  console.log(`Closing connection to MongoDB instance`);
  if (db) {
    db.close();
  }
};

module.exports.Article = {
  all() {
    return db.collection("articles").find().sort({ title: 1 }).toArray();
  },

  findById(_id) {
    if (typeof _id !== "object") {
      _id = ObjectID(_id);
    }
    return db.collection("articles").findOne({ _id });
  },

  create(article) {
    return db.collection("articles").insertOne(article, { w: 1 });  // write at least in one node
  },

  deleteById(_id) {
    if (typeof _id !== "object") {
      _id = ObjectID(_id);
    }
    return db.collection("articles").deleteOne({ _id }, { w: 1 });    
  }
};