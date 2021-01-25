# 04-restful-express-with-persistence-layer
> Express based RESTful server with body parsing support and a persistence layer using SQLite

## Description
Illustrates how to create a simple RESTful layer to manage *articles*:

The following routes must are enabled:
+ `POST /articles` &mdash; Create a new article
+ `GET /articles/:id` &mdash; Retrieve the given article
+ `GET /articles` &mdash; Retrieve all the articles
+ `DELETE /articles/:id` &mdash; Delete an article

The parsing is performed with the `body-parser` module configured to handle both form encoded data and JSON.

The persistence layer exposes the following methods:
+ `Article.all(callback)` &mdash; Return all articles
+ `Article.find(id, callback)` &mdash; Return the corresponding article
+ `Article.create(article, callback)` &mdash; Save/Update the given article
+ `Article.delete(id, callback)` &mdash; Deletes the given article


The data for the application is persisted on a *SQLite* database. The file `later.sqlite` will be created to maintain the articles data between executions. This file will be automatically created on the first run.

### Testing the application with curl
You can use `curl` to test the application
```bash
# Test create a new article using form encodied bodies 
$ curl --data "title=New Article Form" http://localhost:port/articles

# Test create a new article using form encodied bodies 
$ curl curl --header "Content-Type: application/json" \
--data '{"title": "My first article title", "content": "My first article."}' \
http://localhost:5000/articles

# Test retrieve the given article 1
$ curl http://localhost:port/articles/1

# Test retrieve all the articles
$ curl http://localhost:port/articles

# Test delete article
$ curl --request "DELETE" http://localhost:5000/articles/1

```

### Additional info
The project can be used as a template for all *Express* based projects. It includes the `config` custom module and lists `express`, `body-parser` and `log4js` as dependencies.
The *SQLite* database layer is handled with `sqlite3` module.
As the `config` module is not published in *NPM*, config dependencies `nconf` and `js-yaml` are also added in the `package.json`.
