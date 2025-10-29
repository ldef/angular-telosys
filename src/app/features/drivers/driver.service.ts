import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readonly apiUrl = 'api/drivers';

  http = inject(HttpClient);

  /**
   * Get all drivers
   */
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  /**
   * Get driver by ID
   */
  getDriver(id: number): Observable<Driver> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Driver>(url);
  }

  /**
   * Create a new driver
   */
  createDriver(driver: Omit<Driver, 'id'>): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  /**
   * Update an existing driver
   */
  updateDriver(driver: Driver): Observable<Driver> {
    const url = `${this.apiUrl}/${driver.id}`;
    return this.http.put<Driver>(url, driver);
  }

  /**
   * Delete a driver
   */
  deleteDriver(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
