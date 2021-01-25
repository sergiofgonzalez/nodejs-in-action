import path from 'path';
import { URL } from 'url';
import slug from 'slug';

export function urlToFilename(url) {
  const parsedURL = new URL(url);
  const urlPath = parsedURL.pathname.split('/')
    .filter(component => component !== '')
    .map(component => slug(component, { remove: null }))
    .join('/');

  let filename = path.join(parsedURL.hostname, urlPath);
  if (!path.extname(filename).match(/html/)) {
    filename += '.html';
  }
  return filename;
}