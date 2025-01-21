import { Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-signal',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
  todoText = '';

  constructor(public appState: AppStateService) {}

  toggleStatus(id: number) {
    this.appState.toggleTodoStatus(id);
  }

  remove(id: number) {
    this.appState.removeTodo(id);
  }
  addTodo() {
    if (this.todoText.trim()) {
      this.appState.addTodo({
        id: Date.now(),
        userId: 1, // Dummy-Wert
        title: this.todoText.trim(),
        completed: false,
      });
      this.todoText = '';
    }
  }
}
