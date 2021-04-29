# HTML basics refresher
> practising some HTML concepts

This section does not intend to be a tutorial. It only contains documentation and examples of specific HTML topics.

## Concepts

### HTML first steps

#### Block vs. inline elements

There are two important categories of HTML elements:

+ **Block-level elements** form a visible block on a page. A *block-level element* appears on a new line following the content that precedes it. Any content that follows a *block-level element* also appears on a new line.<br>*Block-level elements* are usually structural elements on the page, such as headings, paragraphs, lists, navigation menus, or footers.<br>*A block-level* element wouldn't be nested inside an inline element, but it might be nested inside another *block-level* element.

+ **Inline elements** are contained within *block-level elements*, and surround only small parts of the document's content. An *inline element* will not cause a new line to appear in the document. It is typically used with text, for example `<a>` element to create a hyperlink in some existing text, or `<em>` or `<strong>` to create emphasis on some parts of a paragraph text.

Consider the following example:

```html
<em>first</em><em>second</em><em>third</em>
<p>fourth</p><p>fifth</p><p>sixth</p><em>seventh</em>
```

As `<em>` is an inline element, the first line would be displayed on a single line, while fourth, fifth and sixth will appear on their own line. The next `<em>` will also appear on their own line as it is following a *block-level element*.

| NOTE: |
| :---- |
| The terms *block* and *inline* should not be confused with the types of *CSS boxes* of the same name. Applying a *block* styling to an element would not change the *nature* of the element as a *block-level* element. |

### Boolean attributes

Sometimes you will find attributes written without values. These are called Boolean attributes. Boolean attributes can only have one value, which is generally the same as the attribute name:

```html
<input type="text" disabled="disabled">
```

You will typically find the shorthand:

```html
<input type="text" disabled>
```

And if you want to make it *enabled* you'd just leave out the `disabled` attribute:

```html
<input type="text"> <!-- enabled input -->
```

| NOTE: |
| :---- |
| In JavaScript you can set *Boolean* attributes doing `input.disabled = true` and `input.disabled = false`. See [01 &mdash; Setting *Boolean* attributes from JavaScript](01-boolean-attrs-js) for an example. |

### HTML entities

You can find the complete list of HTML character entities (such as `'&mdash;'` for &mdash; or `'&lt;'` for `<`) in https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references.

### Adding an icon to your page

You can add an icon to your HTML page by including the following line in your HTML's `<head>` block:

```html
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

| NOTE: |
| :---- |
| Most modern browsers support GIF and PNG images for icons, but using a `'.ico'` will ensure compatibility with older browsers.<br>Note also that you might need to include a *CSP* `img-src` directive to allow fetching the icon of your HTML page. |

### Applying styles to an HTML page

The `<link>` element that goes inside the `<head>` of your document can be used to reference the different CSS stylesheets that you want to apply to your document:

```html
<head>
  <link rel="stylesheet" href="{path-to-local-css-or-remote-url}">
</head>
```

For example:

```html
<link rel="stylesheet" href="https://mystyles.example.com/mystyles.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link rel="stylesheet" href="stylesheets/styles1.css">
```

### Applying JavaScript to an HTML page

The `<script>` element (that should go in the `<head>` of your doment), lets you load the JavaScript programs at the same time as the page's HTML.

```html
<head>
  <script src="javascript/app.js" type="module" defer></script>
