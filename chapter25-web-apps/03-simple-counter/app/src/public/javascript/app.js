'use strict';

import appState from './models/app-state.js';

const btnDecrease = document.querySelector('#btnDecrease');
const btnReset = document.querySelector('#btnReset');
const btnIncrease = document.querySelector('#btnIncrease');
const counter = document.querySelector('#counter');

function updateView() {
  counter.textContent = appState.counter;
  counter.style.color = appState.color;
}

btnDecrease.addEventListener('click', () => {
  appState.dec();
  updateView();
});

btnReset.addEventListener('click', () => {
  appState.reset();
  updateView();
});

btnIncrease.addEventListener('click', () => {
  appState.inc();
  updateView();
});
