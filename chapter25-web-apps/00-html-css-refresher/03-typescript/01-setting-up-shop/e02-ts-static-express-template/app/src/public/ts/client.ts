interface OpenLibraryAuthor {
  personal_name: string;
  photos: number[];
}

const xhr = new XMLHttpRequest();
const url = 'https://openlibrary.org/authors/OL9388A.json';
xhr.open('GET', url);

xhr.send();

const showRetrievedData = () => {
  if (xhr.status !== 200) {
    console.log(`ERROR: could not retrieve data: ${ xhr.status } (${ xhr.statusText })`);
  } else {
    const response: OpenLibraryAuthor = JSON.parse(xhr.response);
    const image = getImageElement();
    image.src = `https://covers.openlibrary.org/a/id/${ response.photos[0] }-M.jpg`;
    const cardTitle = getCardTitle();
    cardTitle.textContent = response.personal_name;
  }
};


xhr.onload = showRetrievedData;


function getImageElement(): HTMLImageElement {
  const queryResult = document.querySelector('img');
  if (!queryResult) {
    console.error(`ERROR: could not find 'img' in the HTML document`);
    throw new Error('Unexpected HTML structure');
  }
  return queryResult;
}

function getCardTitle(): Element {
  const queryResult = document.querySelector('.card-title');
  if (!queryResult) {
    console.error(`ERROR: could not find '.card-title' in the HTML document`);
    throw new Error('Unexpected HTML structure');
  }
  return queryResult;
}
