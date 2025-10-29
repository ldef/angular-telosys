import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = 'api/brands';

  http = inject(HttpClient);

  /**
   * Get all brands with their companies
   */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  /**
   * Get brand by code
   */
  getBrand(code: string): Observable<Brand> {
    const url = `${this.apiUrl}/${code}`;
    return this.http.get<Brand>(url);
  }

  /**
   * Create a new brand
   */
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  /**
   * Update an existing brand
   */
  updateBrand(brand: Brand, ): Observable<Brand> {
    const url = `${this.apiUrl}/${brand.code}`;
    return this.http.put<Brand>(url, brand);
  }

  /**
   * Delete a brand
   */
  deleteBrand(code: string): Observable<void> {
    const url = `${this.apiUrl}/${code}`;
    return this.http.delete<void>(url);
  }
}