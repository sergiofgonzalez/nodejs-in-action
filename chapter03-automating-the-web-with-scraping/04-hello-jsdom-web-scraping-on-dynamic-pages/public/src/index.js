"use strict";

const jsdom = require("jsdom");
const fs = require("fs");

const webPagePath = `${__dirname}/rsrc/page.html`;
const jqueryPath = `${__dirname}/../node_modules/jquery/dist/jquery.js`;

const html = fs.readFileSync(webPagePath);

const doc = jsdom.jsdom(html);
const window = doc.defaultView;

jsdom.jQueryify(window, jqueryPath, function () {
  let $ = window.$;
  $(".book").each(function () {
    let $el = $(this);
    console.log({
      title: $el.find("h2").text(),
      author: $el.find("h3").text(),
      description: $el.find(".card-text").text()
    });
  });
});

