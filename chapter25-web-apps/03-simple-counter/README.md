# 03 &mdash; Simple Counter
> A simple Vanilla JavaScript project that features an interactive counter that can be operated with buttons

## Simple Counter
Simple Counter is a simple vanilla JavaScript application that displays on the page the current value of an integer counter and provides three buttons to decrease, reset and increase the value of the counter.

Depending on the value of the counter, its text color is set to red (when less than zero), dark blue (when zero), or green (when greater than zero).

### Interesting Takeaways
As always, the most challenging part has been adjusting the CSS. There are three rows in the screen, which are more or less vertically aligned (a bit stretched to the top as it looks better on the screen).

+ The layout consist of three rows vertically (more or less), and horizontally aligned. The vertical alignment has been slightly pushed to the top as it looks more natural.
+ The font face and size of the counter and counter value has been updated
+ Basic usage of ES modules
+ The application state is kept separately on an ES module
+ Basic use of DOM and event handling techniques to detect when the button has been clicked
