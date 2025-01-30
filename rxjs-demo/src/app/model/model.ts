import {Todo} from "./todo";
import {signal} from "@angular/core";

export interface Model {
  readonly firstName: string
  readonly lastName: string
  readonly todos: Todo[]
  readonly todosLoaded: boolean;
}

export const initial: Model =
{
  firstName: "Candice",
  lastName: "Oleg",
  todos: [],
  todosLoaded: false
}
export const store = signal<Model>(initial); // <.>
