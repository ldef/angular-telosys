import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-drivers',
  imports: [CommonModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit {
  drivers = signal<Driver[]>([]);
  loading = signal(true);

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {    
    this.driverService.getDrivers().subscribe((drivers) => {
      this.drivers.set(drivers);
      this.loading.set(false);
    });
  }
}
