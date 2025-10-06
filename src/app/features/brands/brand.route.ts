import { Routes } from "@angular/router";
import { BrandsComponent } from "./list/brands.component";
import { BrandFormComponent } from "./form/brand-form.component";

export const routes: Routes = [
  { path: '', component: BrandsComponent },
  { path: 'new', component: BrandFormComponent },
  { path: 'edit/:code', component: BrandFormComponent }
];