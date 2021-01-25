"use strict";

const fs = require("fs");
const cheerio = require("cheerio");
const util = require("util");


const html = fs.readFileSync(`${__dirname}/rsrc/messy-page.html`);
console.log(`Original HTML=${html}`);

const $ = cheerio.load(html);

const book = {
  title: $("table tr td a").first().text(),       // navigate to table >> tr >> td >> a, get first elem contents 
  href: $("table tr td a").first().attr("href"),  // navigate to table >> tr >> td >> a, get first attr value for href property
  author: $("table tr td").eq(1).text(),          // navigate to table >> tr >> td, get second elem contents
  description: $("table tr td").eq(2).text()      // navigate to table >> tr >> td, get third elem contents
};

console.log(`Book scraped from the WebPage=${util.inspect(book)}`);
