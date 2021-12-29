/* Note that you may want to use Browserify if you plan to use TS modules */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

interface ToDoTask {
  id: number;
  desc: string;
}

interface ModalEvent extends CustomEvent {
  relatedTarget: Element
}

const editModal: HTMLElement = getValidatedHtmlElement('#editModal');
const deleteModal: HTMLElement = getValidatedHtmlElement('#deleteModal');
const todoInput: HTMLInputElement = getValidatedHtmlElement('#todoDescInput');
const btnSave: HTMLButtonElement = getValidatedHtmlElement('#btnSave');


todoInput.addEventListener('input', () => {
  console.log(`todoInput:`, todoInput.value);
  btnSave.disabled = todoInput.value.length ? false : true;
});


editModal.addEventListener('show.bs.modal', evt => {
  console.log(`INFO: displaying Edit Task Modal`);
  const clickedElement = (evt as ModalEvent).relatedTarget;
  if (clickedElement.nodeName === 'BUTTON' || clickedElement.parentElement?.nodeName === 'BUTTON' ) {
    const task = getTaskFromClickedElement(clickedElement);
    if (task) {
      console.log(`INFO: task id=${ task.id } retrieved from the server`);
      const todoEditInputId: HTMLInputElement = getValidatedHtmlElement('#todoEditInputID');
      todoEditInputId.value = task.id.toString();
      const todoEditInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoEditInputDesc');
      todoEditInputDesc.value = task.desc;
      const updateBtn: HTMLButtonElement = getValidatedHtmlElement('#btnUpdate');
      updateBtn.addEventListener('click', handleTaskUpdate);
      todoEditInputDesc.addEventListener('input', handleEditTask);
      return;
    }
  } else {
    console.log(`INFO: click happened on a non-active element`);
  }
});


deleteModal.addEventListener('show.bs.modal', evt => {
  console.log(`INFO: displaying the Delete Task Modal`);
  const clickedElement = (evt as ModalEvent).relatedTarget;
  if (clickedElement.nodeName === 'BUTTON' || clickedElement.parentElement?.nodeName === 'BUTTON' ) {
    const task = getTaskFromClickedElement(clickedElement);
    if (task) {
      console.log(`INFO: task id=${ task.id } retrieved from the server`);
      const todoDeleteInputId: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputID');
      todoDeleteInputId.value = task.id.toString();
      const todoDeleteInputDesc: HTMLInputElement = getValidatedHtmlElement('#todoDeleteInputDesc');
      todoDeleteInputDesc.value = task.desc;
      const deleteBtn: HTMLButtonElement = getValidatedHtmlElement('#btnDelete');
      deleteBtn.addEventListener('click', handleTaskDelete);
      return;
    }
  } else {
    console.log(`INFO: click happened on a non-active element`);
  }
});

function getTaskFromClickedElement(elemClicked: Element): ToDoTask {
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
  const thId = tr.childNodes[1]; // for some reason childNodes[0] is '\n'
  if (thId.nodeName !== 'TH' || !thId.textContent) {
    console.error(`ERROR: could not locate <th> with task id`);
    throw new Error('Unexpected HTML structure');
  }
  const taskId = Number.parseInt(thId.textContent);

  const trDesc = tr.childNodes[3];
  if (trDesc.nodeName !== 'TD' || !trDesc.textContent) {
    console.error(`ERROR: could not locate <tr> with task description`);
    throw new Error('Unexpected HTML structure');
  }
  return { id: taskId, desc: trDesc.textContent };
}


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
  fetch(`/api/todos/${ todoTask.id }`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desc: todoTask.desc })
  })
  .then((res) => {
    console.log(`received response!`);
    if (res.status !== 200) {
      console.error(`ERROR: fetch 'PUT /todos/:id' returned error status (id=${ todoTask.id }): ${ res.status } (${ res.statusText })`);
      throw new Error(`Fetch 'PUT /todos/:id' error`);
    }
    window.location.replace('/');
  })
  .catch((err) => {
    console.error(`Could not update a task: ${ (err as Error).message }`);
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
  fetch(`/api/todos/${ todoTask.id }`, { method: 'DELETE' })
  .then((res) => {
    if (res.status !== 204) {
      console.error(`ERROR: fetch '/DELETE/:id' returned error status (id=${ todoTask.id }): ${ res.status } (${ res.statusText })`);
      throw new Error(`Fetch 'DELETE /todos/:id' error`);
    }
    window.location.replace('/');
  })
  .catch((err) => {
    console.error(`Could not post a new task: ${ (err as Error).message }`);
  })
  .finally(() => {
    const deleteBtn: HTMLButtonElement = getValidatedHtmlElement('#btnDelete');
    deleteBtn.removeEventListener('click', handleTaskDelete);
 });
}

function getValidatedHtmlElement<T extends Element>(htmlSelector: string): T {
  const elem = document.querySelector(htmlSelector);
  if (!elem) {
    console.log(`ERROR: ${ htmlSelector } was not found in the HTML`);
    throw new Error(`Missing element ${ htmlSelector } in HTML`);
  }
  return elem as T;
}