</head>
```

Note the `defer` boolean attribute &mdash; in modern browsers, this is the most foolproof option to ensure that you don't get errors resulting from JavaScript trying to access an HTML element that doesn't exist on the page yet.

In older browsers, it was common to find the `<script>` tags at the bottom of the `<body>` because browsers load the elements of an HTML page in the order in which they appear. Also, the fetching processes were blocking. Thus, if you included a `<script>` tag at the beginning of the document, it will block the loading of the subsequent elements, thus causing very poor UX for heavy pages.

Also, we wanted to make sure that the JavaScript was executed when all the HTML were loaded, so that the JavaScript found all the elements it was waiting to find.

Nowadays, we have modern techniques that give us all the necessary control about how JavaScript is fetched, loaded and executed: `async` and `defer`.

JavaScript programs using the `async` attribute will be downloaded without blocking the rendering of the page, and executed as soon as the script finishes downloading. This is useful when the scripts in the page do not depend on the content of the page, and if you have several `<script>` tags, you don't care which one gets loaded first.

JavaScript referenced using the `defer` attribute, will run in the order they appear in the page, and will execute as soon as both the script and content are downloaded.

Both, `async` and `defer` attributes make the browser to download the scripts in a different thread from the one that is parsing the HTML page, and therefore offer a good UX. If your scripts need to wait for parsing the HTML and might have dependencies between them, use `defer`. If your scripts should run as soon as possible and they don't have dependencies with the HTML page or other scripts, use `async`.

### Additional meta elements: `name` and `content`

You can use the meta elements `name` and `content` to include additional information about your page. They will be typically used by search engines and content management systems:

```html
<meta name="author" content="Sergio F. Gonzalez">
<meta name="description" content="This page is intended to be used as a sandbox for practising and refreshing some HTML concepts.">
```

### Semantic vs. Presentational elements

Semantic elements such as `<em>` for emphasis, and `<strong>` for strong emphasis should be preferred over presentational elements such as `<b>`, `<i>` and `<u>`. The latter came about in an era where CSS was not omnipresent as it is now. Using the semantic elements would let you leverage additional features such as accesibility, SEO optimization that would be impossible with presentational elements.

### Link attributes: `download`, `target`, and `title`,

When you link to a resource that's to be downloaded rather than opened in the browser, use the `download` attribute to provide a default save filename:

```html
<a href="https://pictures.example.com/foo/bar.png" download="bar.png">download bar.png</a>
```

The `target` attribute is used to display the linked URL:
  + `target="_self"`: the current browsing context (default).
  + `target="_blank"`: usually a new tab, but users can configure browsers to open a new window instead.
  + `target="_parent"`: the parent browsing context of the current one. If no parent, it behaves as `_self`.
  + `target="_top"`: the topmost browsing context. If no ancestors, behaves as `_self`.

The `title` attribute contains additional information about the link:

```html
<a href="https://pictures.example.com/" title="An example website with thousands of free-to-use pictures for you to use">Pictures</a>
```

### Some additional semantic elements worth mentioning

#### Description lists

The purpose of description lists is to mark up a set of items and their associated descriptions, such as terms and definitions, or questions and answers.

```html
<dl>
  <dt>Term 1</dt>
  <dd>Definition for term 1</dd>
  <dt>Term 2</dt>
  <dd>Definition for term 2</dd>
  <dd>Additional info for term 2</dd>
  ...
</dl>
```

#### Blockquotes and inline quotations

You can use the `<blockquote>` and its `cite` attribute when quoting text from somewhere else:

```html
<p>And as Mark Twain said (probably with other words)...<p>
<blockquote cite="https://quoteinvestigator.com/2018/11/18/know-trouble/">
  <p>Assumption is the mother of all fuckups.<p>
</blockquote>
```

Inline quotations work in the same way, but using the `<q>` element:

```html
<p>The quote element is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended for short quotations that don't require paragraph breaks</q><p>
```

In relation to `<blockquote>` and `<q>`, the `<cite>` element is meant to contain the title of the resource being quoted:

```html
<p>
According to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote"><cite>MDN blockquote page</cite></a>:
<p>
```

#### Abbreviation

The element `<abbr>` is use to wrap around an abbreviation or acronym, and provide a full expansion of the term:

```html
<p>The first browser was developed by <abbr title="National Center for Supercomputing Applications">NCSA</abbr> and was called Mosaic<p>
```

#### Address

The `<address>` element is used to mark up contact details:

```html
<address>
  <p>Jason Isaacs, 3 Mill Lane, London, W30 9ZG<p>
