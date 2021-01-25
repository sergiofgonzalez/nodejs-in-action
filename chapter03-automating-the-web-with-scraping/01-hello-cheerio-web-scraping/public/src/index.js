"use strict";

const fs = require("fs");
const cheerio = require("cheerio");
const util = require("util");


const html = fs.readFileSync(`${__dirname}/rsrc/page.html`);
console.log(`Original HTML=${html}`);

const $ = cheerio.load(html);

const book = {
  title: $(".book h2").text(),        // class=book, element h2
  author: $(".book h3").text(),       // class=book, element h3
  description: $(".book p").text()    // class=book, element p
};

console.log(`Book scraped from the WebPage=${util.inspect(book)}`);
