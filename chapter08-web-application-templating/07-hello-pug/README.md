# 07-hello-pug
> illustrating the basics of `pug` another templating engine

## Description

*Pug*, the successor of *Jade*, is a powerful template engine based on HAML.

This example illustrates the basics of working with *Pug*, and the following sections details some of the *Pug* features and syntax, as the learning curve for *Pug* is steeper than the one for EJS or Hogan.js.

## Pug Templating Engine Considerations

When creating a template in *Pug* you use indentation to indicate HTML tag nesting:
For example:
```html
<html>
  <head>
    <title>Welcome</title>
  </head>
  <body>
    <div id="main" class="content">
      <strong>Hello, world!</strong>
    </div>
  </body>
</html>
```

```yaml
html
  head
    title Welcome
  body
    div.content#main
      strong Hello, world!
```

Note that:
+ Pug uses the same tag names as HTML, without the opening and closing characters and use indentation instead.
+ Tag CSS classes are associated to a tag using the syntax `.<classname>`. For example, `<div class="content sidebar">` would be represented as `div.content.sidebar`.
+ Tag IDs are represented using the `#id` syntax, as in `<div id="block" class="content sidebar">` would be `div.content.sidebar#block`.

As the `div` tag is commonly used in HTML, *Pug* allows you to use a heading `.` instead of `div` so `<div id="block" class="content sidebar">` can be represented as `.content.sidebar#block`.

Tag attributes are specified in parentheses, so `<a href="nodejs.org" target="_blank">` would be specified as `a(href="http://nodejs.org", target="_blank")`. 

You can break lines by `,` as:
```yaml
a(href="http://nodejs.org",
  target="_blank")
```

You can also specify attributes that don't require a value:
```yaml
strong Select your favorite food:
form
  select
    option(value="Cheese") Cheese
    option(value="Tofu", selected) Tofu
```

You can use the following syntax to specify long bits of text:
```yaml
textarea
  | This is some text that
  | will be included in a 
  | textarea, and it's too long
  | to be included in a single
  | line
```

For the `style` and `script` tags you can use the following syntax:
```yaml
style
  h1 {
    font-size: 6em;
    color: #9DFF0C;
  }
```

You can use a more compact syntax using:
```yaml
ul
  li: a(href="http://nodejs.org/") Node.js homepage
  li: a(href="http://npmjs.org/") NPM homepage
```

You can embed JavaScript in the *Pug* templates using a special syntax, for example:
```yaml
html
  head
    title Welcome
  body
    h3.contacts-header My Contacts
    if contacts.length
      each contact in contacts
        - var fullName = contact.firstName + " " + contact.lastName
        .contact-box
          p= fullName
          if contact.isEditable
            p: a(href="/edit/" + contact.id) Edit Record
          p
            case contact.status
              when "Active"
                strong User is active in the system
              when "Inactive"
                em User is inactive
              when "Pending"
                | User has a pending invitation
    else
      p You currently do not have any contacts`;
```

with the contacts being:
```javascript
const context = { contacts: [
  { firstName: "Jason", lastName: "Isaacs", status: "Active", isEditable: true, id: 0 },
  { firstName: "Idris", lastName: "Elba", status: "Inactive", isEditable: false, id: 1 },
  { firstName: "Riz", lastName: "Ahmed", status: "Pending", isEditable: true, id: 2 }
] };
```

would render:
```html
<html>
  <head>
    <title>Welcome</title>
  </head>
  <body>
    <h3 class="contacts-header">My Contacts</h3>
    <div class="contact-box">
      <p>Jason Isaacs</p>
      <p><a href="/edit/0">Edit Record</a></p>
      <p><strong>User is active in the system</strong></p>
    </div>
    <div class="contact-box">
      <p>Idris Elba</p><p><em>User is inactive</em></p>
    </div>
    <div class="contact-box">
      <p>Riz Ahmed</p>
      <p><a href="/edit/2">Edit Record</a></p>
      <p>User has a pending invitation</p>
    </div>
  </body>
</html>
```