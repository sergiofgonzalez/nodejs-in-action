'use strict';

import appState from './models/app-state.js';

const nonNavArea=document.querySelector('#nonNavArea');
const colorName = document.querySelector('#colorName');
const btn = document.querySelector('#changeColorBtn');
const navBar = document.querySelector('#navBar');


btn.addEventListener('click', () => {
  appState.switchColor();
  resetColorIndicator();
});

navBar.addEventListener('click', evt => {
  for (let item of [...navBar.children]) {
    item.classList.remove('active');
  }

  const itemClicked = evt.target;
  itemClicked.classList.add('active');

  appState.appMode = itemClicked.textContent;
  resetColorIndicator();
});

function resetColorIndicator() {
  nonNavArea.style.background = appState.backgroundColor;
  colorName.textContent = appState.backgroundColor;
}