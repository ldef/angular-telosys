import { Routes } from "@angular/router";
import { CompaniesComponent } from "./list/companies";
import { CompanyFormComponent } from "./form/company-form";

export const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: 'edit/:id', component: CompanyFormComponent }
];