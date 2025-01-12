import {Component, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {produce} from "immer";
import {set} from "../../model/model";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  store = inject(StoreService).store
  todoService = inject(TodoService)
  onNameChanged(value: string) {
    set(model => { model.name = value})
  }

  onEmailChanged(value: string) {
    set(model => { model.email = value})
  }
}
