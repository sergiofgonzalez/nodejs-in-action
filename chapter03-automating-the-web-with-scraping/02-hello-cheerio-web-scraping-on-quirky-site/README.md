# 02-hello-cheerio-web-scraping-on-quirky-site
> extracting information from HTML pages using *cheerio* module on a quirky site

## Description
Illustrates how to extract information from an HTML page that uses old-school HTML (no classes, mostly only HTML elemtns) and how to build a JavaScript object out of it. 

In the example, a very quirky HTML web page is found in the `rsrc` folder. The web page contains within it the details of an imaginary book titled *Catch-22*. In the Node application, this html is read and the book information is transformed into a JavaScript object using `cheerio`.

To locate the information in the web page we use references to elements and classes:
```html
<table>
  <tr>
    <td><a href="/book1">Catch-22</a></td>
    <td>Joseph Heller</td>
    <td>A satirical indictment of military madness.</td>
  </tr>
</table>
```

is extracted using:
```JavaScript
const book = {
  title: $("table tr td a").first().text(),       // navigate to table >> tr >> td >> a, get first elem contents 
  href: $("table tr td a").first().attr("href"),  // navigate to table >> tr >> td >> a, get first attr value for href property
  author: $("table tr td").eq(1).text(),          // navigate to table >> tr >> td, get second elem contents
  description: $("table tr td").eq(2).text()      // navigate to table >> tr >> td, get third elem contents
};
```

### Additional info
The example relies on two Node.js modules:
+ *cheerio* &mdash; simple and flexible HTML parsing
+ *moment* &mdash; date manipulation library