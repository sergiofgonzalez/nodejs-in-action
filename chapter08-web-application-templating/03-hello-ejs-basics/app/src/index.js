"use strict";

const ejs = require("ejs");

/* 
  Simple Templating:

  The function signature is `render(template, context, options)`
*/

(() => {
  const template = "<%= message %>";
  const context = { message: "Hello to Jason Isaacs" };
  const result = ejs.render(template, context);

  console.log(`result=${ result }`);
})();



/*
  EJS automatically escapes special characters in context
  to prevent XSS
*/
(() => {
  const template = "<%= message %>";
  const context = { message: "<script>alert('hello, XSS')</script>" };
  const result = ejs.render(template, context);

  console.log(`result=${ result }`);
})();

/*
  You can disable automatic scaping 
  (for trusted embedded HTML scenarios)
  using <%- %>
*/
(() => {
  const template = "<%- message %>";
  const context = { message: "Hello to <strong>Jason Isaacs</strong>" };
  const result = ejs.render(template, context);

  console.log(`result=${ result }`);
})();


