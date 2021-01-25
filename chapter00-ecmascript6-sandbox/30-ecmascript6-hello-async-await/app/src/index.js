"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* An example function that returns a Promise and therefore can be awaited */
function fetch(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Hello article for ${ url } @ ${ new Date().toISOString() }`, 1500);
    });
  });
}

// Some unimportant support functions
function renderView(content) {
  console.log(`Transforming content into HTML`);
  return `<html><body>${ content }</body></html>`;
}

function setPage(html) {
  console.log(`Displaying page to the user
  ${ html }
  `);
}


/* 
  Let's assume that we have a function that controls a basic workflow:
  + uses fetch to retrieve a web page from the server
  + renders the page to obtain an html object
  + displays the html object to the user
*/

// Pre async-await
function appLifeCycle() {
  fetch("/some/url")
    .then(res => renderView(res))
    .then(html => setPage(html))
    .then(() => console.log(`Successfully changed page!`));
}


appLifeCycle();
console.log("======================");


/*
  Now using async-await
*/
async function changePage() {
  try {
    const model = await fetch("/some/url");
    const html = await renderView(model);
    await setPage(html);
    console.log(`Successfully changed page!`);
  } catch (e) {
    console.log(`An error occurred while changing the page`);
  }
}

changePage();

/* async functions return a Promise */
changePage()
  .then(() => console.log(`changePage resolved!`))
  .catch(err => console.log(`changePage rejected: ${ err }`));