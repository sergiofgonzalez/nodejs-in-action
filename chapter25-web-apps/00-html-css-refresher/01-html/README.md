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

## Examples

### [01 &mdash; Setting *Boolean* attributes from JavaScript](01-boolean-attrs-js)
Illustrates how to set boolean values from JavaScript, and how it is different from the approach you'd use in plain HTML.
