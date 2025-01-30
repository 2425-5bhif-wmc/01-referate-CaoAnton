import {Component, computed, inject, model, OnInit, signal} from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  state = inject(AppStateService)
  firstName = inject(AppStateService).firstName;
  lastName = inject(AppStateService).lastName;
  onFirstNameChanged(value: string) {
    this.state.updateState(state => ({
      ...state,
      firstName: value
    }));
  }

  onLastNameChanged(value: string) {
    this.state.updateState(state => ({
      ...state,
      lastName: value
    }));
  }
}
