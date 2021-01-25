"use strict";

const hogan = require("hogan.js");
const md = require("github-flavored-markdown");
const util = require("util");
util.inspect.defaultOptions.depth = null;


/* basic usage */
(() => {
  const templateSource = "{{ message }}";
  const context = { message: "Hello to Jason Isaacs!" };
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* display value for a particular context item */
(() => {
  const templateSource = "Hello to {{ name }}!";
  const context = { message: "Hello to Jason Isaacs!", name: "Sergio" };
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* Show escaped and unescaped contents */
(() => {
  const templateSource = "Escaped: {{ value }}; Unescaped: {{{ value }}}";
  const context = { value: "Using <strong>hogan.js</strong>" };
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* iterating */
(() => {
  const context = {
    actors: [
      { name: "Jason Isaacs", age: 43 },
      { name: "Riz Ahmed", age: 27 },
      { name: "Idris Elba", age: 38 }
    ]
  };
  const templateSource = `
{{#actors}}
  <p>Name: {{name}}, Age: {{age}} years old</p>
{{/actors}}
  `;
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* inverted sections */
(() => {
  const context = {
    actors: []
  };
  const templateSource = `
{{#actors}}
  <p>Name: {{name}}, Age: {{age}} years old</p>
{{/actors}}
{{^actors}}
  <p>No actors found</p>
{{/actors}}
  `;
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* 
  section lambdas 
  hogan.js allows for section lambdas to define functions
  than will be called when the template is rendered to
  perform custom logic.
*/
(() => {
  const templateSource = `
{{#custom}}
  Name: {{name}}
{{/custom}}
  `;
  
  const context = { 
    name: "Jason Isaacs",
    custom: () => {
      return (text) => {
        return text.replace("Name", "Nombre");
      };
    }
  };
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();

/* You can also use pre-existing section lambdas */
(() => {
  const templateSource = `
{{#markdown}}
  Hello to: **{{name}}** in \`Node.js\`
{{/markdown}}
  `;
  
  const context = { 
    name: "Jason Isaacs",
    markdown: () => {
      return (text) => {
        return md.parse(text);
      };
    }
  };
  const template = hogan.compile(templateSource);

  console.log(`result =  ${ template.render(context) }`);
})();



/* partials: using templates within templates */
(() => {
  const actorTemplateSource = `
<p>
  Name: {{name}},
  Age: {{age}} years old
</p>`;

  const mainTemplateSource = `
{{#actors}}
  {{>actor}}
{{/actors}}
  `;

  const context = {
    actors: [
      { name: "Jason Isaacs", age: 43 },
      { name: "Riz Ahmed", age: 27 },
      { name: "Idris Elba", age: 38 }
    ]
  };

  const template = hogan.compile(mainTemplateSource);
  const partial = hogan.compile(actorTemplateSource);

  console.log(`result =  ${ template.render(context, { actor: partial }) }`);
})();

/* changing default delim */
(() => {
  const templateSource = "<% message %>";
  const context = { message: "Hello to Jason Isaacs!" };
  const template = hogan.compile(templateSource, { delimiters: "<% %>"});

  console.log(`result =  ${ template.render(context) }`);
})();