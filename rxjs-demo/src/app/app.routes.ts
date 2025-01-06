import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {TodoComponent} from "./components/todo/todo.component";

export const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "todo", component: TodoComponent}
];
