import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Brand } from './brand';
import { Company } from '../companies/company';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends ApiService {
  private readonly apiUrl = 'api/brands';

  http = inject(HttpClient);

  /**
   * Get all brands with their companies
   */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get brand by code
   */
  getBrand(code: string): Observable<Brand> {
    const url = `${this.apiUrl}/${code}`;
    return this.http.get<Brand>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create a new brand
   */
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing brand
   */
  updateBrand(brand: Brand): Observable<Brand> {
    const url = `${this.apiUrl}/${brand.code}`;
    return this.http.put<Brand>(url, brand)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a brand
   */
  deleteBrand(code: string): Observable<void> {
    const url = `${this.apiUrl}/${code}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}