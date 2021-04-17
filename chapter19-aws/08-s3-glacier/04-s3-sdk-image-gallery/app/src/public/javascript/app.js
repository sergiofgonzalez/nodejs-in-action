/* client-side JavaScript here */

/* global $ */

import { buildTable } from './services/build-table.js';
import { appState } from './models/app-state.js';
import { getUploadedFiles } from './services/get-uploaded-files.js';
import { mapFilesToDataRows } from './services/map-files-to-data-rows.js';
import { getActionFromClickedElement } from './services/get-action-from-clicked-element.js';
import { downloadFile } from './services/download-file.js';
import { getObjectUrlForImage } from './services/get-object-url-for-image.js';

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const form = document.querySelector('form');
const input = document.querySelector('input');
const fileInfo = document.querySelector('#fileInfo');
const uploadedFilesTableDiv = document.querySelector('#uploadedFilesTable');
const submitBtn = document.querySelector('#submitBtn');
const imgPlaceholder = document.querySelector('#imgPlaceholder');
const modalTitle = document.querySelector('#modalLabel');

function updateView() {
  if (appState.selectedFile) {
    fileInfo.textContent = `${ appState.selectedFile.name } (${ appState.selectedFile.type ?? 'no file type detected '})`;
    submitBtn.disabled = false;
    submitBtn.className = 'btn btn-primary';
  } else {
    submitBtn.disabled = true;
    submitBtn.className = 'btn btn-secondary';
  }
  const previousTable = document.querySelector('table');
  if (previousTable) {
    uploadedFilesTableDiv.removeChild(previousTable);
  }
  const table = buildTable(mapFilesToDataRows(appState.uploadedFiles), 'table table-sm', 'thead-dark');
  uploadedFilesTableDiv.appendChild(table);
}

input.addEventListener('change', () => {
  if (input.files.length > 0) {
    appState.selectedFile = input.files[0];
    updateView();
  }
});

form.addEventListener('submit', () => {
  console.log(`Processing form submission: filename=${ form.elements.inputFile.files[0]?.name }`);
  updateView();
});


uploadedFilesTableDiv.addEventListener('click', async (evt) => {
  const itemClicked = evt.target;
  if (itemClicked.nodeType == Node.ELEMENT_NODE) {
    const { action, filename } = getActionFromClickedElement(itemClicked);
    console.log(`Click detected on an action icon: action=${ action }, file=${ filename }`);
    if (action === 'download') {
      await downloadFile(filename);
    } else if (action === 'view') {
      const imgObjUrl = await getObjectUrlForImage(filename);
      imgPlaceholder.src = imgObjUrl;
      imgPlaceholder.onload = () => URL.revokeObjectURL(imgObjUrl);
      modalTitle.textContent = filename;
      $('#imgModal').modal({ show: true });
    }
    evt.preventDefault();
    evt.stopPropagation();
  }
});

window.addEventListener('load', async () => {
  const uploadedFiles = await getUploadedFiles();
  uploadedFiles?.forEach(appState.addUploadedFile.bind(appState));
  updateView();
});
