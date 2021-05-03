# CSS basics
> practising CSS concepts

## Concepts

### CSS first steps

*Cascading Style Sheets (CSS)* is a rule based language that is used for specifying how documents are presented to users &mdash; you define rules specifying groups of styles that should be applied to particular elements or groups of elements on your web page.

For example, you might need to "style the main heading on my page to be shown as large red text":

```css
h1 {
  color: red;
  font-size: 5em;
}
```

The rules opens with a *selector*, which select which element are we going to style (`<h1>` in this case).

We then have a set of curly braces that group one or more declarations in the form: `property: value` pairs.

The *CSS properties* have different allowable values depending on the property being specified. For example, `color` can take various *color values*. `font-size` property can take various *size units* as a value.

A CSS stylesheet can contain many rules, one after the other, all of them following the same general syntax:

```css
h1 {
  color: red;
  font-size: 5em;
}

p {
  color: black;
}
```

There are many things you can do with CSS, so the language is broken down into modules, such as *Background and Borders*. Within each module, you will find the definition of relevant properties such as `background-color` and `border-color`.


In order to see CSS in action, you start with a simple HTML document, and add the following line inside the `<head>` of the HTML document:

```html
<link rel="stylesheet" href="path/to/styles.css">
```

Then you can start adding rules to the `styles.css` file to start styling an HTML document:

```css
/* style all h1 elements with text in red */
h1 {
  color: red;
}

/* style p and li elements with green text */
p, li {
  color: green;
}
```

The actions you can do with CSS are not limited to simply styling. You can also do more *earth shattering things* such as changing the way in which items are being displayed in the browser by default:

```css
li {
  list-style-type: none; /* removes bullet point from list items */
}
```

Also, selectors are not limited to HTML elements. Most of the times, you would like elements of the same type (such as `<h1>` or `<li>`) to be styled differently in the document.

The most common way to select only a subset of elements without changing others is to add a *class* to your HTML element and target that class in your CSS.

For example, consider the following HTML:

```html
<ul>
  <li>Item one</li>
  <li class="special">Item two</li>
  <li>Item <em>three</em></li>
</ul>
```

A `class` attribute has been added to the second item in the list. Now, we can define a rule that target specifically that item:

```css
.special {
  color: orange;
  font-weight: bold;
}
```

Now, we can also apply that class to any element that we want to style in the same way. For example:

```html
<p>
  This is a paragraph of text. In the text is
  a <span class="special">span element</span> and
  also a <a href="https://example.com">link</a>.
</p>
```

You can make the rule more *specific*, and target any `li` element that has a class of `"special"`. That will make the rule not to be applied to the `<span>` element above:

```css
li.special {
  color: orange;
  font-weight: bold;
}
```

You can also target `<li>` and `<p>` elements with the class special using:

```css
li.special,
span.special {
  color: orange;
  font-weight: bold;
}
```

Using CSS it is also possible to target specific elements nested inside others using what is called the *descendant combinator*.

For example, consider the following snippet of HTML that features two `<em>` elements wrapped in different elements (one inside a `<p>`, the other inside a `<li>`):

```html
<p>
  This is the second paragraph. It contains an <em>emphasized</em> element.
</p>

<ul>
  <li>Item <span>one</span></li>
  <li class="special">Item two</li>
  <li>Item <em>three</em></li>
</ul>
```

We can target the `<em>` wrapped inside the `<li>` doing:

```css
li em {
  color: rebeccapurple;
}
```

You can also use the following syntax to style a paragraph that comes directly after a heading at the same hierarchy level in the HTML (this is called the *adjacent sibling combinator*):

```css
h1 + p {
  font-size: 200%
}
```

It is also possible to style things based on their state. The obvious example is to style a link based on their unvisited, visited, hovered over...

```css
/* style unvisited links in pink */
a:link {
  color: pink;
}

/* style visited links in green */
a:visited {
  color: green;
}

/* remove underline when hovering over links */
a:hover {
  text-decoration: none;
}
```

Finally, it is worth mentioning that you can combine selectors and combinators:

```css
/* selects <span> located inside <p>, for <p> in <article> */
article p span { ... }

/* selects the first <p> in the first <ul> after the <h1> */
h1 + ul + p { ... }

/* selects any element inside the first p coming after the h1 in the body with class="special" */
body h1 + p .special { ... }
```

