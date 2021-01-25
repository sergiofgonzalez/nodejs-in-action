# 03-restful-express-with-body-parsing
> Express based RESTful server with body parsing support

## Description
Illustrates how to create a simple RESTful layer supporting body parsing to manage *articles*:

The following routes must are enabled:
+ `POST /articles` &mdash; Create a new article
+ `GET /articles/:id` &mdash; Retrieve the given article
+ `GET /articles` &mdash; Retrieve all the articles
+ `DELETE /articles/:id` &mdash; Delete an article

The parsing is performed with the `body-parser` module configured to handle both form encoded data and JSON.

The data for the application is retrieved from a JSON file residing in `mock-data/` directory. The JSON file is *required* as if it were a module and then used in the application.

### Testing the application with curl
You can use `curl` to test the application
```bash
# Test create a new article using form encodied bodies 
$ curl --data "title=New Article Form" http://localhost:port/articles

# Test create a new article using form encodied bodies 
$ curl curl --header "Content-Type: application/json" --data '{"title": "New Article JSON"}' http://localhost:5000/articles

# Test retrieve the given article 1
$ curl http://localhost:port/articles/1

# Test retrieve all the articles
$ curl http://localhost:port/articles

# Test delete article
$ curl -X "DELETE" http://localhost:port/articles/1

```

### Additional info
The project can be used as a template for all *Express* based projects. It includes the `config` custom module and lists `express`, `body-parser` and `log4js` as dependencies.
As the `config` module is not published in *NPM*, config dependencies `nconf` and `js-yaml` are also added in the `package.json`.
