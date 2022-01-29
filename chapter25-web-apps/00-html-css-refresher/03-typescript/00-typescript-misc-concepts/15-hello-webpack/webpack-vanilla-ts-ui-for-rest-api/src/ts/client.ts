import { getValidatedHtmlElement } from './lib/get-validated-html-element';

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);


interface ToDoTask {
  id: number;
  desc: string;
}

const btnSave: HTMLButtonElement = getValidatedHtmlElement('#btnSave');
const table: HTMLTableElement = getValidatedHtmlElement('table');
const todoInput: HTMLInputElement = getValidatedHtmlElement('#todoDescInput');
const editModal: HTMLElement = getValidatedHtmlElement('#editModal');
const deleteModal: HTMLElement = getValidatedHtmlElement('#deleteModal');

btnSave.disabled = true;

/* events */
window.addEventListener('load', () => {
  console.log(`INFO: window is loaded: performing initial load`);
  updateTableContents();
});

todoInput.addEventListener('input', () => {
  btnSave.disabled = todoInput.value.length ? false : true;
});

btnSave.addEventListener('click', () => {
  console.log(`INFO: user requested a new task to be saved`);
  if (!todoInput.value) {
    return console.log(`WARNING: save was activated on an empty task`);
  }
  fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desc: todoInput.value })
  })
  .then((res) => {
    if (res.status !== 200) {
      console.error(`ERROR: fetch 'POST /todos' returned error status: ${ res.status } (${ res.statusText })`);
      throw new Error(`Fetch 'POST /todos' error`);
    }
    updateTableContents();
    todoInput.value = ``;
    btnSave.disabled = true;
  })
  .catch((err) => {
    console.error(`Could not post a new task: ${ (err as Error).message }`);
  });
});

interface ModalEvent extends CustomEvent {
  relatedTarget: Element
}

editModal.addEventListener('show.bs.modal', evt => {
  console.log(`INFO: displaying Edit Task Modal`);
  const clickedElement = (evt as ModalEvent).relatedTarget;
  if (clickedElement.nodeName === 'BUTTON' || clickedElement.parentElement?.nodeName === 'BUTTON' ) {
    const id = getTaskIdFromClickedElement(clickedElement);
    fetch(`http://localhost:5000/todos/${ id }`)
    .then((res) => {
      if (res.status !== 200) {
        console.error(`ERROR: fetch 'GET /todos/:id' returned error status: ${ res.status } (${ res.statusText })`);
        throw new Error(`Fetch 'GET /todos/:id' error`);
      }
      return res.json();
    })
    .then((task: ToDoTask) => {
      if (task) {
        console.log(`INFO: task id=${ id } retrieved from the server`);
        const todoEditInputId: HTMLInputElement = getValidatedHtmlElement('#todoEditInputID');
        todoEditInputId.value = task.id.toString();
        const todoEditInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoEditInputDesc');
        todoEditInputDesc.value = task.desc;
        const updateBtn: HTMLButtonElement = getValidatedHtmlElement('#btnUpdate');
        updateBtn.addEventListener('click', handleTaskUpdate);
        todoEditInputDesc.addEventListener('input', handleEditTask);
        return;
      }
    })
    .catch((err) => {
      console.error(`ERROR: Could not retrieve ToDo task from server: ${ (err as Error).message }`);
    });
  } else {
    console.log(`INFO: click happened on a non-active element`);
  }
});



