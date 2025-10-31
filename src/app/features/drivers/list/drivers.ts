import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { DriverService } from '../driver.service';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-drivers',
  imports: [CommonModule, RouterLink],
  templateUrl: './drivers.html'
})
export class DriversComponent {
  driverService = inject(DriverService);
  router = inject(Router);

  loading = signal(true);
  private refresh$ = new BehaviorSubject<void>(undefined);

  drivers = this.refresh$.pipe(
    tap(() => this.loading.set(true)),
    switchMap(() => this.driverService.getDrivers().pipe(
      finalize(() => this.loading.set(false))
    )),
  );

  editDriver(id: number): void {
    this.router.navigate(['/drivers/edit', id]);
  }

  deleteDriver(id: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }
}
