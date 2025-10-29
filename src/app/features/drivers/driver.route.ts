import { Routes } from "@angular/router";
import { DriversComponent } from "./list/drivers";
import { DriverFormComponent } from "./form/driver-form";

export const routes: Routes = [
  { path: '', component: DriversComponent },
  { path: 'new', component: DriverFormComponent },
  { path: 'edit/:id', component: DriverFormComponent }
];