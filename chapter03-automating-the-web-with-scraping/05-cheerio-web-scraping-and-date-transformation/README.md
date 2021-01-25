# 05-cheerio-web-scraping-and-date-transformation
> extracting information from HTML pages, parsing dates and generating CSV using *cheerio* and *moment* modules

## Description
Illustrates how to extract information from an HTML page,build a JavaScript object out of it, and then use `moment` to transform dates and print the information in *CSV* format in the console.

In the example, a very basic but complete HTML web page is found in the `rsrc` folder. The web page contains within it the details of two imaginary books that should be scraped. In the Node application, this html is read and the books are pushed into an array.

Then, `moment` is used to transform the dates, and finally we iterate over the array of books using `console.log` to print the information in *CSV* format.

### Additional info
The example relies on two Node.js modules:
+ *cheerio* &mdash; simple and flexible HTML parsing
+ *moment* &mdash; date manipulation library
