import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { DriversComponent } from "./list/drivers";
import { DriverFormComponent } from "./form/driver-form";
import { Driver } from "./driver";
import { DriverService } from "./driver.service";
import { inject } from "@angular/core";

export const driverResolver: ResolveFn<Driver> = (route: ActivatedRouteSnapshot) => {
  const service = inject(DriverService);
  const id = route.paramMap.get('id')!;
  return service.getDriver(Number(id));
};

export const routes: Routes = [
  { path: '', component: DriversComponent },
  { path: 'new', component: DriverFormComponent },
  { path: 'edit/:id', component: DriverFormComponent, resolve: { driver: driverResolver } }
];