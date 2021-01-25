# 03-hello-jsdom-web-scraping
> extracting information from HTML pages using *jsdom* module and *jquery*

## Description
Illustrates how to extract information from a static HTML page and build a JavaScript object out of it using `jquery`. 

In the example, a very basic but complete HTML web page is found in the `rsrc` folder. The web page contains within it the details of an imaginary book titled *Catch-22*. In the Node application, this html is read and the book information is transformed into a JavaScript, first by using `jsdom` and then using `jquery` to traverse the page obtaining the information needed.

Once you have *injected* jquery, its methods are used to find and extract the elements:
```JavaScript
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
```

### Additional info
The example relies on two Node.js modules:
+ *jsdom* &mdash; powerful HTML manipulation library
+ *jquery* &mdash; JavaScript library for DOM operations