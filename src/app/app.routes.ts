import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout.component';
import { HomeComponent } from '@features/home/home.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'drivers', loadChildren: () => import('@features/drivers/driver.route').then(m => m.routes) },
    ]
  }
];
