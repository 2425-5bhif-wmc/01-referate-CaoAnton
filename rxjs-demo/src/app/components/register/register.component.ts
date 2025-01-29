import {Component, computed, inject, model, OnInit, signal} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {produce} from "immer";
import {set} from "../../model/model";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  store = inject(StoreService).store
  todoService = inject(TodoService)
  onNameChanged(value: string) {
    set(model => { model.name = value})
  }

  onEmailChanged(value: string) {
    set(model => { model.email = value})
  }

  ngOnInit(): void {
    const count = signal(2);
    const squared = computed(() => count() * count()); // Quadrat berechnen

    console.log(squared()); // 4
    count.set(3);
    console.log(squared()); // 9
  }
}
