import {Component, OnInit} from '@angular/core';
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
export class SignalComponent implements OnInit{
  newTodoTitle = '';
  todos = this.appState.todosSignals;

  constructor(private appState: AppStateService) {}

  ngOnInit() {
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
