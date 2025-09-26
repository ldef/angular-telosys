import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from './company';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ApiService {
  private readonly apiUrl = 'api/companies';

  http = inject(HttpClient);

  /**
   * Get all companies
   */
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get company by ID
   */
  getCompany(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create a new company
   */
  createCompany(company: Omit<Company, 'id'>): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing company
   */
  updateCompany(company: Company): Observable<Company> {
    const url = `${this.apiUrl}/${company.id}`;
    return this.http.put<Company>(url, company)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a company
   */
  deleteCompany(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}