# 01: Event Loop and Async behavior &mdash; Hello, XHR!
> a simple TypeScript client application that performs requests to external sites using `xhr` and callbacks

## Description

This application consists of a simple Express server configured to serve a static application hosted in `app/src/public`.

The client (static) application consists of an HTML page with an empty card that will be populated with an image and some text that is retrieved from an external site using `xhr` and managing asynchronous behaviors with callbacks and events.

Essentially:
+ a callback `showRetrievedData()` is declared to take care of binding the retrieved data on the page's elements.
+ the callback is used as the event handler for the `'onload'` event of the `xhr` mechanism.

| NOTE: |
| :---- |
| In this exercise we're doing cross-origin requests, but those are allowed by the target site (https://openlibrary.org/). |
