import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Model, Todo } from '../model';
import { initial } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // Single Source of Truth als Signal
  private state = signal<Model>(initial);

  // Computed Signals für Selektoren
  readonly todosSignals = computed(() => this.state().todos);
  readonly userNameSignal = computed(() => this.state().name);
  readonly userEmailSignal = computed(() => this.state().email);
  readonly completedTodosSignal = computed(() =>
    this.state().todos.filter((todo) => todo.completed)
  );
  readonly activeTodosSignal = computed(() =>
    this.state().todos.filter((todo) => !todo.completed)
  );

  constructor(private http: HttpClient) {}

  // Zustand aktualisieren
  private updateState(recipe: (state: Model) => Model) {
    this.state.set(recipe(this.state()));
  }

  updateUser(name: string, email: string) {
    this.updateState((state) => ({
      ...state,
      name,
      email,
    }));
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
    console.log('Lädt Todos?', this.state().todosLoaded);

    if (!this.state().todosLoaded) {
      this.http
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=20')
        .subscribe((todos) => {
          this.updateState((state) => ({
            ...state,
            todos,
            todosLoaded: true, // ✅ Speichere den Status im State!
          }));
        });
    }
  }
}
