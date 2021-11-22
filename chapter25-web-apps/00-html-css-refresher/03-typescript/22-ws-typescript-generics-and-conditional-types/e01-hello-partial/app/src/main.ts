interface ToDo {
  title: string;
  description: string;
}

function updateToDo(toDo: ToDo, fieldsToUpdate: Partial<ToDo>) {
  return { ...toDo, ...fieldsToUpdate };
}

const todo = {
  title: 'Learn TypeScript',
  description: 'Become a TypeScript hero so that I can write all my programs in TS in no time'
};

const updatedTodo = updateToDo(todo, { description: 'Learn enough TypeScript to become dangerous' });

console.log(updatedTodo);

