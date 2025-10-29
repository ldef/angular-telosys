import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { Driver } from '../driver';
import { DriverService } from '../driver.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-drivers',
  imports: [CommonModule, RouterLink],
  templateUrl: './drivers.html'
})
export class DriversComponent implements OnInit {
  drivers = signal<Driver[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  driverService = inject(DriverService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {    
    this.driverService.getDrivers().subscribe((drivers) => {
      this.drivers.set(drivers);
      this.loading.set(false);
    });
  }

  editDriver(id: number): void {
    this.router.navigate(['/drivers/edit', id]);
  }

  deleteDriver(id: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).pipe(
        catchError((error) => {
          this.error.set(error.message || 'Failed to delete driver');
          console.error('Error deleting driver:', error);
          throw error;
        })
      ).subscribe(() => {
        const currentDrivers = this.drivers();
        this.drivers.set(currentDrivers.filter(driver => driver.id !== id));
      });
    }
  }
}