| EXAMPLE: |
| :------- |
| See [01 &mdash; Hello, CSS!](01-hello-css) for an example illustrating these types of rules. |

### Applying CSS to HTML

There are three ways to apply CSS to an HTML document:
+ Using an *external stylesheet* &mdash; a separate file with `.css` extension and the `<link rel="stylesheet" href="/path/to/styles.css">`.
+ Using an *internal stylesheet* &mdash; a `<style>` element contained inside the `<head>` element.<br>In some cases, using *inline styles* might be useful, especially if you don't have access to external CSS files.
+ Using *inline styles* &mdash; including CSS declarations within a `style` attribute, and therefore affecting a single HTML element. This is discouraged.

### Selectors

A *selector* targets HTML to apply styles to content. Each CSS rule starts with a selector (or list of selectors), in order to tell the browser which element of elements the rules should apply to.

You will find scenarios where two selectors select the same HTML element:

```html
<head>
  <style>
    .special {
      color: red;
    }

    p {
      color: blue;
    }
  </style>
</head>
<body>
  <p class="special">What color am I?</p>
</body>
```

In this example, both rules target the `<p class="special">` element. The CSS language has rules to control which selector is stronger in the event of a conflict based on *cascade and specificity*:
+ *Cascade rule* &mdash; styles that appear *later* in the stylesheet will win over the ones defined earlier in the document.
+ *Specificity rule* &mdash; rules that have a higher *specificity* will win over rules that have less specificity. *Specificity* also wins over the *Cascade* rule.

Applying both rules, we can say that the paragraph will be styled in red, even when the `<p>` rule comes later because the `.special` rule is more specific.

### Properties and values

At its most basic level, CSS consists of two components:
+ **properties** &mdash; human-readable identifiers that indicate which stylistic features to modify.
+ **values** &mdash; value assigned to the property that dictates how the style should be applied.

For example:

```css
h1 {
  color: blue;
}
```

> a *CSS declaration* is a property paired with a value

*CSS declarations* might come in blocks as in:

```css
h1 {
  color: blue;
  background-color: yellow;
}
```

> a *CSS rule* is a CSS declaration block paired with a selector.

| NOTE: |
| :---- |
| CSS properties and values are case-sensitive. |

### Functions

While most values are relatively simple keywords or numeric values, there are some values that take the form of a function like `calc()` in the example below:

```html
<div class="outer">
  <div class="box">
    The inner box is 90% - 30px
  </div>
</div>
```

```css
.outer {
  border: 5px solid black;              /* element's border           */
}

.box {
  padding: 10px;                        /* element's padding          */
  width: calc(90% - 30px);              /* element's width            */
  background-color: rebeccapurple;      /* element's background color */
  color: white;                         /* element's text             */
}
```

Another example would be values for the `transform` property, such as `rotate()`:

```css
.box {
  ...
  transform: rotate(0.8turn);
}
```

### @rules

CSS *@rules* (pronounced *at-rules*) provide instructions about how CSS should perform or how it should behave.

For example, `@import` imports a stylesheet into another *CSS stylesheet*:

```css
@import 'styles2.css';
```

The `@media` rule is used to create media queries so that conditional logic for CSS styling can be applied:

```css
body {
  background-color: pink;
}

@media (min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

In the example above, the stylesheet defines a default pink background for the `<body>` element, but if the viewport is wider than 30em, the background will be set to *blue*.

### Shorthands

Some properties like `font`, `background`, `padding`, `border` and `margin` are called *shorthand properties* because set several values in a single line.

For example:

```css
padding: 10px 15px 15px 5px;
```

is equivalent to:

```css
padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

### Comments

CSS comments begin with `/*` and end with `/*`.

### CSS style guide

Browsers ignore white space inside CSS, but it should be used to improve readability.

It is a good practice to specify each declaration on its own line.

```css
/* this targets all <h1> elements */
h1 {
  color: red;
}

/* this targets <p> and <li> elements */
p, li {
  color: green;
}

li {
  list-style-type: none;  /* this removes the bullet point */
}

/* this targets li or p elements with class="special" */
li.special,
span.special {
  color: orange;
  font-weight: bold;
}

/* this targets em elements inside li element */
li em {
  color: rebeccapurple;
}

/* this targets a p element coming directly after an h1, and not other <p> */
h1 + p {
  font-size: 200%;
}

/* style unvisited links in pink */
a:link {
  color: pink;
}

/* style visited links in green */
a:visited {
  color: green;
}

/* remove underline when hovering over links */
a:hover {
  text-decoration: none;
}

body h1 + p .special {
  color: yellow;
  background-color: black;
  padding: 5px;
}
```

