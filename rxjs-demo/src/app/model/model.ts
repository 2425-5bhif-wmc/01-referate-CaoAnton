import {BehaviorSubject} from "rxjs";
import {Draft, produce} from "immer";
import {Todo} from "./todo";

export interface Model {
  readonly name: string
  readonly email: string
  readonly todos: Todo[]
}

const initialState: Model = {
  name: "Chris",
  email: "Doe",
  todos: []
}
export const store = new BehaviorSubject<Model>(initialState)

export function set(recipe: (model: Draft<Model>) => void){
  const nextModel = produce(store.getValue(), recipe)
  store.next(nextModel)
}
