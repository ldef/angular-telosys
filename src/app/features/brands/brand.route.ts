import { Routes } from "@angular/router";
import { BrandsComponent } from "./list/brands";
import { BrandFormComponent } from "./form/brand-form";

export const routes: Routes = [
  { path: '', component: BrandsComponent },
  { path: 'new', component: BrandFormComponent },
  { path: 'edit/:code', component: BrandFormComponent }
];