### What happens when a browser displays a document?

When a browser displays a document, it must combine the document's content with its style information prior to show it to the user.

This is roughly what happens:

1. The browser fetches the HTML from the network.
2. It parses the HTML into a DOM that represents the document.
3. The browsers fetches most of the resources linked to by the HTML document (images, videos, and linked CSS). JavaScript will be handled a bit later.
4. The browser parses the fetched CSS, and sorts them according to the cascade and specificity rules in *buckets*. Based on this, it works out which rules should be applied to which nodes in the DOM, attaches style to them as required.
5. The result of the previous step (known as the *render tree*), is laid out in the structure it should appear in after the rules have been applied to it.
6. The visual display of the page is shown on the screen (on a stage called *painting*).

![How HTML document is displayed?](images/how_html_doc_is_displayed.png)

| NOTE: |
| :---- |
| A DOM is a *tree-like* structure, in which each element, attribute, and piece of text in the markup language becomes a *DOM node* in the tree. The nodes are defined by their relationship to other DOM nodes. Some elements are parents of child nodes, and child nodes have siblings. |

Conside the following piece of HTML markup:

```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```

The browser will be the following DOM tree to represent that piece:

```
P
├─ Let's use:
├─ SPAN
|  └─ Cascading
├─ SPAN
|  └─ Style
└─ SPAN
   └─ Sheets
```

If the HTML document links to a CSS with the following rule:

```css
span {
  border: 1px solid black;
  background-color: lime;
}
```

The brower will create the render tree by *merging* the DOM tree with the information collected from parsing the CSS:

```
P
├─ Let's use:       style: (default)
├─ SPAN             style: `border: 1px solid block; background-color: lime`
|  └─ Cascading
├─ SPAN             style: `border: 1px solid block; background-color: lime`
|  └─ Style
└─ SPAN             style: `border: 1px solid block; background-color: lime`
   └─ Sheets
```

| NOTE: |
| :---- |
| If a browser enounters a property or value it doesn't understand, it ignores it and moves on to the next declaration. The same happens if it finds a selector it doesn't understand &mdash; it will move to the next rule. |

The fact that the browser does not crash when it finds an error can be utilized for our benefit. For example, for old browsers that do not support *functions* such as `calc()` we can do:

```css
.box {
  width: 500px;
  width: calc(100% - 50px);
}
```

Because of the cascade rule, for browsers that support `calc()` will use the 2nd option, while the older browsers will just ignore the 2nd without crashing.

| EXAMPLE: |
| :------- |
| See [e01 &mdash; Styling a document with basic CSS](e01-styling-a-document-with-basic-css) for an exercise on the basics of CSS so far. |

### More on conflicting rules

At some point, you will find that the CSS you thought should be applied to an element is not working. Usually, the problem is that you have created two rules which could potentially applied to the same element, and therefore the *cascade* and *specificity* rules will be applied.

Additionally, you should be aware of the concept of *inheritance*, which means that some *CSS* properties by default inherit values set on the current element's parent elements, and some don't.

> **Cascade** &mdash; with two rules that have the same specificity are applied to an element, the one that comes last in the CSS is the one that will be used.

For example:

```css
h1 {
  color: red;
}

h1 {
  color: blue;
}
```

The `<h1>` elements will be styled in blue.

> **Specificity** &mdash; specificity is a measure of how the browser decide which rule applies if multiple rules have different selectors, but could still apply to the same element. For example, an element selector is less specific than a class selector, as it will only apply to the elements with that class.

For example:

```css
.main-heading {
  color: red;
}

h1 {
  color: blue;
}
```

The HTML markup `<h1 class="main-heading">What color am I?</h1>` will be styled in red, even when it appears before the `<h1>` rule because it is more specific.

> **Inheritance** &mdash; some CSS property values set on parent elements are inherited by their child elements, and some aren't. For example, if you set a `color` and `font-family` on an element, every element inside it will also be styled with that color and font, unless you apply different color and font values directly to them. Properties such as `width` are not inherited.

For example:

```css
body {
  color: blue;
}

span {
  color: black;
}
```

