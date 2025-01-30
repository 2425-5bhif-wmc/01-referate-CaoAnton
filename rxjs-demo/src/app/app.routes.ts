import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {ExampleComponent} from "./components/example/example.component";
import {SignalComponent} from "./components/signal/signal.component";

export const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  {path: "register", component: RegisterComponent},
  {path: "example", component: ExampleComponent},
  {path: "signal", component: SignalComponent}
];
