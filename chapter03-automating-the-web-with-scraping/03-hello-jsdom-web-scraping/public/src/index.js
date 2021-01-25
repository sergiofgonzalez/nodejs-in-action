"use strict";

const jsdom = require("jsdom");

console.log(`dirname=${__dirname}`);

jsdom.env(`${__dirname}/rsrc/page.html`, [`${__dirname}/../node_modules/jquery/dist/jquery.js`], scrape);


function scrape(err, window) {
  var $ = window.$;                         // alias the jquery object for convenience
  $(".book")                                // locate class=book
    .each(function () {                     // for each element found
      var $el = $(this);                    // iterator.next ;)
      console.log({                     
        title: $el.find("h2").text(),       // find the contents of element h2
        author: $el.find("h3").text(),      // find the contents of element h3
        description: $el.find("p").text()   // find the contents of element p
      });
    });
}