```html
<p>
  As the body has been set to have a color of blue, this will be blue, except for
  this <span>black span</span> which has been specifically set to be black.
<p>
```

| NOTE: |
| :---- |
| The information about whether a property is inherited or not can be found in each reference page for a property in [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color#formal_definition). |

CSS provides four special universal property values for controlling inheritance. Every CSS property accepts these values:
+ `inherit` &mdash; sets the property value applied to a selected element to be the same as that of its parent element.
+ `initial` &mdash; sets the property value applied to a selected element to the initial value of that property.
+ `unset` &mdash; resets the property to its natural value, which means that if the property is naturally inherited, it acts like `inherit`, otherwise, it acts like `initial`.


## Examples, Exercises and mini-projects

### [01 &mdash; Hello, CSS!](01-hello-css)
Illustrates how to apply CSS to a simple HTML document, and a few assorted rules practising selectors.

### [e01 &mdash; Styling a document with basic CSS](e01-styling-a-document-with-basic-css)
An exercise illustrating how to style a simple text document using basic CSS.

## CSS properties cheatsheet

| CSS property | Description | Example |
| :----------- | :---------- | :------ |
| [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background) | shorthand property that sets all background style properties at once, such as color, image, origin and size, or repeat method. | `background: green`<br>`background: no-repeat url(../images/lizard.png)` |
| [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) | Sets the background color an an element. | `background-color: brown`<br>`background-color: #74992e`<br>`background-color: rgb(255, 255, 128)`<br>`background-color: rgba(255, 255, 255, .5)`<br>`background-color: hsl(50, 33%, 33%)`<br>`background-color: hsla(50, 33%, 33%, .75)` |
| [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) | Sets one or more background images on an element. | `background-image: url(../images/lizard.png)`<br>`background-image: url(../images/lizard.png), url(../images/star.png)`<br>`background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url(../images/lizard.png)` |
| [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | Sets an element's border. | `border: solid`<br>`border: dashed red`<br>`border: 2px solid black`<br>`border: 4mm ridge rgba(170, 50, 220, .6` |
| [border-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom) | Shorthand CSS property that sets an element's bottom border.<br>It sets the values of `border-bottom-width`, `border-bottom-style` and `border-bottom-color`. | `border-bottom: solid`<br>`border-bottom: dashed red`<br>`border-bottom: thick double #32a1ce` |
| [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) | Sets the foreground color value of an element's text and text decorations and sets the `currentcolor` value. | `color: brown`<br>`color: initial`<br>`color: rgb(214, 122, 127)` |
| [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font) | shorthand property that sets all different properties of an element's font. | `font: 1.2em "Fira Sans", sans-serif;`<br>`font: italic 1.2em "Fira Sans", serif;`<br> |
| [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) | Specifies a prioritized list of one or more family names and/or generic family names for the selected element. | `font-family: Georgia, serif;`<br>`font-family: "Gill Sans", sans-serif;`<br> |
| [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) | Sets the size of the font. | `font-size: 1.2em`<br>`font-size: x-small`<br>`font-size: 12px`<br>`font-size: 80%`<br>`font-size: smaller` |
| [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) | Sets the weight (or boldness) of the font. | `font-weight: normal`<br>`font-weight: bold`<br>`font-weight: bolder`<br>`font-weight: 100` |
| [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) | Sets the margin area on all four sides of an element. It is a shorthand for `margin-top`, `margin-right`, `margin-bottom` and `margin-left`. | `margin: 1em;`<br>`margin: 10px 50px 20px 0;`<br> |
| [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) | Sets the padding area on all four sides of an element at once | `padding: 1em`<br>`padding: 10% 0`<br>`padding: 10px 50px 20px`<br>`padding: 10px 50px 30px 0`<br>`padding: 0` |
| [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | Shorthand CSS property that sets the appearance of decorative lines on text.<br>It is a shorthand for `text-decoration-line`, `text-decoration-color`, `text-decoration-style` and the `text-decoration-thickness`. | `text-decoration: underline;`<br>`text-decoration: underline dotted;`<br>`text-decoration: underline dotted red;` |
| [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) | Lets you rotate, scale, skew, or translate an element. | `transform: rotate(0.5turn)`<br>`transform: rotate(0.5turn)`<br>`transform: translate(120px, 50%)`<br> |
| [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) | Sets the element's width. | `width: 150px`<br>`width: 20em;`<br>`width: 75%`<br>`width: auto` |







