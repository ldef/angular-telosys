import { Routes } from "@angular/router";
import { DriversComponent } from "./list/drivers.component";
import { DriverFormComponent } from "./form/driver-form.component";

export const routes: Routes = [
  { path: '', component: DriversComponent },
  { path: 'new', component: DriverFormComponent }
];