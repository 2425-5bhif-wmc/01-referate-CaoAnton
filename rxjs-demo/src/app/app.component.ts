import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StoreService} from "./services/store.service";
import {TodoService} from "./services/todo.service";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  store = inject(StoreService).store
  ngOnInit() {
    //this.todoService.findAll()
  }
}
