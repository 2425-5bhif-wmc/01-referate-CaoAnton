import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css'],
  imports: [
    FormsModule,
    NgForOf,
  ],
})
export class SignalComponent {
  newTodoTitle = '';
  todos = this.appState.todosSignals;

  constructor(private appState: AppStateService) {}

  loadTodos() {
    this.appState.loadTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.appState.addTodo({
        userId: 1,
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
      });
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
