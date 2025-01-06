import {inject, Injectable} from '@angular/core';
import {Todo} from "../model/todo";
import {set} from "../model/model";
import {HttpClient} from "@angular/common/http";
import {StoreService} from "./store.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  store = inject(StoreService).store
  httpClient = inject(HttpClient)

  // async findAll() {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/todos")
  //   const todos: Todo[] = await response.json()
  //   //console.log("Todo's loaded", todos)
  //   set(model => {
  //     model.todos = todos
  //   })
  // }

  // async findAll() {
  //   this.httpClient.get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .subscribe(todos => {
  //       set(model => {
  //         model.todos = todos
  //       })
  //     })
  //   console.log("findAll: ",this.store.value.todos.length)
  // Problem: console.log wird aufgerufen, sobald request abgesetzt ist und nicht
  //          erst nachdem Daten erhalten wurden -> typischer Fehler in Angular

  async findAll() {
    const todos = await lastValueFrom(
      this.httpClient.get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    )
    set(model => {
      model.todos = todos
    })
    console.log("findAll: ", this.store.value.todos.length)
  }

}
