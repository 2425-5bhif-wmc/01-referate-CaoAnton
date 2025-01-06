import {Component, inject, OnInit} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {distinctUntilChanged, map} from "rxjs";
import {Todo} from "../../model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  //store = inject(StoreService).store
  viewModel = inject(StoreService)
    .store
    .pipe(
      map(model => model.todos),
      distinctUntilChanged()
    )

  ngOnInit() {
    // this.store.pipe(
    //   map(model => model.todos),
    //   distinctUntilChanged()
    // ).subscribe(todos => console.log("Todo-Component", todos))
  }
}
