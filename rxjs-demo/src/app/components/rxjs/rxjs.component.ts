import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from '../../model';
import {toObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
  imports: [
    AsyncPipe,
    NgForOf,
    FormsModule,
  ],
})
export class RxjsComponent {
  newTodoTitle = '';
  todos: Observable<Todo[]>; // Observable statt Signal

  constructor(private appState: AppStateService) {
    this.todos = toObservable(this.appState.todosSignals);
  }

  loadTodos() {
    this.appState.loadTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        userId: 1,
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
      };
      this.appState.addTodo(newTodo);
      this.newTodoTitle = '';
    }
  }

  toggleTodoStatus(id: number) {
    this.appState.toggleTodoStatus(id);
  }

  deleteTodo(id: number) {
    this.appState.removeTodo(id);
  }
}
