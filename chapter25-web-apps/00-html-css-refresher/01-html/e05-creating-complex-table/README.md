# e05 &mdash; Creating a complex HTML table
> Illustrates how to create a complete HTML table from scratch using raw data.

## Description

This example was developed following the information on [MDN Assessment: Structuring planet data](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data).

In the exercise you start with some data in non-HTML format, and get you to structure it into an HTML table.

The goal of the exercise is to end up with an HTML table that looks like:

![Final status](https://mdn.github.io/learning-area/html/tables/assessment-finished/planets-data.html)

### Steps to follow

1. Start off by creating an outer container, a table header, and table body.
2. Add the table's caption.
3. Add a row to the table header containing all the column headers.
4. Create all the content rows inside the table body, remembering to make all the row headings into headings semantically.
5. Add attributes to make the row and column headers unambiguously associated with the roes, columns, or rowgroups that the act as headings for (using the `scope` attribute).
6. Add a 2px black border just around the column that contains all the planet name row headers (hint: the style incantation for that would be `"border: 2px solid black;"`)