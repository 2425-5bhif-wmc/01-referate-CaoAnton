import {computed, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Model, Todo} from '../model';
import { initial } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // Single Source of Truth
  private stateSubject = new BehaviorSubject<Model>(initial);

  // RxJS Observables (Selectors)
  readonly todos: Observable<Todo[]> = this.stateSubject.pipe(
    map((state) => state.todos),
    distinctUntilChanged()
  );
  readonly userName$: Observable<string> = this.stateSubject.pipe(
    map((state) => state.name),
    distinctUntilChanged()
  );
  readonly userEmail$: Observable<string> = this.stateSubject.pipe(
    map((state) => state.email),
    distinctUntilChanged()
  );
  readonly completedTodos$: Observable<Todo[]> = this.todos.pipe(
    map((todos) => todos.filter((todo) => todo.completed))
  );
  readonly activeTodos$: Observable<Todo[]> = this.todos.pipe(
    map((todos) => todos.filter((todo) => !todo.completed))
  );

  // Signals (abgeleitet aus RxJS)
  private stateSignal = signal(this.stateSubject.getValue());
  readonly todosSignals = computed(() => this.stateSignal().todos);
  readonly userNameSignal = computed(() => this.stateSignal().name);
  readonly userEmailSignal = computed(() => this.stateSignal().email);
  readonly completedTodosSignal = computed(() =>
    this.stateSignal().todos.filter((todo) => todo.completed)
  );
  readonly activeTodosSignal = computed(() =>
    this.stateSignal().todos.filter((todo) => !todo.completed)
  );

  constructor(private http: HttpClient) {
    // Synchronisiere Signal bei Änderungen im BehaviorSubject
    this.stateSubject.subscribe((state) => this.stateSignal.set(state));
  }

  // Zustand aktualisieren
  private updateState(recipe: (state: Model) => Model) {
    const newState = recipe(this.stateSubject.getValue());
    this.stateSubject.next(newState);
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
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .subscribe((todos) => {
        this.updateState((state) => ({
          ...state,
          todos,
        }));
      });
  }
}
