import {BehaviorSubject} from "rxjs";
import {Draft, produce} from "immer";
import {Todo} from "./todo";

export interface Model { // <.>
  readonly name: string
  readonly email: string
  readonly todos: Todo[]
}

export const initial: Model =
{
  name: "Dave",
  email: "Lewakaslehna",
  todos: [
    {
      userId: 69,
      id: 3000,
      title: "Hello davedii",
      completed: false,
    }
  ]
}

const initialState: Model = { // <.>
  name: "John",
  email: "Pork",
  todos: []
}
export const store = new BehaviorSubject<Model>(initialState) // <.>

export function set(recipe: (model: Draft<Model>) => void){ // <.>
  const nextModel = produce(store.getValue(), recipe)
  store.next(nextModel)
}
