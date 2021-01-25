"use strict";

const fs = require("fs");
const cheerio = require("cheerio");
const util = require("util");
const moment = require("moment"); // eslint-disable-line
const html = fs.readFileSync(`${__dirname}/rsrc/page.html`);

const $ = cheerio.load(html);

const books = $(".book")
  .map((i, el) => {
    return {
      author: $(el).find("h2").text(),
      title: $(el).find("h3").text(),
      description: $(el).find("p").text(),
      published: $(el).find("h4").text()
    };
  })
  .get();


console.log(`books before acting on dates=${util.inspect(books)}`);

console.log("=== csv =============");
books.forEach(book => {
  let date = moment(new Date(book.published));
  console.log("%s,%s,%s,%s,%s", book.author, book.title, book.published, date.format("YYYY-MM-DD"), book.description);
});