import { Url } from './lib/url.js';
import { UrlBuilder } from './lib/url-builder.js';

const exampleUrl = new Url('https', null, null, 'example.com', null, null, null, null);

console.log(`site url: `, exampleUrl.toString());

const exampleUrlUsingBuilder = new UrlBuilder()
  .setProtocol('https')
  .setHostname('example.com')
  .build();
console.log(`site url: `, exampleUrlUsingBuilder.toString());