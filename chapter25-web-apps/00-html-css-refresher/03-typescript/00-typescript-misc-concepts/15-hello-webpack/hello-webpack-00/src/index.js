function component() {
  const element = document.createElement('div');

  // using Lodash, included via script in the HTML document
  element.innerHTML = _.join(['Hello', 'webpack']);
  return element;
}

document.body.appendChild(component());
