import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { CompaniesComponent } from "./list/companies";
import { CompanyFormComponent } from "./form/company-form";
import { Company } from "./company";
import { CompanyService } from "./company.service";
import { inject } from "@angular/core";

export const companyResolver: ResolveFn<Company> = (route: ActivatedRouteSnapshot) => {
  const service = inject(CompanyService);
  const companyId = route.paramMap.get('id')!;
  return service.getCompany(Number(companyId));
};

export const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: 'edit/:id', component: CompanyFormComponent, resolve: { company: companyResolver } }
];