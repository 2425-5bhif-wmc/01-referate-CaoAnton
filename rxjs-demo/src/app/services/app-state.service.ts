import {computed, Injectable, signal} from '@angular/core';
import {Model, Todo} from "../model";
import {initial} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Zentraler Zustand als Signal
  private _state = signal<Model>(initial);

  readonly todos = computed(() => this._state().todos);
  readonly userName = computed(() => this._state().name);
  readonly userEmail = computed(() => this._state().email);
  readonly completedTodos = computed(() =>
    this._state().todos.filter(todo => todo.completed)
  );
  readonly activeTodos = computed(() =>
    this._state().todos.filter(todo => !todo.completed)
  );

  updateUser(name: string, email: string) {
    this._state.update(state => ({
      ...state,
      name,
      email,
    }));
  }
  addTodo(todo: Todo) {
    this._state.update(state => ({
      ...state,
      todos: [...state.todos, todo],
    }));
  }

  toggleTodoStatus(id: number) {
    this._state.update(state => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  }

  removeTodo(id: number) {
    this._state.update(state => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }
}
