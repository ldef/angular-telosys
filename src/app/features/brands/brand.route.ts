import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { BrandsComponent } from "./list/brands";
import { BrandFormComponent } from "./form/brand-form";
import { Brand } from "./brand";
import { inject } from "@angular/core";
import { BrandService } from "./brand.service";
import { CompanyService } from "@features/companies/company.service";
import { Company } from "@features/companies/company";

export const brandResolver: ResolveFn<Brand> = (route: ActivatedRouteSnapshot) => {
  const service = inject(BrandService);
  const id = route.paramMap.get('id');
  return service.getBrand(Number(id));
};

export const companiesResolver: ResolveFn<Company[]> = () => {
  const service = inject(CompanyService);
  return service.getCompanies();
};

export const routes: Routes = [
  { path: '', component: BrandsComponent },
  { path: 'new', component: BrandFormComponent },
  { path: 'edit/:id', component: BrandFormComponent, resolve: { brand: brandResolver, company: companiesResolver } }
];