'use strict';

/* Class composition */
class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}

class Notebook {
  constructor() {
    this.pages = [];
  }

  addPage(text) {
    const page = new Page(text);
    this.pages.push(page);
  }

  print() {
    for (let page of this.pages) {
      page.print();
    }
  }
}

let mathNotes = new Notebook();
mathNotes.addPage('Arithmetic: + - * / ...');
mathNotes.addPage('Trigonometry: sin cos tan ...');

mathNotes.print();

/* Inheritance */

class Publication {
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }

  print() {
    console.log(`
      Title: ${ this.title }
      By: ${ this.author }
      ${ this.pubDate }`);
  }
}

class Book extends Publication {
  constructor(bookDetails) {
    super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);
    this.publisher = bookDetails.publisher;
    this.ISBN = bookDetails.ISBN;
  }

  print() {
    super.print();
    console.log(`
      Publisher: ${ this.publisher }
      ISBN: ${ this.ISBN };
    `);
  }
}

class BlogPost extends Publication {
  constructor(title, author, pubDate, URL) {
    super(title, author, pubDate);
    this.URL = URL;
  }

  print() {
    super.print();
    console.log(this.URL);
  }
}

const book = new Book({
  title: `You Don't Know JS`,
  author: 'Kyle Simpson',
  publishedOn: 'June 2014',
  publisher: `O'Reilly`,
  ISBN: '123456-789'
});

const blogPost = new BlogPost('For and against let', 'Kyle Simpson', 'October 27, 2014', 'https://davidwalsh.name/for-and-against-let');

const publications = [book, blogPost];
for (let pub of publications) {
  pub.print();
}