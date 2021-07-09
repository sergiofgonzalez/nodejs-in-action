import { TodoItem } from './todo-item';

export class TodoList {
  constructor(public user: string, private todoItems: TodoItem[] = []) {
  }

  get items(): readonly TodoItem[] {
    return this.todoItems;
  }

  addItem(task: string) {
    this.todoItems.push(new TodoItem(task));
  }
}