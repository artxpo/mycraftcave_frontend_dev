import { Component, OnInit } from '@angular/core';
import { Todo } from './models/Todo';

import { TodoService } from './services/todo.service';

import { AccountService } from './services/accountservice.service';
import { Account } from './models/account';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Craft Cave';
  isAuthenticated!: boolean;
  user: User;
  
  account: Account;

  completeToDos: Todo[] = [];
  incompleteToDos: Todo[] = [];

  private _toDo: Partial<Todo>;

  constructor(private todoService: TodoService, 
    private accountService:AccountService,
    private socialAuth:SocialAuthService,
    private route: Router
    ) 
  {
    this.accountService.user.subscribe(x => this.user = x);
  }

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
  logout() {
    this.socialAuth.signOut();
    this.route.navigateByUrl("login");
}
}
