
window.addEventListener('load', () => {
  console.log(`Window is loaded!`);
});

const fetchResultsTextarea = getTextareaInputElement();
const radios = getRadiosInputElements();


for (const radio of radios as HTMLInputElement[]) {
  console.log(`Adding listener to radio`, radio);
  radio.addEventListener(`change`, () => {
    if (fetchResultsTextarea) {
      const selectedRadioValue = (radio as HTMLInputElement).value;
      console.log(`Radio has been selected: ${ selectedRadioValue }`);
      dispatch(selectedRadioValue);
    } else {
      console.error(`ERROR: could not find results text area in HTML document`);
      throw new Error('fetchResultsTextAres is null');
    }
  });
}


function dispatch(radioValue: string): void {
  if (radioValue === `actionNoCors`) {
    sendCrossOriginRequestToNonCorsEnabledResource();
  } else if (radioValue === 'actionCors') {
    sendCrossOriginRequestToCorsEnabledResource();
  } else if (radioValue === 'actionExternalModeCors') {
    sendCrossOriginRequestInCorsModeToExternalSite();
  } else if (radioValue === 'actionExternalModeNoCors') {
    sendCrossOriginRequestInNoCorsModeToExternalSite();
  } else  {
    console.error(`ERROR: unexpected value for the radio: ${ radioValue }`);
    throw new Error(`Unexpected action to be dispatched`);
  }
}

async function sendCrossOriginRequestToNonCorsEnabledResource() {
  try {
    fetchResultsTextarea.textContent = `Sending request to http://localhost:5000/...`;
    const response = await fetch('http://localhost:5000');
    if (!response.ok) {
      console.log(`ERROR: 'fetch' failed with a network error`);
      fetchResultsTextarea.textContent += `\nNetwork error or misconfigured CORS on the server side`;
      fetchResultsTextarea.textContent += `\nResponse type: ${ response.type }, status: ${ response.status }`;
    } else {
      const contents = await response.text();
      fetchResultsTextarea.textContent = contents;
    }
  } catch (err) {
    console.log(`ERROR: Could not send cross-origin request:`, err);
    fetchResultsTextarea.textContent += `\nCross origin request failed with error: ${ (err as Error).message }\nAdditional info might be found on the Dev Tools console.`;
  }
}

async function sendCrossOriginRequestToCorsEnabledResource() {
  try {
    fetchResultsTextarea.textContent = `Sending request to http://localhost:5000/allow-cors...`;
    const response = await fetch('http://localhost:5000/allow-cors', { mode: 'cors'});
    if (!response.ok) {
      console.log(`ERROR: 'fetch' failed with a network error`);
      fetchResultsTextarea.textContent += `\nNetwork error or misconfigured CORS on the server side`;
      fetchResultsTextarea.textContent += `\nResponse type: ${ response.type }, status: ${ response.status }`;
    } else {
      const contents = await response.text();
      fetchResultsTextarea.textContent = contents;
    }
  } catch (err) {
    console.log(`ERROR: Could not send cross-origin request:`, err);
    fetchResultsTextarea.textContent += `\nCross origin request failed with error: ${ (err as Error).message }\nAdditional info might be found on the Dev Tools console.`;
  }
}

async function sendCrossOriginRequestInCorsModeToExternalSite() {
  try {
    fetchResultsTextarea.textContent = `Sending request to https://www.example.com/...`;
    const response = await fetch('https://www.example.com');
    if (!response.ok) {
      console.log(`ERROR: 'fetch' failed with a network error`);
      fetchResultsTextarea.textContent += `\nNetwork error or misconfigured CORS on the server side`;
      fetchResultsTextarea.textContent += `\nResponse type: ${ response.type }, status: ${ response.status }`;
    } else {
      const contents = await response.text();
      fetchResultsTextarea.textContent = contents;
    }
  } catch (err) {
    console.log(`ERROR: Could not send cross-origin request:`, err);
    fetchResultsTextarea.textContent += `\nCross origin request failed with error: ${ (err as Error).message }\nAdditional info might be found on the Dev Tools console.`;
  }
}

async function sendCrossOriginRequestInNoCorsModeToExternalSite() {
  try {
    fetchResultsTextarea.textContent = `Sending request to https://www.example.com/...`;
    const response = await fetch('https://www.example.com', { mode: 'no-cors' });
    const contents = await response.text();
    console.log(contents);
    if (!response.ok) {
      console.log(`ERROR: 'fetch' failed with a network error: ${ response.status }`);
      fetchResultsTextarea.textContent += `\nNetwork error or misconfigured CORS on the server side`;
      fetchResultsTextarea.textContent += `\nResponse type: ${ response.type }, status: ${ response.status }`;
    } else {
      const contents = await response.text();
      fetchResultsTextarea.textContent = contents;
    }
  } catch (err) {
    console.log(`ERROR: Could not send cross-origin request:`, err);
    fetchResultsTextarea.textContent += `\nCross origin request failed with error: ${ (err as Error).message }\nAdditional info might be found on the Dev Tools console.`;
  }
}

function getTextareaInputElement(): HTMLInputElement {
  const queryResult = document.querySelector('#fetchResultsTextarea');
  if (!queryResult) {
    console.error(`ERROR: could not find '#fetchResultsTextarea' in HTML document`);
    throw new Error(`HTML element '#fetchResultsTextarea' was not found`);
  }
  const htmlInputElem = queryResult as HTMLInputElement;
  return htmlInputElem;
}

function getRadiosInputElements(): HTMLInputElement[] {
  const queryResult = document.querySelectorAll('[name=actionsRadio]');
  if (!queryResult) {
    console.error(`ERROR: could not find '[name=actionsRadio]' in HTML document`);
    throw new Error(`HTML element '[name=actionsRadio]' was not found`);
  }
  const elemsAsArray = [...queryResult];
  const htmlInputElems = elemsAsArray as HTMLInputElement[];
  return htmlInputElems;
}
