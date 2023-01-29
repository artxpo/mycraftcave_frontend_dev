import { Component, OnInit } from '@angular/core';
import { Todo } from './models/Todo';

import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  completeToDos: Todo[] = [];
  incompleteToDos: Todo[] = [];

  private _toDo: Partial<Todo>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getAll().subscribe((todos) => {
      this.completeToDos = todos.filter((todo) => todo.status);
      this.incompleteToDos = todos.filter((todo) => !todo.status);
    });
  }

  addToDo() {
    this.todoService
      .create({
        status: false,
        name: this._toDo.name,
      })
      .subscribe(({ todo }) => {
        this.incompleteToDos.push(todo);
      });
  }

  onAddToDoChange(toDo: Partial<Todo>) {
    this._toDo = toDo;
  }

  onDeleteToDo(todo: Todo, status: boolean) {
    this.todoService.delete(todo._id).subscribe(() => {
      if (status) {
        this.incompleteToDos = this.incompleteToDos.filter(
          (inCompleteTodo) => inCompleteTodo._id !== todo._id
        );
      } else {
        this.completeToDos = this.completeToDos.filter(
          (completeTodo) => completeTodo._id !== todo._id
        );
      }
    });
  }

  updateTodo(todo: Todo, status: boolean) {
    this.todoService.update(todo._id, todo).subscribe(() => {
      if (status) {
        this.completeToDos.push(todo);
        this.incompleteToDos = this.incompleteToDos.filter(
          (inCompleteTodo) => inCompleteTodo._id !== todo._id
        );
      } else {
        this.incompleteToDos.push(todo);
        this.completeToDos = this.completeToDos.filter(
          (completeTodo) => completeTodo._id !== todo._id
        );
      }
    });
  }

  onCompleteToDo(todo: Todo) {
    const updatedTodo: Todo = { ...todo, status: true };
    this.updateTodo(updatedTodo, true);
  }

  onIncompleteToDo(todo: Todo) {
    const updatedTodo: Todo = { ...todo, status: false };
    this.updateTodo(updatedTodo, false);
  }
}
