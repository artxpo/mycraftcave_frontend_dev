import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() toDos: Todo[];

  @Output() toDoChange = new EventEmitter<Todo>();
  @Output() toDoDelete = new EventEmitter<Todo>();

  constructor() {}

  onCompleteChange(toDo: Todo, change: MatCheckboxChange) {
    this.toDoChange.emit({
      ...toDo,
      status: change.checked,
    });
  }

  onDeleteChange(toDo: Todo) {
    this.toDoDelete.emit(toDo);
  }
}
