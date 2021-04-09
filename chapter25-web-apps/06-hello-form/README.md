# 06 &mdash; Hello, form!
> A simple Vanilla JavaScript project that illustrates how to work with `<form>` without interacting with a server.

In the example, an HTML page with a `<form>`, a couple of text fields, and a submit button are displayed.

When the user clicks on the *submit* button the event is intercepted and a message is displayed in the console with the contents of the text fields.

Additionally, `event.preventDefault()` is used to prevent the form from being submitted to the server.

Also, it is demonstrated how you can use `form.elements[i]` to get a reference to an array of the elements contained in the form, and `form.elements` as a map, with the key being the element's name:

```javascript
// You can use `form.elements` as an array to its elements
console.log(`form.elements[1].type: ${ form.elements[1].type }`);

// you can also use `form.elements` as a map, with key the element's name:
console.log(`form.elements.password.type: ${ form.elements.password.type }`);

// the elements have a `form` property to refer back to the form
console.log(`form.elements.password.form === form: ${ form.elements.password.form === form }`);
```




