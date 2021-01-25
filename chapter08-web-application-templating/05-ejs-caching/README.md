# 05-ejs-caching
> caching EJS calls for a particular file

## Description

Illustrates how to cache calls to `ejs.render` for a particular filename.

In the example, we have a simple HTTP server that returns a template. The template will be cached in `NODE_ENV` variable is set to `production`.
If you run the application without additional environment variables set, you will notice that you can change `students.ejs`, click refresh on your browser and the changes will be displayed.

However, if you run your application with:
```bash
NODE_ENV=production npm start
```

the cache will be enabled and once the template has been read, the changes on the tempalte will no longer be reflected.