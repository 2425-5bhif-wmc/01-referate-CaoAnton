import {BehaviorSubject} from "rxjs";
import {Draft, produce} from "immer";
import {Todo} from "./todo";

export interface Model { // <.>
  readonly name: string
  readonly email: string
  readonly todos: Todo[]
}

export const initial: Model = // <.>
{
  name: "Dave",
  email: "Lewakaslehna",
  todos: [],
}
export const store = new BehaviorSubject<Model>(initial) // <.>

export function set(recipe: (model: Draft<Model>) => void){ // <.>
  const nextModel = produce(store.getValue(), recipe)
  store.next(nextModel)
}