deleteModal.addEventListener('show.bs.modal', evt => {
  console.log(`INFO: displaying the Delete Task Modal`);
  const clickedElement = (evt as ModalEvent).relatedTarget;
  if (clickedElement.nodeName === 'BUTTON' || clickedElement.parentElement?.nodeName === 'BUTTON' ) {
    const id = getTaskIdFromClickedElement(clickedElement);
    fetch(`http://localhost:5000/todos/${ id }`)
    .then((res) => {
      if (res.status !== 200) {
        console.error(`ERROR: fetch 'GET /todos/:id' returned error status: ${ res.status } (${ res.statusText })`);
        throw new Error(`Fetch 'GET /todos/:id' error`);
      }
      return res.json();
    })
    .then((task: ToDoTask) => {
      if (task) {
        console.log(`INFO: task id=${ id } retrieved from the server`);
        const todoDeleteInputId: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputID');
        todoDeleteInputId.value = task.id.toString();
        const todoDeleteInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputDesc');
        todoDeleteInputDesc.value = task.desc;
        const deleteBtn: HTMLButtonElement = getValidatedHtmlElement('#btnDelete');
        deleteBtn.addEventListener('click', handleTaskDelete);
        return;
      }
    })
    .catch((err) => {
      console.error(`ERROR: Could not retrieve ToDo task from server: ${ (err as Error).message }`);
    });
  } else {
    console.log(`INFO: click happened on a non-active element`);
  }
});

function handleEditTask() {
  const todoEditInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoEditInputDesc');
  const updateBtn: HTMLButtonElement = getValidatedHtmlElement('#btnUpdate');
  updateBtn.disabled = todoEditInputDesc.value.length ? false : true;
}

function handleTaskUpdate() {
  const todoEditInputId: HTMLInputElement = getValidatedHtmlElement('#todoEditInputID');
  const todoEditInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoEditInputDesc');
  const todoTask: ToDoTask = {
    id: Number.parseInt(todoEditInputId.value),
    desc: todoEditInputDesc.value
  };
  fetch(`http://localhost:5000/todos/${ todoTask.id }`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desc: todoTask.desc })
  })
  .then((res) => {
    if (res.status !== 200) {
      console.error(`ERROR: fetch 'PUT /todos/:id' returned error status (id=${ todoTask.id }): ${ res.status } (${ res.statusText })`);
      throw new Error(`Fetch 'PUT /todos/:id' error`);
    }
    updateTableContents();
  })
  .catch((err) => {
    console.error(`Could not post a new task: ${ (err as Error).message }`);
  })
  .finally(() => {
    const updateBtn: HTMLButtonElement = getValidatedHtmlElement('#btnUpdate');
    updateBtn.removeEventListener('click', handleTaskUpdate);
    todoEditInputDesc.removeEventListener('input', handleEditTask);

    /*
      Tried to close the modal manually but it's a lot of work,
      as it does not only hides the modal, but also handles a
      the backdrop through extra classes and divs it adds to the
      document body...
      It is much easier to just use the data-bs-dismiss

    import { Modal } from 'bootstrap';
    ...

    const bsModalDiv = document.getElementById('editModal');
    if (!bsModalDiv) {
      console.error(`ERROR: not found`);
      throw new Error('Unexpected HTML structure');
    }
    const bsModal = Modal.getInstance(bsModalDiv);
    bsModal?.hide();
    const backdrop = getValidatedHtmlElement('.modal-backdrop');
    backdrop.remove();
    console.log(`Modal has been hidden, i guess`);
  */
  });
}


function handleTaskDelete() {
  const todoDeleteInputId: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputID');
  const todoDeleteInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputDesc');
  const todoTask: ToDoTask = {
    id: Number.parseInt(todoDeleteInputId.value),
    desc: todoDeleteInputDesc.value
  };
  fetch(`http://localhost:5000/todos/${ todoTask.id }`, { method: 'DELETE' })
  .then((res) => {
    if (res.status !== 204) {
      console.error(`ERROR: fetch 'PUT /DELETE/:id' returned error status (id=${ todoTask.id }): ${ res.status } (${ res.statusText })`);
      throw new Error(`Fetch 'DELETE /todos/:id' error`);
    }
    updateTableContents();
  })
  .catch((err) => {
    console.error(`Could not post a new task: ${ (err as Error).message }`);
  })
  .finally(() => {
    const deleteBtn: HTMLButtonElement = getValidatedHtmlElement('#btnDelete');
    deleteBtn.removeEventListener('click', handleTaskDelete);
 });
}

