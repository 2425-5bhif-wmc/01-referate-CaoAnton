import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  todos = this.appState.todos;

  constructor(private appState: AppStateService) {}

  loadTodos() {
    this.appState.loadTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo = {
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
