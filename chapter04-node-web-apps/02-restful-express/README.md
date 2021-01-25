# 02-restful-express
> creates the scaffolding for an Express based RESTful server

## Description
Illustrates how to create a simple RESTful layer to manage *articles*:

The following routes must are enabled:
+ `POST /articles` &mdash; Create a new article
+ `GET /articles/:id` &mdash; Retrieve the given article
+ `GET /articles` &mdash; Retrieve all the articles
+ `DELETE /articles/:id` &mdash; Delete an article

The data for the application is retrieved from a JSON file residing in `mock-data/` directory. The JSON file is *required* as if it were a module and then used in the application.

**NOTE**
The application responds to `POST` messages but does handle the message body.

### Additional info
The project can be used as a template for all *Express* based projects. It includes the `config` custom module and lists `express` and `log4js` as dependencies.
As the `config` module is not published in *NPM*, config dependencies `nconf` and `js-yaml` are also added in the `package.json`.

### Testing the application with curl
You can test the application with curl:

```bash
# Test create a new article
$ curl -X "POST" http://localhost:port/articles

# Test retrieve the given article 1
$ curl http://localhost:port/articles/1

# Test retrieve all the articles
$ curl http://localhost:port/articles

# Test delete article
$ curl -X "DELETE" http://localhost:port/articles/1

```
