import { create as createPub } from './publication.mjs';

function printDetails(pub, URL) {
  pub.print();
  console.log(URL);
}

export function create(title, author, pubDate, URL) {
  const pub = createPub(title, author, pubDate);

  const publicAPI = {
    print() {
      printDetails(pub, URL);
    }
  };

  return publicAPI;
}