const url = 'ws://localhost:5050/myWebsocket';
const myWsServer = new WebSocket(url);
console.log(`INFO: Established WebSocket connection to url`, url);

const { myMessages, myInput, sendBtn } = getHtmlElements();

sendBtn.disabled = true;
sendBtn.addEventListener('click', sendMsg);

function sendMsg() {
  const text = myInput.value;
  msgGeneration(text, 'Client');
  console.log(`INFO: Sending message to the WebSocket server: ${ text }`);
  myWsServer.send(text);
}


function msgGeneration(msg: string, from: string) {
  const newMessage = document.createElement('h5');
  newMessage.textContent = `${ from } says: ${ msg }`;
  myMessages.appendChild(newMessage);
}


myWsServer.onopen = () => {
  console.log(`INFO: WebSocket server received 'open' event`);
  sendBtn.disabled = false;
};


myWsServer.onmessage = (event) => {
  console.log(`INFO: received 'message' event from the WebSocket server`);
  const { data } = event;
  msgGeneration(data, 'Server');
};

myWsServer.addEventListener('error', (err) => {
  console.error(`ERROR: WebSocket server received 'error' event: `, err);
});

function getValidatedHtmlElement<T extends Element>(htmlSelector: string): T {
  const elem = document.querySelector(htmlSelector);
  if (!elem) {
    console.log(`ERROR: ${ htmlSelector } was not found in the HTML`);
    throw new Error(`Missing element ${ htmlSelector } in HTML`);
  }
  return elem as T;
}


function getHtmlElements(): { myMessages: HTMLDivElement, myInput: HTMLInputElement, sendBtn: HTMLButtonElement } {

  const myMessages: HTMLDivElement = getValidatedHtmlElement<HTMLDivElement>('#messages');
  const myInput: HTMLInputElement = getValidatedHtmlElement<HTMLInputElement>('#message');
  const sendBtn: HTMLButtonElement = getValidatedHtmlElement<HTMLButtonElement>('#send');

  return { myMessages, myInput, sendBtn };
}