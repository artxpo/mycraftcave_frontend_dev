import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Output() toDoChange = new EventEmitter<Partial<Todo>>();

  name: UntypedFormControl;

  private unsubscribe = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.name = new UntypedFormControl();
    this.name.valueChanges
      .pipe(debounceTime(200), takeUntil(this.unsubscribe))
      .subscribe((value) => this.toDoChange.emit({ name: value }));
  }
}
