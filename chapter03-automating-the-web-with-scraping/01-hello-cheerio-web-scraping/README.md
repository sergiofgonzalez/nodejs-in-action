# 01-hello-cheerio-web-scraping
> extracting information from HTML pages using *cheerio* module

## Description
Illustrates how to extract information from an HTML page and build a JavaScript object out of it. 

In the example, a very basic but complete HTML web page is found in the `rsrc` folder. The web page contains within it the details of an imaginary book titled *Catch-22*. In the Node application, this html is read and the book information is transformed into a JavaScript object using `cheerio`.

To locate the information in the web page we use references to elements and classes:
```html
<div class="book">
  <h2 class="card-title">Catch-22</h2>
  <h3 class="card-subtitle mb-2 text-muted">Joseph Heller</h3>
  <p class="card-text">A satirical indictment of military madness.</p>
</div>
```

is extracted using:
```JavaScript
const book = {
  title: $(".book h2").text(),        // class=book, element h2
  author: $(".book h3").text(),       // class=book, element h3
  description: $(".book p").text()    // class=book, element p
};
```

### Additional info
The example relies on two Node.js modules:
+ *cheerio* &mdash; simple and flexible HTML parsing
+ *moment* &mdash; date manipulation library