import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StoreService} from "./services/store.service";
import {TodoService} from "./services/todo.service";
import {AppStateService} from "./services/app-state.service";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  state = inject(AppStateService);
}
