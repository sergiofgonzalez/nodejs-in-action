interface OpenLibraryAuthor {
  personal_name: string;
  photos: number[];
}


async function retrieveData(): Promise<Response> {
  const url = 'https://openlibrary.org/authors/OL9388A.json';
  try {
    const response = await fetch(url);
    return response;
  } catch (err) {
    console.log(`ERROR: could not fetch: ${ (err as Error).message }`);
    throw err;
  }
}

async function bindRetrievedDataInHtml(response: Response) {
  if (response.status !== 200) {
    console.log(`ERROR: data retrieval failed: ${ response.status } (${ response.statusText })`);
  } else {
    const data: OpenLibraryAuthor = await response.json();
    getCardTitle().textContent = data.personal_name;
    getImageElement().src = `https://covers.openlibrary.org/a/id/${ data.photos[0] }-M.jpg`;
  }
}


window.onload = async () => {
  const response = await retrieveData();
  await bindRetrievedDataInHtml(response);
};


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
