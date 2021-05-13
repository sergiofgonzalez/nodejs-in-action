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

![Parts of CSS rule definition](images/parts-of-css-rule-definition.png)

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

#### More on inheritance

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

The CSS shorthand property `all` can be used to apply one of these inheritance values to almost all properties at once. Its value can be any of `inherit`, `initial`, `unset` or `revert` (this one with limited browser support).

For example you can do:

```css
blockquote {
  background-color: red;
  border: 2px solid green;
}

.fix-this {
  all: unset;
}
```

on a piece of HTML like:

```html
<blockquote>
  <p>This block is styled<p>
</blockquote>

<blockquote class="fix-this">
  <p>This block uses the natural style values<p>
</blockquote>
```
| EXAMPLE: |
| :------- |
| See [02 &mdash; Playing with inheritance](02-playing-with-inheritance) for a runnable example on which you can test inheritance rules and values. |

#### More on cascade and specificity

The *cascade rules* dictate which CSS rules apply when more than one thing could style an element.

In increasing order of importance (so that later rules overrule earlier ones) we have:
1. Source order
2. Specificity
3. Importance

##### Source order

If you have more than one rule, with exactly the same weight, the one comes last in the CSS will win.

##### Specificity

Rules with higher specificity will overrules more generic rules. It must be notes that although specificity is defined at the *selector level*, it won't be the whole rule that gets overwritten, but rather, only the properties that are the same.

> It is common practice to define generic styles for the basic elements, and then create classes for those that we want to style differently. The characteristics defined in the generic styles that are not overwritten by the more specific rules won't be overwritten.

For example:

```css
/* generic styles */
h2 {
  font-size: 2em;
  color: #000;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

/* specific styles that override generic ones */
.small {
  font-size: 1em;
}

.bright {
  color: rebeccapurple;
}
```

```html
<h2>Heading with no class</h2>
<h2 class="small">Heading with class of small</h2>
<h2 class="bright">Heading with class of bright</h2>
```

The 2nd and 3rd line will still *inherit* some of the properties of the generic style:
+ line 2 will have the same `color` and `font-family` from the generic style, only font-size will be different.
+ line 3 will have the same `font-size` and `font-family` from the generic style, only `color` will be different.

The browsers calculate specificity by awarding a value in points for the different types of selectors. This can be thought of as thousands, hundreds, tens, and ones, that are computed as four single digits in four columns:

| Selector | Thousands | Hundreds | Tens | Ones | Total specificity |
| :------- | :-------- | :------- | :--- | :--- | :---------------- |
| <selector> | points_1 | points_2 | points_3 | points_4 | (points_1 * 1000) + (points_2 * 100) + (points_3 * 10) + points_4 |

+ Thousands &mdash; score one in this column for declarations inside a `style` attribute.
+ Hundreds &mdash; score one in this column for each ID selector contained inside the overall selector.
+ Tens &mdash; score one in this column for each class selector, attribute selector, or pseudo-class contained inside the overall selector.
+ Ones &mdash; score one in this column for each element selector, or pseudo-element contained inside the overall selector.

| NOTE: |
| :---- |
| The universal selector (`*`), combinators (`+`, `>`, `~`, `''` ) and negation pseudo-class (`:not`) have no effect on specificity.

For example:

| Selector | Thousands | Hundreds | Tens | Ones | Total specificity |
| :------- | :-------- | :------- | :--- | :--- | :---------------- |
| h1 | 0 | 0 | 0 | 1 | 1 |
| h1 + p::first-letter | 0 | 0 | 0 | 3 | 3 |
| li > a[href*="en-US"] > .inline-warning | 0 | 0 | 2 | 2 | 22 |
| #identifier | 0 | 1 | 0 | 0 | 100 |
| rule inside an element's style attribute | 1 | 0 | 0 | 0 | 1000 |

| EXAMPLE: |
| :------- |
| See [03 &mdash; Playing with specificity](03-playing-with-specificity) for a runnable example on which you can play with the cascade and specificity rules. |


| NOTE: |
| :---- |
| It is important to understand that the specificity value given in this section is just an illustration. In reality, any id selector will win over a selector that includes any number of classes. |

##### Importance

You can use `!important` declaration to override the normal rules of the cascade for a particular property and value.

For example:

```css
#winning {
  background-color: red;
  border: 1px solid black;
}

.better {
  background-color: gray;
  border: none !important;
}

p {
  background-color: blue;
  color: white;
  padding: 5px;
}
```

```hmtl
<p class="better">This is a paragraph</p>
<p class="better" id="winning">One selector to rule them all</p>
```

This will render the following image:

![Using important](images/using-important.png)

The generic styling used in the `p {...}` ruleset for color and padding is applied to both paragraphs.

Then, for the `background-color` and `border` we have to compute the specificity. For the first `<p class="better">` the declarations of the `.better { ... }` rule will win, and therefore will display the text with gray background and non border.

However, for the second `<p class="better" id="winning">, the `#winning { ... }` rule will win as it is more specific. Therefore, it should show the background in red with 1px solid border in black.

![Not using important](images/without-important.png)

As `!important` is used in the `.better { ... }` rule definition, the border will not be displayed for the second `<p>`, as `!important` overrules any other cascade rule.

| EXAMPLE: |
| :------- |
| See [04 &mdash; Playing with !important](04-playing-with-important) for a runnable example on which you can practise the effect of `!important`. |

| NOTE: |
| :---- |
| Using `!important` is discouraged as it makes debugging CSS problems really difficult. It should be used only in situations in which you can't override a particular style declaration (e.g. you don't have access to the core CSS modules). |

### CSS selectors in depth

CSS selectors are used to target the HTML elements on a web page that we want to style.

The element or elements which are selected by the selector are referred to as the *subject* of the selector.

If you have more than one thing that uses the same CSS, then the individual selectors you can combine them into a *selector list*.

For example, the following rules:

```css
h1 {
  color: blue;
}

.special {
  color: blue;
}
```
can be combined into a selector list:

```css
/* set text color to blue for <h1> or elements with class="special" */
h1,
.special {
  color: blue;
}
```

There are different groupings of selectors:

