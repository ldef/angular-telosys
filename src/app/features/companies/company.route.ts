import { Routes } from "@angular/router";
import { CompaniesComponent } from "./list/companies.component";
import { CompanyFormComponent } from "./form/company-form.component";

export const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: 'edit/:id', component: CompanyFormComponent }
];