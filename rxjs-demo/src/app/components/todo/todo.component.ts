import {Component, inject, OnInit} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {distinctUntilChanged, map} from "rxjs";
import {Todo} from "../../model";
import {AsyncPipe} from "@angular/common";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo',
  imports: [
    AsyncPipe
  ],
  templateUrl: './todo.component.html',
  standalone: true,
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoService = inject(TodoService)
  viewModel = inject(StoreService)
    .store
    .pipe(
      map(model => model.todos),
      distinctUntilChanged()
    )
  loadTodos() {
    this.todoService.findAll()
  }

}
