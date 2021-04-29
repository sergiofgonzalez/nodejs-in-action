# 03 &mdash; Marking up a letter
> An HTML document, with no associated CSS in which all the main sections are considered: header, main, navigation bar, main content, sidebar and footer.

## Description

For this example, you need to mark up a letter that needs to be hosted on a university intranet. The letter is a response from a research fellow to a prospectve PhD student concerning their application to the university.

### Rules
+ You'll have to use the appropriate document structure elements: `<html>`, `<head>`, `<body>`.
+ The letter should be marked up as an organization of headings and paragraphs, with the exception of one top-level heading (the *"Re:" line) and three second level headings.
+ Use an appropriate list type to mark up the semester start dates, study subjects, and exotic dances.
+ Put the two addresses inside `<address>` elements. Each line of the address should sit on a new line, but not be in a new paragraph.

### Inline semantics

+ The names of the sender and receiver should be marked up with strong importance.
+ The four dates in the document should have appropriate elements containing machine-readable dates.
+ The first address and first data in the letter should have a class attribute value of `sender-column`.
+ The following acronyms/abbreviations should be correctly marked up: *PhD*, *HTML*, *CSS*, *BC*and *Esq.*.
+ The six sub/superscripts should be marked up appropriately in the chemical formulae, and the numbers 103 and 104 should be 10 to the power of 3 and 4.
+ There are two places where the letter should have a hyperlink. Use http://example as the location for the link.
+ Mark up the university motto quote and citation with appropriate elements.

### Additional guidelines

+ The character set of the document should be utf-8 and have the corresponding meta tag.
+ The author of the letter should be specified in an appropriate tag.
+ Do not mind about the correct layout or CSS while marking up the letter &mdash; once the mark up is done, you can link to the provided [CSS file](app/src/public/stylesheets/styles.css) to compare with the screenshot below:

![Letter](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter/letter-update.png)