</address>
```

Note that it can also be used to mention the author of a page:

```html
<address>
  <p>Page written with ❤️ by <a href="https://github.com/sergiofgonzalez">me</a><p>
</address>
```

#### Superscript and subscript

The `<sup>` and `<sub>` elements are used to mark up superscript and subscript text:

```html
<p>I was born on the 5<sup>th</sup> of February and my favorite beverage is H<sub>2</sub>O</p>
```

#### Computer code related markup

The following elements are used for marking up computer code:

+ `<code>` &mdash; mark up pieces of computer code
+ `<pre>` &mdash; preserving whitespace (for code indentation purposes)
+ `<var>` &mdash; for marking up variable names
+ `<kbd>` &mdash; for marking up keyboard input to be entered
+ `<samp>` &mdash; for marking up the output of a computer program

#### Marking up times and dates

The `<time>` element is used for markin up times and dates in a machine readable format:

```html
<time datetime="2021-04-27">Apr 27, 2021</time>
```

#### Using the Data List element to implement an autocomplete input

The `<datalist>` element contains a set of `<option>` elements that represents the permissible or recommended options available to choose from within other controls:

```html
<label for="ice-cream-choince">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choince" name="ice-cream-choice">
<datalist id="ice-cream-flavors">
  <option value="Chocolate">
  <option value="Strawberry">
  <option value="Vanilla">
  <option value="Cream">
</datalist>
```

#### Using label for an item in a UI

The `<label>` element represents a caption for an intem in a user interface:

```html
<label for="input">Text Input</label>
<input type="text" id="input" placeholder="Type some text">
```

### Basic sections of a document

Webpages tend to share similar standard components:

| Section | HTML tag | Description |
| :------ | :------- | :---------- |
| header | `<header>` | Usually a big strip across the top with a big heading, logo, and perhaps a tagline.<br>This usually stays the same from one webpage to another. |
| navigation bar | `<nav>` | Links to the site's main sections. Usually represented by menu buttons, links, or tabs.<br>Like the header, this content usually remains consistent from one webpage to another. |
| main content | `<main>` | A big area in the center that contains most of the unique content of a given webpage.<br>This part varies from page to page in the website.<br>You might find content subsections represented by `<article>`, `<section>` and `<div>` elements within `<main>`. |
| sidebar | `<aside>` | Some peripheral info, links, quotes, etc. Usually, this is contextual to what is contained in the main content (for example, on a news article page, the sidebar might contain the author's bio, or links to related articles) but in some cases you'll find some recurring elements such as a secondary navidation system.<br>You might find the `<aside>` element often placed within `<main>`. |
| footer | `<footer>` | A strip across the bottom of the page that generally contains fine print, copyright notices, or contact info. It's a place to put common information (like the header). |

![Sections of a document](images/sections_of_a_doc.png)


When writing a page, all these sections are specified one below the other on the document without minding where their position will be in the document. The latter will be responsibility of the CSS associated to the document.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>My page title</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="stylesheets/styles1.css">
  </head>
  <body>
    <header>
      <h1>Header</h1>
    </header>

    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Our team</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <form>
        <input type="search" name="q" placeholder="Search query">
        <input type="submit" value="Go!">
      </form>
    </nav>

    <main>
      <article>
        <h2>Article heading</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a
          diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as
          quam viverra nec consectetur ant hendrerit. Donec et mollis dolor.
          Praesent et diam eget libero egestas mattis sit amet vitae augue.
          Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
        </p>

        <h3>Subsection</h3>
        <p>
          Donec ut librero sed accu vehicula ultricies a non tortor. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida
          lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.
        </p>

        <p>
          Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus,
          enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis
          libero in urna ultrices accumsan. Donec sed odio eros.
        </p>

        <h3> Another subsection</h3>
        <p>Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum soclis
           natoque penatibus et manis dis parturient montes, nascetur ridiculus mus.
           In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac
           in est.
        </p>

        <p>
          Vivamus fermentum semper porta. Nunc diam velit, adipscing ut tristique
          vitae sagittis vel odio. Maecenas convallis ullamcorper ultricied. Curabitur
          ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, is
          fringille sem nunc vet mi.
        </p>
      </article>

      <aside>
        <h2>Related</h2>
        <ul>
          <li><a href="#">Oh, I do like to be beside the seaside</a></li>
          <li><a href="#">Oh, I do like to be beside the sea</a></li>
          <li><a href="#">Although in the North of England</a></li>
          <li><a href="#">It never stops raining</a></li>
          <li><a href="#">Oh, well...</a></li>
        </ul>
      </aside>
    </main>

    <footer>
      <p>With ❤️ from nobody. All rights reversed.</p>
    </footer>
  </body>
</html>
```

