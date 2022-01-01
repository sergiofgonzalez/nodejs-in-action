# 07: Misc concepts &mdash; Configuring Nodemon for reloading
> Using nodemon to recompile and restart your TypeScript application when you make changes to your application.

## Description

[nodemon](https://github.com/remy/nodemon) is a well-known tool that helps restarting a Node.js application when file changes in a particular file or directory are detected.

However, nodemon is not readily suited for TypeScript projects, and it requires a little bit of extra work.

There are several ways to configure nodemon: using config files, creating a configuration object in your `package.json`, or directly creating an entry in your `"scripts"` section of your `package.json`.

I've found that using the latter seems to be most appropriate one, as that approach makes it explicit what is done and how:

```json
  "scripts": {
  ...
      "watch": "nodemon --watch app --ext ts,json,ico,css,html,ejs,js --exec \"npm run start\"",
  ...
  }
```

Let's examine the command arguments to understand what we are instructing *nodemon* to do:
+ `--watch app` &mdash; watch for changes on `app/**/*`, where we keep all of our source code and static resources.
+ `--ext ts,json,ico,png,jpg,jpeg,css,html,ejs` &mdash; configure the extensions to watch. Note that you might need to tailor this list to your needs.
+ `--exec "npm run start"` &mdash; instruct nodemon to run `npm start` each time a change is detected.

