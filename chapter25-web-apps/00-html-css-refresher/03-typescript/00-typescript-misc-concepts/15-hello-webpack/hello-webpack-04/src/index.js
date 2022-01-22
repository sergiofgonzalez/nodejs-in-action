import _ from 'lodash';
import './style.css';
import Icon from './bomb.ico';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack']);
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;
  myIcon.width = '24';
  myIcon.height = '24';


  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
