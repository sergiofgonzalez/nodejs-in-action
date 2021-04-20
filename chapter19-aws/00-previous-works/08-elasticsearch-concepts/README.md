# 08 &mdash; Hello, *AWS Elasticsearch*
> A few entry-level concepts about *AWS Elasticsearch*

## Intro to *Elasticsearch*

*Elasticsearch* is a popular service that provides a search engine and analytics tool backed by a *schema-less* document database.

All the components of the service are designed to be scalable, highly available and efficient. In particular, the databse is distributed acrross nodes, which can be further split into shards that are replicated to prevent any data loss.

By using *Elasticsearch* with additional tools such as *Logstash*, *Kibana, etc. you can complete a stack commonly known as the *Elastic stack* (also *ELK*) with *Elasticsearch* being the heart of it.

### Elastisearch concepts

An *Elasticsearch* instance is known as a *cluster*, which is the top level of a *Elasticsearch deployment*, and where the rest of components will be defined.

Within a *cluster* you will find *nodes* &mdash: individual processing units, that are typically segregated and replicated to provide fault-tolerance.

Within each node you will find *indices*. You can think of an index as a dataset. That is, an *index* is the actual container of our data as *schema-less* documents.

That is, every entry of an index is a *document*, with each document stored as an individual JSON object with (possibly) a different structure:

```json
{
  "id": 1,
  "username": "jason.isaacs",
  "email": "jason.isaacs@wittertainment.com",
  "greeting": "Hello to Jason!"
}
```

and another document in the same index might be:
```json
{
  "id": 1,
  "username": "kenneth.branagh",
  "email": "ken.branagh@wittertainment.com",
  "nickname": "chuckles"
}
```

*Indices* themselves can be broken down into smaller subsets called *shards* which can be reconfigured and stored across multiple nodes.

### Amazon Elasticsearch

*Amazon ElastichSearch* is an analytics service from AWS that makes it easy to deploy, secure, operate, and scale *Elasticsearch* to search, analyze, and visualize data in real-time. The service offers integration with OSS tools like *Kibana* and *Logstash* for data ingestion and visualization.

In *Amazon Elasticsearch*, the unit of deployment is the domain.

