import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {TodoComponent} from "./components/todo/todo.component";
import {ExampleComponent} from "./components/example/example.component";
import {SignalComponent} from "./components/signal/signal.component";
import {RxjsComponent} from "./components/rxjs/rxjs.component";

export const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  {path: "register", component: RegisterComponent},
  {path: "rxjs", component: RxjsComponent},
  {path: "example", component: ExampleComponent},
  {path: "signal", component: SignalComponent}
];
