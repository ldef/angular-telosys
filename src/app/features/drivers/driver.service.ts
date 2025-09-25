import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Driver } from './driver';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService extends ApiService {
  private readonly apiUrl = 'api/drivers';

  http = inject(HttpClient);

  /**
   * Get all drivers
   */
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get driver by ID
   */
  getDriver(id: number): Observable<Driver> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Driver>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create a new driver
   */
  createDriver(driver: Omit<Driver, 'id'>): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing driver
   */
  updateDriver(driver: Driver): Observable<Driver> {
    const url = `${this.apiUrl}/${driver.id}`;
    return this.http.put<Driver>(url, driver)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a driver
   */
  deleteDriver(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