/* Non-event business logic */

function updateTableContents() {
  fetch('http://localhost:5000/todos')
    .then((res) => {
      if (res.status !== 200) {
        console.error(`ERROR: fetch 'GET /todos' returned error status: ${ res.status } (${ res.statusText })`);
        throw new Error(`Fetch 'GET /todos' error`);
      }
      return res.json();
    })
    .then((tasks: ToDoTask[]) => {
      if (tasks.length === 0) {
        console.log(`INFO: no tasks retrieved!`);
        const tableBody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.colSpan = 3;
        th.setAttribute('style', 'text-align: center');
        th.textContent = 'Nothing to do';
        tr.appendChild(th);
        tableBody.appendChild(tr);

        const oldTableBody = getValidatedHtmlElement('tbody');
        table.removeChild(oldTableBody);
        table.appendChild(tableBody);

        return;
      } else {
        console.log(`INFO: ${ tasks.length } task${ tasks.length === 1 ? '' : 's'} retrieved from the server`);
        const tableBody = document.createElement('tbody');
        for (const task of tasks) {
          const tr = getTableRow(task);
          tableBody.appendChild(tr);
        }
        const oldTableBody = getValidatedHtmlElement('tbody');
        table.removeChild(oldTableBody);
        table.appendChild(tableBody);
        return;
      }
    })
    .catch((err) => {
      console.error(`ERROR: Could not retrieve ToDo tasks from server: ${ (err as Error).message }`);
    });
}

function getTaskIdFromClickedElement(elemClicked: Element) {
  const btn = elemClicked.nodeName === 'BUTTON' ? elemClicked : elemClicked.parentElement;
  if (!btn) {
    console.error(`ERROR: could not locate <button>`);
    throw new Error('Unexpected HTML structure');
  }
  const tdActions = btn.parentElement;
  if (!tdActions) {
    console.error(`ERROR: could not locate <td>`);
    throw new Error('Unexpected HTML structure');
  }
  const tr = tdActions.parentElement;
  if (!tr) {
    console.error(`ERROR: could not locate <tr>`);
    throw new Error('Unexpected HTML structure');
  }
  const thId = tr.childNodes[0];
  if (thId.nodeName !== 'TH' || !thId.textContent) {
    console.error(`ERROR: could not locate <th>`);
    throw new Error('Unexpected HTML structure');
  }
  const taskId = Number.parseInt(thId.textContent);
  return taskId;
}

function getTableRow(task: ToDoTask) {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = task.id.toString();
  const tdDesc = document.createElement('td');
  tdDesc.textContent = task.desc;
  const tdActions = document.createElement('td');
  const editButton = getEditButton();
  const removeButton = getRemoveButton();

  tdActions.appendChild(editButton);
  tdActions.appendChild(removeButton);

  tr.appendChild(th);
  tr.appendChild(tdDesc);
  tr.appendChild(tdActions);
  return tr;
}

function getSvgButton(modalId: string, iconClass: string, ...svgPathDs: string[]) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-secondary btn-sm';
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', modalId);
  button.setAttribute('style', 'margin-left: 0.25em');
  const iconSvg = document.createElement('svg');
  iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  iconSvg.setAttribute('width', '16');
  iconSvg.setAttribute('height', '16');
  iconSvg.setAttribute('fill', 'currentColor');
  iconSvg.className = iconClass;
  iconSvg.setAttribute('viewBox', '0 0 16 16');
  for (const pathD of svgPathDs) {
    const path = document.createElement('path');
    path.setAttribute('d', pathD);
    iconSvg.appendChild(path);
  }
  button.appendChild(iconSvg);
  return button;
}

function getEditButton() {
  const editButton = getSvgButton('#editModal', 'bi bi-pencil', 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z');
  return editButton;
}

function getRemoveButton() {
  const removeButton = getSvgButton('#deleteModal', 'bi bi-x-octagon', 'M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z', 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z');
  return removeButton;
}
