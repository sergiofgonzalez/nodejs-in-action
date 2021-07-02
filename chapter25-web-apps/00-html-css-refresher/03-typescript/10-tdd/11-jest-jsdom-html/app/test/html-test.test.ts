import { JSDOM } from 'jsdom';

function setTestDivContents(text: string) {
  const div = document.querySelector('#test_div');
  const pNode = document.createElement('p');
  pNode.textContent = text;
  div?.appendChild(pNode);
}

describe('HTML test suite', () => {
  test('should set text on div', () => {
    document.body.innerHTML = `<div id="test_div"></div>`;
    const divElement = document.querySelector('#test_div');
    expect(divElement).not.toBeNull();

    setTestDivContents('Hello to Jason Isaacs!');
    expect(divElement?.textContent).toContain('Hello to Jason');
  });
});

describe('DOM events test suite', () => {
  const htmlBodyWithClickEventHandling = `
  <body>
    <button>Click me!</button>
    <script type="text/javascript">
      function clickEventHandler() {
        console.log('clickEventHandler called!');
      }
      const btn = document.querySelector('button');
      btn.addEventListener('click', clickEventHandler);
    </script>
  </body>
  `;


  test('should trigger a click DOM event', () => {
    const dom = new JSDOM(htmlBodyWithClickEventHandling, { runScripts: 'dangerously' });

    const button = <HTMLElement>dom.window.document.querySelector('button');
    const buttonSpy = jest.spyOn(button, 'click');
    button.click();
    expect(buttonSpy).toHaveBeenCalled();
  });
});