![HTML document rendition](02-html-sections/docs/images/html_doc.png)

| EXAMPLE: |
| :------- |
| See [02 &mdash; Sections of an HTML document](02-html-sections) for a runnable example. |

### Non-semantic wrappers

HTML provides the `<div>` and `<span>` elements to group a set of elements together and act on them with CSS or JavaScript.

`<span>` is an inline non-semantic element typically used to wrap some text for which you don't want to add any specific meaning.

```html
<p>
  This is a paragraph that contains
  some <span class="some-class">text wrapped</span> in
  a span.
<p>
```

`<div>` is a block-level non-semantic element, which should be used only if you can't think of a better semantic block element to use, or don't want to add any specific meaning:

```html
<div class="shopping-car">
  <h2>Shopping cart</h2>
  <ul>
    <li>
      <p><a href="#"><strong>item 1</strong></a>: $19.95</p>
      <p><a href="#"><strong>item 2/strong></a>: $29.95</p>
    </li>
  </ul>
  <p>Total cost: $49.90</p>
</div>
```

### A few guidelines for planning a simple website

When designing a simple website try and follow these steps:

1. As you will have some elements common to most of the pages, it is a good idea to start noting down these common elements (navigation menu, footer, etc.)

![Step 1: note down common features](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure/common-features.png)

2. Next, draw a rough sketch of what you might want the structure of each page to look like.

![Step 2: draw a sketch for each page](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure/site-structure.png)

3. Then, create a big list with the content the website will feature:

![Step 3: work on a list with the website content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure/feature-list.png)

4. After that, sort these content items into groups, so that you have an idea of what parts might live together on different pages:

![Step 4: sort and organize contents into groups](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure/card-sorting.png)

5. Sketch a rough sitemap, have a bubble for each page and draw lines to show the typical navigation between pages. The homepage should be drawn in the center and link to most of the pages. You might also want to include additional notes about how things should be presented.

![Step 5: sketch the sitemap](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure/site-map.png)

### Debugging HTML

The way browsers parse HTML is very permissive and you will find that even HTML documents with incorrectly written markup work as expected.

You can use the [Markup Validation Service](https://validator.w3.org/) from *W3C* to validate your HTML documents.

## Examples, Exercises and mini-projects

### [01 &mdash; Setting *Boolean* attributes from JavaScript](01-boolean-attrs-js)
Illustrates how to set boolean values from JavaScript, and how it is different from the approach you'd use in plain HTML.

### [02 &mdash; Sections of an HTML document](02-html-sections)
An HTML document, with no associated CSS in which all the main sections are considered: header, main, navigation bar, main content, sidebar and footer.

### [e01 &mdash; Marking up a letter](e01-marking-up-a-letter)
An exercise from [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter) illustrating how to mark up a letter in HTML.

### [e02 &mdash; Structuring a page of content(e02-structuring-a-page-of-content)]
Another exercise from [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content) illustrating how to structure a page of content using the appropriate structural semantics.