import {Component, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {produce} from "immer";
import {set} from "../../model/model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  store = inject(StoreService).store

  onNameChanged(value: string) {
    // const nextModel = produce(this.store.getValue(), model => {
    //   model.name = value
    // })
    // this.store.next(nextModel)
    set(model => { model.name = value})
  }

  onEmailChanged(value: string) {
    set(model => { model.email = value})
  }
}