+ [Type, class, and ID selectors](#type-class-and-id-selectors)
+ [Attribute selectors](#attribute-selectors)
+ [Pseudo-classes and pseudo-elements](#pseudo-classes-and-pseudo-elements)
+ [Combinators](#combinators)

Additionally, there is a special selector called *universal selector* (denoted by a `*`). It selects everything in the document (or inside the parent element if it is being chained together with another element and a descendant combinator).

For example, we can remove the margins in all elements defining the following CSS rule:

```css
* {
  margin: 0;
}
```

It is also use to make selectors easier to read and more obvious in terms of what they are doing.

For example, to select any descendant elements of `<article>` that are the first child of their parent, including direct children, we could use the `:first-child` pseudo class.

```css
article :first-child {
  font-weight: bold;
}
```

However, it is less prone to confusion with `article:first-child` if we do:

```css
article *:first-child {
  font-weight: bold;
}
```


#### Type, class, and ID selectors

This grouping includes the following types of selectors:

```css
/* element type selector */
h1 { ... }

/* class selector */
.box { ... }

/* class selector on specific element type */
span.highlight { ... }

/* class selector for elements with more than one class */
.notebox.danger { ... }

/* ID selector */
#unique { ... }

/* ID selector if element type match */
h1#unique { ... }
```

| NOTE: |
| :---- |
| As a good practice, it is preferable to add a class to an element to style it, rather than style it via an ID. |

| EXAMPLE: |
| :------- |
| See [06 &mdash; Playing with type, class, and ID selectors](06-playing-with-element-type-class-id-selectors) for a runnable example on which you can practice type, class and id selectors. |

#### Attribute selectors

Lets you target elements based on the presence of a certain attribute on an element:

```css
a[title] { ... }
```

Or even based on the presence of an attribute with a particular value:

```css
a[href="https://www.example.com"] { ... }
```

Let's see all the possibilities with examples:

```css
/* match <a> elements with title attributte */
a[title] { ... }

/* match <a> elements with href attribute set to https://example.com */
a[href="https://example.com"] { ... }

/*
  match <p> elements with class attribute equal to,
  or containing "special" delimited by spaces
*/
p[class~="special"] { ... }

/*
  match <div> elements with a lang attribute that is exactly "zh"
  or begins with "zh" followed by a hyphen
*/
div[lang|="zh"] { ... }

/*
  match <li> elements with a class attribute
  whose value begins with "box-"
*/
li[class^="box-"]

/*
  match <li> elements with a class attribute
  whose value ends with "-box"
*/
li[class$="-box"]

/*
  match <li> elements with a class attribute
  whose value contains with "box" anywhere within the string
*/
li[class*="box"]
```

Matches are always case-sensitive. If you would like to make the searches insensitive, you can use the `i` modifier before the closing bracket as in:

```css
/* will match <li> elements with either class="a*" or class="A*" */
li[class^="a" i]
```

#### Pseudo-classes and pseudo-elements

This group of selectors include pseudo-classes that style an element when it is on a certain state (e.g. a link in the state when you're hovering over it, or an element that happens to be the first element of their type).

##### Pseudo-classes

Pseudo-classes are keywords that start with a colon as in `:hover` or `:first-child`.


For example, the following rule will style the first `<p>` element found within an article.

```css
article p:first-child {
  font-size: 120%;
  font-weight: bold;
}
```

| NOTE: |
| :---- |
| Other similar pseudo-classes are `:last-child`, `:only-child` and `:invalid` (input that failed to validte). |


Other type of pseudo-classes are the *user-action pseudo classes*, that apply when the user interacts with an element in some particular way like:
+ `:hover` &mdash; applies when the user moves the mouse over an element.
+ `:focus` &mdash; applies when the user focuses on an element using keyboard controls.


```css
a:hover { ... }
```

##### pseudo-elements

Pseudo-elements, which select a certain part of an element, rather than the whole element itself. That is, they act as if you would add a new HTML element into the markup.
For example `::first-line` selects the first line of text inside an element, that would be the same as wrapping the first line of text in a `<span>`.

```css
p::first-line { ... }
```

It is possible to combine pseudo-classes and pseudo-elements:

```css
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

There are a couple of special pseudo-elements that let you add content before and after a given element using CSS and the `content` property:

```css
.box::before {
  content: "This should show before the box content"
}

.box::after {
  content: "This should show after the box content"
}
```

| NOTE: |
| :---- |
| Adding text content using `::before` and `::after` is discouraged for accesibility reasons. However, a valid usage is to insert an icon before or after an element as in `content: " ➥". |

Those pseudo-elements can also be used to insert an empty string that can then be styles just like any element on the page.

In the following example, we create a 100x100 pixels purple square right before a `<p>` element.

```css
.box::before {
  content: "";
  display: block;
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
  border: 1px solid black;
}
```

```html
<p class="box">Contents in the box.</p>
```

> [MDN: pseudo-classes reference](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#pseudo-classes)

> [MDN: pseudo-elements reference](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#pseudo-elements)

| EXAMPLE: |
| :------- |
| See [08 &mdash; Playing with pseudo-classes and pseudo-elements](08-playing-with-pseudo-classes-and-pseudo-elements) for a runnable example on which you can practise with pseudo-classes and pseudo-elements. |

#### Combinators

Combine other selectors in order to target elements within our documents based on their relationship.

For example, `article > p` uses the *child combinator* `>`, that targets paragraphs that are direct children of a `<p>`:

```css
article > p { ... }
```

There are found combinators:

```css
/*
  descendant combinator
    (targets <p> within <article>)
*/
article p { ... }

/*
  descendant combinator
    (targets <p> within elements with class="box")
*/
.box p { ... }


/*
  child combinator
    (targets <p> that are direct children of <article>)
*/
article > p { ... }

/*
  child combinator
    (targets <li> that are direct children of <ul>)
*/
ul > li { ... }

/*
  adjacent sibling combinator
    (targets <p> that come immediately after <article> at
     the same hierarchy level)
*/
article + p { ... }

/*
  adjacent sibling combinator
    (targets <img> that come immediately after <p> at
     the same hierarchy level)
*/
p + img { ... }

/*
  general sibling combinator
    (targets any <p> that come after <article>, not
     necessarily immediate)
*/
article ~ p { ... }

/*
  general sibling combinator
    (targets any <image> that come after <p>, not
     necessarily immediate)
*/
p ~ image { ... }
```

You can combine any of the selectors with combinators to target specific parts of your document. For example:

```css
/*
  target <li> elements with a class attribute with value "a"
  that are direct children of an <ul>
*/
ul > li[class="a"] { .. }
```

| EXAMPLE: |
| :------- |
| See [e02 &mdash; Practising selectors](e02-practising-selectors) for a runnable example on which you can practice the different ways to target elements on a page. |

### The box model

Everything in CSS has a box around it. Understanding how this works and the terminology around it is key to be able to create complex layouts with CSS.

#### Block and inline boxes

In CSS there are broadly two types of boxes that dictate how the box behaves in terms of page flow, and in relation with other boxes on the page:
+ **block boxes**
  + the box will break onto a new line.
  + the box will extend in the inline direction to fill the space available in its container.<br>In most cases this means that the box will become as wide as its container, filling up 100% of the space available.
  + the `width` and `height` properties will be respected.
  + padding, margin, and border will cause other elements to be pushed away from the box (more on this later).
  + unless explicitly changing the display type to inline, *HTML block-level elements* such as `<h1>` and `<p>` will use `block` as their outer display type by default.

+ **inline boxes**
  + the box will not break onto a new line.
  + the `width` and `height` properties will not apply.
  + vertical padding, margins, and borders will apply but will not cause other inline boxes to move away from the box.
  + horizontal padding, margins, and borders will apply and will cause other inline boxes to move away from the box.
  + *HTML inline elements* such as `<span>`, `<em>`, and `<strong>` will display inline by default.

Remember that:
+ **HTML Block-level elements** form a visible block on a page. A *block-level element* appears on a new line following the content that precedes it. Any content that follows a *block-level element* also appears on a new line.<br>*Block-level elements* are usually structural elements on the page, such as headings, paragraphs, lists, navigation menus, or footers.<br>*A block-level* element wouldn't be nested inside an inline element, but it might be nested inside another *block-level* element.

+ **Inline elements** are contained within *block-level elements*, and surround only small parts of the document's content. An *inline element* will not cause a new line to appear in the document. It is typically used with text, for example `<a>` element to create a hyperlink in some existing text, or `<em>` or `<strong>` to create emphasis on some parts of a paragraph text.

#### Aside: Inner and outer display types

CSS boxes have an **inner** and **outer** display types.

+ the **outer display type** details whether the box is block or inline.

+ the **inner display type** dictates how elements inside that box are laid out. By default, the elements inside a box are laid out in *normal flow*, which means that they behave just line any other block and inline elements.<br>The inner display type can be changed using values like `display: flex`.<br>If the outer display of an element is `block` but the inner display is set to `flex`, the direct children of the box will become `flex` items and will be laid out according to the rules set out in the *Flexbox spec*.

| NOTE: |
| :---- |
| Block and inline layout is the default way that things on the web behave, that is whyc this style is known as the *normal flow*. Other layouts like `flex` and `grid` will be learned later. |

#### Examples of different display types

The best way to familiarize yourself with the different display types is through examples.

Let's start with a simple `<p>`, a *block-level element* which will have by default an *outer display* type of `block`. The browser will render it as a block box, occupying the whole width of the container and laid out on a new line as we'd expect:

![Paragraph with block outer display](images/block_outer_display.png)

Let's now see a simple `<ul>` with three items. These are also *block-level* elements, which a default *outer display* of `block`. Therefore, they will be rendered also as block boxes:

![list with block outer display](images/ul_block_display.png)

Now, if we set the display of the `<ul>` element as `flex` will make the children elements of `<ul>` (that is the `<li>`) to behave different than in the normal flow. However, the `<ul>` itself will behave as a block (that is, will still have an outer display of `block`).

![list with flex display](images/ul_with_flex_display.png)

As another example, let's see a normal `<p>` that has some `<span>` elements within it. In the normal flow, the `<p>` will be rendered as a block, and the `<span>` elements as inline elements.

![Paragraph with spans](images/paragraph_with_spans_normal_flow.png)

If we style one of the `<span>`s with `display: block`, the outer display for that `<span>` will change and will behave like a block box.

![Span with block outer display](images/span_block.png)

See how a new line is inserted before and after the element, and how the space takes the whole width of the parent container (in this case the `<p>` element).


As another example of the normal flow, we see a paragraph with `<span>`s wrapped within it whose display have not been modified. The `<p>` is displayed as a block, and the `<span>`s as inline boxes as expected:

![Another paragraph with normal flow](images/example2_p_normal_flow.png)

Let's see now a list whose display type is set to `inline-flex`. This will create an inline box for the list, and will apply the inner flex display so that the `<li>` items won't follow the normal flow.

![List with inline-flex](images/list_inline_flex.png)

See the difference with the example in which we set the `<ul>` display to `flex`. In that case, the list itself was rendered as a block and took the whole space, while in this space it just occupies the space that it needs.

Something similar will happen to paragraphs on which we change their display type to `inline`. As a matter of fact, if we place them contiguous to the list we see that there is no line break:

![Paragraphs with inline display](images/paragraphs_inline_display.png)

| EXAMPLE: |
| :------- |
| See [10 &mdash; CSS box model: Examples of different display types](10-box-model-display-types) for a runnable example that illustrates the different types of displays. |

#### What is the CSS Box model?

The full CSS box model applies to *block boxes*; *inline boxes* only use some of the behavior defined in the model.

The model defines how the different parts of a box (margin, border, padding, and content) work together to create a box that you can see on the page.

To add some additional complexity 😉, there is a standard and alternate box model.

##### Parts of a box

The following diagram illustated the different parts that make up a block box in CSS:

![Parts of a block box](images/parts_of_block_box.png)

+ **Content box**: the area where your content is displayed, which can be sized using properties like `width` and `height`.

+ **Padding box**: the area that sits around the content as white space, whose size can be controlled using `padding`.

+ **Border box**: the area that wraps the padding, and whose size and style can be controlled using `border`.

+ **Margin box**: the outermost layer that wraps the border, as whitespace between this box and other elements, and whose size can be controlled using `margin`.

##### The standard CSS box model

In the standard box model, if you give a box a `width` and a `height` attribute, this defines the width and height of the content box.

Any padding and border is then added to the width and height to get the total size taken up by the box.

As a result, if we have the following rule:

```css
.box {
  width: 350px;
  height: 150px;
  margin: 10px;
  padding: 25px;
  border: 5px solid black;
}
```

The space taken up by our box is illustrated in the following diagram:

![CSS box model example](images/css_box_model_example.png)

```
total_width = 5 + 25 + 350 + 25 + 5 = 410px
total_height = 5 + 25 +150 + 25 + 5 = 210px
```

Note that the margin is not counted towards the area of the box &mdash; it affects the total space that the box will take up on the page, but it is considered outside the box.


##### The alternative CSS box model

In the alternative CSS box model, the width and the height are the width and height of the visible box on the page. That is, you don't have to add up the border and padding to get the actual size.

![CSS alternative box model](images/css_alternative_box_model.png)

By default, browsers use the standard box model. To enable the alternative model for an element you have to use the setting `box-sizing: border-box` as seen below:

```css
.box {
  box-sizing: border-box;
}
```

If you want to activate the alternative box model in the whole document, you can do:

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

#### Playing with box models

It is easy to transform from one model to the other just by taking into account the [box model parts](#parts-of-a-box).

For example, for a box specified using the standard model as:

```css
.box {
  border: 5px solid rebeccapurple;
  background-color: lightgray;
  padding: 40px;
  margin: 40px;
  width: 300px;
  height: 150px;
}
```

We can get the exact same box using the alternative model using:

```css
.alternative {
  box-sizing: border-box;
  border: 5px solid rebeccapurple;
  background-color: lightgray;
  padding: 40px;
  margin: 40px;
  width: 390px;
  height: 240px;
}
```

Your browser's DevTools can help you understand the box model and the different sizes of your elements in the page.

For example, for the element associated with the standard box model above it will show:

![DevTools: Standard box model](images/dev_tools_box_size_std.png)

And for the alternative one it will show:
![DevTools: Alternative box model](images/dev_tools_box_size_alt.png)

Note how for the alternative box model it also shows `box-sizing: border-box`.

#### Margins, padding, and borders

The properties `margin`, `padding` and `border` are shorthands that allow us to set all the characteristics of the box at once.

The following sections introduce the *longhand* properties when we want to control the different characteristics individually, and define these properties in detail.

##### Margin

> Margin is an invisible space around your box. It pushes other elements away from the box. It can have positive (push away) or negative (make it closer). The margin is added after the size of the visible box has been calculated (both for the standard and alternative box model).

All the margins of an element can be controlled with the `margin` element, or individually using `margin-top`, `margin-right`, `margin-bottom`, `margin-left`.

###### Margin collapsing

The *margin collapsing* is the situation where you have two elements whose margin touch, with both margins being positive, and the margin is combined to become one margin which is the size of the largest individual margin.

You should be aware of this situation when you are creating space with margins and don't get the space that you expect.

In the image below you can see that happening:

![Margin collapsing](images/margin_collapsing.png)

We have two paragraphs with the following margins specified:

```css
.one {
  margin-bottom: 50px;
}

.two {
  margin-top: 30px;
}
```

The margin that exists between the two paragraphs is not 50px + 30px because it has collapsed to 50px. As a result, if I make:

```css
.two {
  margin-top: 0px;
}
```
the layout won't change, because it is `margin-bottom` the one that is dictating the margin between the two elements.

| EXAMPLE: |
| :------- |
| See [12 &mdash; Margin collapsing](margin-collapsing) for a runnable example on which you can play with margins to see the margin collapsing in action. |

| NOTE: |
| :---- |
| The rules that dictate when margins do and do not collapse and how are somewhat complicated. You can find all the detailed information on [MDN: Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing).<br>For example, when setting a width and height for a container that wraps two elements whose margin should be collapsing, it won't happen. |

##### Borders

> The border is drawn between the margin and the padding of a box. If you are using the standard box model, the size of the border is added to the `width` and `height` of the box. If you are using the alternative box model, the size of the border makes the content box smaller, as it takes up some of that available space (along with the padding).

You can set the width, style, or color of all the four borders of an element using the `border` shorthand property.

There are a huge number of longhand properties related to the border, as well:

+ To set the properties of each side individually you can use `border-top`, `border-right`, `border-bottom` and `border-left`.

+ To se the width, style, or color of all sides you can use `border-width`, `border-style`, and `border-color`.

+ To set the width, style, or color of a single side you can use (`{side}` being `top`, `right`, `bottom`, `left`):
  + `border-{side}-width`
  + `border-{side}-style`
  + `boder-{side}-color`

| EXAMPLE: |
| :------- |
| See [13 &mdash; Setting border properties](13-setting-border-properties for an example using *longhand* border properties. |

##### Padding

> The padding sits between the border and the content area. Unlike margins, you cannot have negative amounts of padding. Any background applied to your element will display behind the padding, and it is typically used to push the content away from the border.

The `padding` property sets the padding on all four sides of the box, or you can use the `padding-{side}` properties to set the padding individually.

| EXAMPLE: |
| :------- |
| See [14 &mdash; Setting the padding](14-setting-padding) for a runnable example on which you can practice the longhand padding properties. |

#### The box model and inline boxes

All the properties discussed apply fully to block boxes (`display: block` like the ones created for `<p>`, `<div>`, and `<h1>`). Some of the properties, but not all, can apply to inline boxes too, such as those created by `<span>` elements.

Consider the example below, in which we have applied the following CSS to the `<span>` element:

```css
span {
  background-color: lightblue;
  border: 1px solid blue;
  margin: 20px;
  padding: 20px;
  width: 800px;
  height: 500px;
}
```

While `margin`, `border`, and `padding` are respected, `width` and `height` will be ignored.

![Box model: inline elements](images/box_model_inline_elements.png)

Note also that while the vertical margin, padding and border are respected, they do not change the relationship of the other content with the inline box, so the padding and border overlaps with other words in the paragraph. Horizontal padding, margins and border will be respected too.

| EXAMPLE: |
| :------- |
| See [15 &mdash; Box model and inline boxes](15-box-model-and-inline-boxes) for a runnable example on which you can practise the properties applied to inline boxes. |


#### Using display: inline-block

The value `display: inline-block` provides a middle ground between `display: block` and `display: inline`.

It will make the element not to break onto a new line, while respecting the `width` and `height` values.

See in the image below how the `<span>` does not force the text around it to break into a new line, while we are able to set a particular width and height:

![display: inline-block](images/display_inline-block.png)

```css
span {
  display: inline-block;
  background-color: lightblue;
  border: 1px solid blue;
  margin: 20px;
  padding: 20px;
  width: 80px;  /* respected in inline-block boxes */
  height: 50px; /* respected in inline-block boxes */
}
```

| EXAMPLE: |
| :------- |
| See [16 &mdash; Using `display: inline-block`](16-display-inline-block) for a runnable example that illustrates the use of `display: inline-block`. |

This type of display is fairly frequent in navigation bars, when you want to give a link a larger hit area by adding padding, and you want the other elements to respect that padding without appearing to overlap.

Let's see that with an example in which we have a nav bar with three links. The display value of the list is set to `flex` to be able to control the flow differently from the normal flow:

```html
<nav>
  <ul class="links-list">
    <li><a href="">Link one</a></li>
    <li><a href="">Link two</a></li>
    <li><a href="">Link three</a></li>
  </ul>
</nav>
```

```css
ul {
  display: flex;
  list-style: none;
  border: 2px solid rebeccapurple;
  width: 300px;
}

.links-list a {
  background-color: rgb(179, 57, 81);
  color: #fff;
}

.links-list a:hover {
  background-color: rgb(66, 28, 40);
  color: #fff;
}
```

This will be displayed as seen below:

![Nav bar before adjustments](images/nav_inline_block_before.png)

As the links are quite small, is quite common to add some padding to the `<a>` elements, so that they occupy more space:

```css
.links-list a {
  background-color: rgb(179, 57, 81);
  color: #fff;
  padding: 1em 2em;
  margin: 10px;
}
```

![Nav bar with padding and margins](images/nav_inline_block_padding_margin.png)

This improves the appearance and UX of the links, but we see how the links seem to have *overflown* the `<ul>` container.

This can be fixed applying a display `inline-block` to the links:

```css
.links-list a {
  background-color: rgb(179, 57, 81);
  color: #fff;
  padding: 1em 2em;
  margin: 10px;
  display: inline-block;
}
```

![Nav bar final](images/nav_inline_block_final.png)


In the final image we see how the padding is respected by the other elements.

| EXAMPLE: |
| :------- |
| See [17 &mdash; Using `display: inline-block` in navigation bars](chapter25-web-apps/00-html-css-refresher/02-css/17-display-inline-block-nav-bars) for a runnable example. |

### Backgrounds and borders

This section deals with all the things that can be done with background and borders such as: grandients, background images, rounded corners for elements...

#### Styling backgrounds in CSS

The `background` property is a shorthand for a number of background related properties.

The value of this property can get complicated very fast due to the huge amount of things you can set, and the considerations that you have to consider.

It is typically better to use the *longhand* properties.

##### Background colors

The `background-color` property defines the background color on any any element in CSS. The property accepts any valid color.

```css
.box {
  background-color: rebeccapurple;
}
```

The background color will be used for coloring the content and padding box of the element up to the border box.

| EXAMPLE: |
| :------- |
| See [18 &mdash; Practising how to style backgrounds in CSS: Example 1](18-styling-backgrounds) for a runnable example. |


##### Background images

The `background-image` property enables the display of an image in the background of an element.

```css
.a {
  background-image: url(/images/white_heart_small.png);
}
```


By default, the image will not be scaled. As a result, you might only see a small corner of the images. Conversely, if the image is smaller than the box, it will be tiled to fill the box.

Also, if you specify a background color in addition to a background image, then the image will display on top of the color.

###### Controlling `background-repeat`
The `background-repeat` property is used to control the tiling behavior of images with the following values:

+ `no-repeat` &mdash; do not repeat
+ `repeat-x` &mdash; repeat horizontally
+ `repeat-y` &mdash; repeat vertically
+ `repeat` &mdash; repeat in both directions (default)

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
}
```

###### Sizing the background image

The `background-size` property that takes a length or percentage value can be used to size and image to fit inside the background box.

Additionally, the property allows you to use the following keywords:

+ `cover` &mdash; make the image large enough to completely cover the box area while maintaining its aspect ratio. In this case it is likely that the image ends up outside the box.

+ `contain` &mdash; make the image large enough to fit inside the box while maintaining the aspect ratio. In this case, it is likely that the image ends up with gaps on either side or on the top and bottom of the image.

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-size: 100px 10em;
}

.b {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-size: contain;
}
```

###### Positioning the background image

The `background-position` property allows you to choose the position in which the background image appears on the box it is applied to. This uses a coordinate system in which the top-left hand corner is `(0, 0)`. The default background position is `(0, 0)`.

The most common `background-position` values takes two individual values that specify the position horizontally, and then vertically as in:

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-position: top center;
}
```

You can also use lengths and percentages:

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-position: 20px 10%;
}
```

And even mix those two:

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-position: 20px center;
}
```

It is also possible to use a 4-value syntax in order to indicate a distance from the given edges of the box. In this case you specify the margin, followed by a value:

```css
.a {
  background-image: url(/images/white_heart_small.png);
  background-repeat: no-repeat;
  background-position: top 20px right 10px;
}
```

In the previous rule, the image will be positioned 20px from the top and 10px from the right.

| NOTE: |
| :---- |
| You can use `background-position-x` and `background-position-y` to set the different axis position values individually. |

##### Gradient backgrounds

A gradient, when used for a background works just like a background image, but it is configured differently:

```css
.a {
  background-image: linear-gradient(105deg, rgba(0, 249, 255, 1) 39%, rgba(51, 56, 57, 1) 96%);
}

.b {
  background-image: radial-gradient(circle, rgba(0, 249, 255, 1) 39%, rgba(51, 56, 57, 1) 96%);
}

.c {
  background-image: radial-gradient(circle, rgba(0, 249, 255, 1) 39%, rgba(51, 56, 57, 1) 96%);
  background-size: 100px 50px;
}
```

##### Multiple background images

It is possible to specify multiple images in a single `background-image` value, separating each with a comma.

```css
.a {
  background-image: url(image1.png), url(image2.png), url(image3.png);
  background-repeat: no-repeat, repeat-x, repeat;
  background-position: 10px 20px, top right;
}
```

Note that each value of the different properties will match up the values in the same position for other properties. When there are fewer properties than values, the values will cycle.

In the example above, as there are three values for `background-repeat` each one of the specified values will be applied to each of the images. However, for the `background-position` as there are fewer values than images, the third image will be applied the `10px 20px` position.

##### Background attachment: how images scroll

The `background-attachment` property can be used to specify how the background scrolls when the page scroll.

It can take the following values:

+ `scroll` &mdash; scroll the background as the content scrolls.
+ `fixed` &mdash; fix the background in the viewport, so that it doesn't scroll.
+ `local` &mdash; new to CSS3, similar to `scroll`.

##### Using the background shorthand property

It is possible to use the `background` shorthand property to specify all the properties related to the background that we've seen so far.

However, take into account that you will have to follow certain rules, and that the declaration can get complicated if you specify multiple images or gradients, etc.

```css
.box {
  background:
    linear-gradient(105deg, rgba(255,255,255,.2) 39%, rgba(51,56,57,1) 96%) center center / 400px 200px no-repeat,
url(big-star.png) center no-repeat,
    rebeccapurple;
}
```

| EXAMPLE: |
| :------- |
| See [18 &mdash; Practising how to style backgrounds in CSS](18-styling-backgrounds) for a runnable example that illustrates all the previous concepts on styling background images and gradients. |

#### Borders

Typically, to add borders to an element with CSS we use the `border` shorthand property:

```css
.box {
  border: 1px solid black.
}
```

There are also shorthand properties to target specific sides of the box:

```css
.box {
  border-top: 1px solid black;
}
```

And individual properties, that also allow you to specify the side:

```css
.box-1 {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}

.box-2 {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: black;
}

```

##### Rounded corners

It is possible to round the corners on a box using the `border-radius` property, and the associated longhand properties:

```css
.box {
  border-radius: 10px; /* set border radius on all sides */
}

.box-2 {
  border-top-right-radius: 1em 10%; /* top right, elliptical corners (two radii) */
}
```
| EXAMPLE: |
| :------- |
| See [19 &mdash; Using `border-radius` to style boxes with rounder corners](19-rounded-corners) for a runnable example with rounded corners. |

### Handling different text directions

CSS supports different directionality of content, including right-to-left and also top-to-bottom, on top of left-to-right.

These capabilities are called wrting modes.

#### What are writing modes?

The `writing-mode` property lets you switch from one writing mode to another.

| NOTE: |
| :---- |
| You don't need to use a right-to-left language or top-to-bottom language to use a writing mode &mdash; it can be used for creative purposes. |

```css
h1 {
  writing-mode: vertical-rl;
}
```

The possible values are:
+ `horizontal-tb` &mdash; top-to-bottom block flow.
+ `vertical-rl` &mdash; right-to-left block flow.
+ `vertical-lr` &mdash; left-to-right block flow.


#### Writing modes and block and inline layout

When we switch the writing mode, we change the *direction* for the block and inline elements.

In `horizontal-tb`, block direction runs from top to bottom, while inline dimension foes in the direction a sentence flows.

The following picture illustrates that concept:

![writing modes](images/writing-modes.png)

And you can see it in action in one of the exercises:

![writing modes exercise](20-writing-modes/docs/images/writing-modes-exercise.png)

| EXAMPLE: |
| :------- |
| See [20 &mdash; Using `writing-mode`](20-writing-modes) for a runnable example. |

#### Logical properties and values

When using writing modes, we can end up in a situation in which we would like to give our boxes a width and a height, but those values don't play well with vertical modes causing the text to overflow.

See how in the image below, that sets a width for the boxes, the text flows vertically for the box with `writing-mode` set to horizontal, while it overflows for the vertical ones.

![Text Overflow using physical properties](images/overflow_physical_properties.png)

In order to address this problem, CSS recently develiped a set of mapped properties that replace physical properties such as `width` and `height` with logical (or flow relative) versions.

For example, the width, when in horizontal mode is mapped to `inline-size`, while the height is mapped to `block-size`.

When using those *logical properties* you'll get the expected results when you switch from horizontal to vertical writing modes.

![Logical properties](images/logical_properties.png)

| EXAMPLE: |
| :------- |
| See [21 &mdash; Hello, `inline-size` and `block-size` logical properties](21-hello-inline-size-block-size-logical-props) for a runnable example. |

##### Logical margin, border, and padding properties

In the same way that we have mappings for `width` and `height` we have mappings for margin, padding and border related properties.

```
margin-top    => margin-block-start
padding-left  => padding-inline-start
border-bottom => border-block-end
...
```

You can see all the mappings in [MDN: Logical Properties and Values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

| EXAMPLE: |
| :------- |
| See [21 &mdash; Hello, `inline-size` and `block-size` logical properties](21-hello-inline-size-block-size-logical-props) for a runnable example on which physical and logical properties are compared. |

##### Logical values

Apart from the logical properties, many logical values that map to physical values such as `top`, `right`, `bottom` and `left` have been introduced (e.g. `block-start`, `inline-end`, `block-end` and `inline-start`).

For example, to make an image float to the left so that the text can wrap around the image, you can use `float: left` using the physical values, and `float: inline-start` if using the logical.

| EXAMPLE: |
| :------- |
| See [22 &mdash; Hello, logical values](22-hello-logical-values) for a runnable example. |

##### Should you use physical or logical properties?

Support for logical properties and values varies from browser to browser. It is expected that people will transition to logical properties as they are more resilient when using different writing modes than physical properties.

### Overflowing content

Everything in CSS is a box. The size of these boxes can be constrained assigning values to physical properties such as `width` and `height` (or `inline-size` and `block-size`).

**Overflow** is what happens when there is too much content to fit in a box.

#### CSS tries to avoid "data loss"

If you're not very familiar with CSS layout development, you might not have found overflow before, as illustrated on the picture below:

![Overflow](23-hello-overflow/docs/images/overflow.png)

| EXAMPLE: |
| :------- |
| See [23 &mdash; Hello, overflow!](23-hello-overflow) for a runnable example. |

Note that the situation is completely different if you don't constrain the box dimensions:

![Box with no size constraints](images/no_constraints.png)

Overflow can also happen when a single word is does not fix in a box.

![Overflow with single word](images/overflow_single_word.png)

This behavior occurs because whenever possible, CSS does not hide the content to prevent data loss. This is more relevant when the content requires some user intervention with a form, for example. *CSS*, instead of hiding the content will make everything possible to show the content event when it results in an ugly layout that overflows.

When you restrict a box size, CSS trusts that you know what you are doing, and then makes you responsible for managing the overflow.

| NOTE: |
| :---- |
| In general, restricting the block size is problematic, especially when the box contains text (e.g. user might increase the text size).<br>When you need to use a fix size for some reason, the `overflow` property will let you control how overflow behaves. |

#### The `overflow` property

The `overflow` property is how you take control an element's overflow. The default value of the property is `visible`. To crop the content when it overflows you can use `hidden`.

| NOTE: |
| :---- |
| `hidden` should be used only when *cropping* the content will cause no problems to the user. |

You can also add scrollbars using `overflow: scroll`.

You can adjust the existence of scrollbars in both dimensions using `overflow-x` or `overflow-y`:

```css
.box {
  width: 100px;
  height: 100px;
  overflow-y: scroll;
}
```

Alternatively, you can do:

```css
.box{
  overflow: scroll hidden;
}
```

which is the same as setting `overflow-x` to `scroll` and `overflow-y` to `hidden`.


#### Overflow establishes a *Block Formatting Context*

When you use an `overflow` value such as `scroll` or `auto` a *Block Formatting Context (BFC)*. This means that the box with that overflow value acquires a *self-contained* layout &mdash; the content outside the container cannot poke into the container, and nothing can spill out of that container into the surrounding layout.

#### Unwanted overflow in web design

Modern layout methods are aware of overflow and they work without making assumptions or depending on how much content there is on a web page.

Traditionally, when those modern layouts did not existed, it was common to use fixed-height containers to align the bottoms of boxes. When that was used, it was also common to have contents overflowing from one box to another.

In those cases, it is recommended to refactor the existing page to use those new CSS layouts, rather than using `hidden` or `scroll` for the `overflow` property.

## Examples, Exercises and mini-projects

### [01 &mdash; Hello, CSS!](01-hello-css)
Illustrates how to apply CSS to a simple HTML document, and a few assorted rules practising selectors.

### [02 &mdash; Playing with inheritance](02-playing-with-inheritance)
Practising inheritance rules and property values.

### [03 &mdash; Playing with specificity](03-playing-with-specificity)
Practising cascade and specificity rules.

### [04 &mdash; Playing with !important](04-playing-with-important)
Practising the effect of `!important` on CSS declarations

### [05 &mdash; Playing with selector lists](05-selector-lists)
Refactoring existing CSS code with *selector lists*.

### [06 &mdash; Playing with type, class, and ID selectors](06-playing-with-element-type-class-id-selectors)
Practising selectors involving types, classes and ids.

### [07 &mdash; Playing with attribute selectors](07-playing-with-attribute-selectors)
Practising the different variants of attribute selectors.

### [08 &mdash; Playing with pseudo-classes and pseudo-elements](08-playing-with-pseudo-classes-and-pseudo-elements)
Practising selectors with pseudo-classes and pseudo-elements.

### [09 &mdash; Playing with pseudo-classes and pseudo-elements](09-playing-with-combinators)
Practising combinators.

### [10 &mdash; CSS box model: Examples of different display types](10-box-model-display-types)
Illustrating several types of display types by example.

### [11 &mdash; CSS box model: standard and alternative models](11-box-model-std-and-alternative)
Illustrates the differences between the standard and alternative box models.

### [12 &mdash; Margin collapsing](12-margin-collapsing)
Illustrates the margin collapsing situation, when two elements have margins that touch.

### [13 &mdash; Setting border properties](13-setting-border-properties)
Illustrates how to use the *longhand* border properties.

### [14 &mdash; Setting the padding](14-setting-padding)
Illustrates how to use the *longhand* padding properties.

### [15 &mdash; Box model and inline boxes](15-box-model-and-inline-boxes)
Illustrates how not all properties apply to *inline boxes* like the ones created for `<span>` elements.

### [16 &mdash; Using `display: inline-block`](16-display-inline-block)
Illustrates how the effect of using `display: inline-block`.

### [17 &mdash; Using `display: inline-block` in navigation bars](chapter25-web-apps/00-html-css-refresher/02-css/17-display-inline-block-nav-bars)
Illustrates how the effect of using `display: inline-block` in navigation bars, where it is found quite frequently.

### [18 &mdash; Practising how to style backgrounds in CSS](18-styling-backgrounds)
Several examples about how to style backgrounds in CSS:
  + background colors
  + background images
  + gradient backgrounds
  + multiple background images

### [19 &mdash; Using `border-radius` to style boxes with rounder corners](19-rounded-corners)
Illustrates how to style boxes with rounded corners.

### [20 &mdash; Using `writing-mode`](20-writing-modes)
Illustrates how to change the direction of the text using `writing-mode` property.

### [21 &mdash; Hello, `inline-size` and `block-size` logical properties](21-hello-inline-size-block-size-logical-props)
Introduces the new logical properties for width and size  `inline-size` and `block-size`.

### [22 &mdash; Hello, logical values](22-hello-logical-values)
Illustrates how to use logical values such as `inline-start` instead of their corresponding physical values such as `left`.

### [23 &mdash; Hello, overflow!](23-hello-overflow)
Illustrates a situation in which overflow occurs by constraining the size of the container box on which a large text is hosted.

### [e01 &mdash; Styling a document with basic CSS](e01-styling-a-document-with-basic-css)
An exercise illustrating how to style a simple text document using basic CSS.

### [e02 &mdash; Practising selectors](e02-practising-selectors)
An exercise practising all the different ways to write selectors.

### [e03 &mdash; Practising the *Box Model*](e03-practising-box-model)
Practising the *Box Model*.

## CSS properties cheatsheet

| CSS property | Description | Example |
| :----------- | :---------- | :------ |
| [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background) | shorthand property that sets all background style properties at once, such as color, image, origin and size, or repeat method. | `background: green`<br>`background: no-repeat url(../images/lizard.png)` |
| [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) | Sets the background color an an element. | `background-color: brown`<br>`background-color: #74992e`<br>`background-color: rgb(255, 255, 128)`<br>`background-color: rgba(255, 255, 255, .5)`<br>`background-color: hsl(50, 33%, 33%)`<br>`background-color: hsla(50, 33%, 33%, .75)` |
| [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) | Sets one or more background images on an element. | `background-image: url(../images/lizard.png)`<br>`background-image: url(../images/lizard.png), url(../images/star.png)`<br>`background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url(../images/lizard.png)` |
| [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | Sets an element's border. | `border: solid`<br>`border: dashed red`<br>`border: 2px solid black`<br>`border: 4mm ridge rgba(170, 50, 220, .6` |
| [border-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom) | Shorthand CSS property that sets an element's bottom border.<br>It sets the values of `border-bottom-width`, `border-bottom-style` and `border-bottom-color`. | `border-bottom: solid`<br>`border-bottom: dashed red`<br>`border-bottom: thick double #32a1ce` |
| [border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) | rounds the corners of an element's outer border edge. A single radius is passed for circular corners and two radii for elliptical corners. | `border-radius: 10px`<br>`border-radius: 10px 2em` |
| [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) | Sets how the total width and height of an element is calculated. | `box-sizing: border-box`<br>`box-sizing: inherit` |
| [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) | Sets the foreground color value of an element's text and text decorations and sets the `currentcolor` value. | `color: brown`<br>`color: initial`<br>`color: rgb(214, 122, 127)` |
| [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) | Replaces an element with a generated value. | `content: "this should go before the element's content". |
| [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) | sets whether an element is treated as a block or inline element, and the layout used for its children. | `display: block`<br>`display: inline`<br>`display: flex`<br>`display: inline-flex` |
| [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font) | shorthand property that sets all different properties of an element's font. | `font: 1.2em "Fira Sans", sans-serif;`<br>`font: italic 1.2em "Fira Sans", serif;`<br> |
| [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) | Specifies a prioritized list of one or more family names and/or generic family names for the selected element. | `font-family: Georgia, serif;`<br>`font-family: "Gill Sans", sans-serif;`<br> |
| [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) | Sets the size of the font. | `font-size: 1.2em`<br>`font-size: x-small`<br>`font-size: 12px`<br>`font-size: 80%`<br>`font-size: smaller` |
| [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) | Sets the weight (or boldness) of the font. | `font-weight: normal`<br>`font-weight: bold`<br>`font-weight: bolder`<br>`font-weight: 100` |
| [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) | Sets the margin area on all four sides of an element. It is a shorthand for `margin-top`, `margin-right`, `margin-bottom` and `margin-left`. | `margin: 1em;`<br>`margin: 10px 50px 20px 0;`<br> |
| [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) | Sets the padding area on all four sides of an element at once | `padding: 1em`<br>`padding: 10% 0`<br>`padding: 10px 50px 20px`<br>`padding: 10px 50px 30px 0`<br>`padding: 0` |
| [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | Shorthand CSS property that sets the appearance of decorative lines on text.<br>It is a shorthand for `text-decoration-line`, `text-decoration-color`, `text-decoration-style` and the `text-decoration-thickness`. | `text-decoration: underline;`<br>`text-decoration: underline dotted;`<br>`text-decoration: underline dotted red;` |
| [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) | Lets you rotate, scale, skew, or translate an element. | `transform: rotate(0.5turn)`<br>`transform: rotate(0.5turn)`<br>`transform: translate(120px, 50%)`<br> |
| [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) | Sets the element's width. | `width: 150px`<br>`width: 20em;`<br>`width: 75%`<br>`width: auto` |

## CSS selectors cheatsheet

| Selector expression | Meaning |
| :------------------ | :------ |
| h1 { ... }          | `<h1>` elements. |
| .special { ... }    | Elements with `class="special"`. |
| #unique { ... } | element with id="unique". |
| p,<br>li { ... }    | `<p>` or `<li>` elements. |
| li.special { ... }  | `<li class="special">` elements. |
| li.special,<br>span.special { ... } | `<li class="special">` and `<span class="special">` elements. |
| li em { ... } | `<em>` elements wrapped inside `<li>` elements.<br>This is called the *descendant combinator*. |
| article p span { ... } | `<span>` wrapped inside `<p>` wrapped inside `<article>`. |
| h1 + p { ... } | `<p>` that comes directly after a `<h1>` at the same hierarchy level.<br>This is called the *adjacent sibling combinator (adjacent sibling combinator). |
| .my-class-1 a { ... } | `<a>` elements wrapped into any element with `class="my-class-1"`. |
| h1 + ul + p { ... } | first `<p>` in first `<ul>` coming after `<h1>`. |
| body h1 + p .special { ... } | Any element with `class="special"` inside the first `<p>` coming after the `<h1>` in the `<body>`. |
| a[title] { ... } | Any `<a>` element with the attribute `title`. |
| a[href="https://example.com"] { ... } | Any `<a>` element with the attribute `href` and value `https://example.com`. |
| a[href="https://example.com" i] { ... } | Any `<a>` element with the attribute `href` and value `https://example.com` using a case-insensitive search. |
| a[class~="special"] | Any `<a>` element with the attribute `class` and value that is exactly `"special"` or contains `"special"` in a space-separated list. |
| li[class^="box-"] | Any `<li>` element with the attribute `class` and value that begins with `"box-"`. |
| li[class$="-box"] | Any `<li>` element with the attribute `class` and value that ends with `"-box"`. |
| li[class$*="box"] | Any `<li>` element with the attribute `class` and value that contains `"box"` in any position. |
| div[lang|="zh"] { ... } | Any `<div>` with the attribute `lang` and value that is exactly `"zh"` or is `"zh-*"`. |
| a:link { ... } | `<a>` element in *unvisited state* (pseudo-class). |
| p::first-line { ... } | first line of text in a `<p>` (pseudo-element). |
| article > p { ... } | `<p>` elements that are direct children of `<article>` (child combinator). |
| article ~ p { ... } | `<p>` elements within `<article>` (but not necessarily immediately after `<article>`)<br>This is called the *general sibling combinator*. |
| * { ... } | any element.<br>This is called *universal selector*. |
| article *:first-child { ... } | any descendant of `<article>` that are the first child of their parent, including direct children. |
| .notebox.danger { ... } | any element with `class="notebox danger". |
| h1#unique { ... } | `<h1>` elements with `id="unique"`. |
| article p:first-child | first `<p>` element within an `<article>`. |
| .box::before { content: "..." } | add the specified content before the elements with `class="box"`. |
| .box::after { content: "..." } | add the specified content after the elements with `class="box"`. |

### Pseudo-classes cheatsheet

| Pseudo-class | Description |
| :----------- | :---------- |
| :first-child | selects the first child of an HTML element. |
| :last-child  | selects the last child of an HTML element. |
| :only-child | selects the child of an element that has no other children. |
| :link | applies to an *unvisited link*. |
| :visited | applies to a visited link. |
| :hover | applies when the user moves the mouse over an element. |
| :invalid | select an element (i.e. `<input>`) that failed to validate. |

### Pseudo-element cheatsheet

| Pseudo-element | Description |
| :------------- | :---------- |
| ::first-line   | select the first line of an element. |
| ::before | add content before the identified element via the `content` property. |
| ::after | add content after the identified element via the `content` property. |