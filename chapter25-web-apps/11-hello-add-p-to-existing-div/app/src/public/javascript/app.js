/* client-side JavaScript here */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const div = document.querySelector('#test_div');
const pNode = document.createElement('p');
pNode.textContent = 'Hello, world!';
div.appendChild(pNode);
