"use strict";

const pug = require("pug");

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* basic usage */
(() => {
  const template = "strong #{message}";
  const context = { message: "Hello to Jason Isaacs!" };
  const fn = pug.compile(template);

  console.log(`result =  ${ fn(context) }`);
})();

/* Pug syntax */
(() => {
  const template = `
html
  head
    title Welcome
  body
    div.content#main
      strong Hello to #{name}!`;
  const context = { name: "Jason Isaacs" };
  const fn = pug.compile(template);

  console.log(`result =  ${ fn(context) }`);
})();

/* Embedding JavaScript in Pug */
(() => {
  const template = `
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
  const context = { contacts: [
    { firstName: "Jason", lastName: "Isaacs", status: "Active", isEditable: true, id: 0 },
    { firstName: "Idris", lastName: "Elba", status: "Inactive", isEditable: false, id: 1 },
    { firstName: "Riz", lastName: "Ahmed", status: "Pending", isEditable: true, id: 2 }

  ] };
  const fn = pug.compile(template);

  console.log(`result =  ${ fn(context) }`);
})();
