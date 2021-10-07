interface Book {
  author: string;
  title: string;
  pages?: number;
  isRead?: boolean;
}

function showBook(book: Book) {
  console.log(`${book.author} wrote ${book.title}`);
  if (book.isRead !== undefined) {
    console.log(`  I have ${book.isRead ? 'read' : 'not read' } this book`);
  }
  if (book.pages !== undefined) {
    console.log(`  The book has ${book.pages} ${book.pages !== 1 ? 'pages' : 'page'}`);
  }
}

function setPages(book: Book, pages: number) {
  book.pages = pages;
}

function readBook(book: Book) {
  book.isRead = true;
}

function makeBook(title: string, author: string, pages?: number): Book {
  return {
    author: author,
    title: title,
    pages: pages
  };
}

const crimeAndPunishment = {
  author: 'Fiodor Dostoyevksi',
  title: 'Crime and Punishment',
  isRead: true
};

const mobyDick: Book = {
  author: 'Herman Melville',
  title: 'Moby Dick'
};


const theHobbit = makeBook('The Hobbit', 'J.R.R. Tolkien');
readBook(theHobbit);
showBook(theHobbit);

setPages(crimeAndPunishment, 545);
showBook(crimeAndPunishment); /* duck-typing! */

showBook(mobyDick);
readBook(mobyDick);
showBook(mobyDick);