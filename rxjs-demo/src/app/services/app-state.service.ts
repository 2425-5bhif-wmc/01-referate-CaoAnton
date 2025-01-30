import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Model, Todo } from '../model';
import { initial } from '../model/model';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=20';

  // Single Source of Truth als Signal
  // <.>
  private state = inject(StoreService).store

  // Computed Signals für Selektoren
  //<.>
  readonly todosSignals = computed(() => this.state().todos);
  readonly firstName = computed(() => this.state().firstName);
  readonly lastName = computed(() => this.state().lastName);

  constructor(private http: HttpClient) {}

  // Zustand aktualisieren
  // <.>
  updateState(recipe: (state: Model) => Model) {
    this.state.update(recipe);
  }

  addTodo(todo: Todo) {
    this.updateState((state) => ({
      ...state,
      todos: [...state.todos, todo],
    }));
  }

  toggleTodoStatus(id: number) {
    this.updateState((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  }

  removeTodo(id: number) {
    this.updateState((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  }

  loadTodos() {
    if (!this.state().todosLoaded) {
      this.http
        .get<Todo[]>(this.API_URL)
        .subscribe((todos) => {
          this.updateState((state) => ({
            ...state,
            todos,
            todosLoaded: true,
          }));
        });
    }
  }
}
