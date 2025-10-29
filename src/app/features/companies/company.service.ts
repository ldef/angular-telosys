import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly apiUrl = 'api/companies';

  http = inject(HttpClient);

  /**
   * Get all companies
   */
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  /**
   * Get company by ID
   */
  getCompany(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  /**
   * Create a new company
   */
  createCompany(company: Omit<Company, 'id'>): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  /**
   * Update an existing company
   */
  updateCompany(company: Company): Observable<Company> {
    const url = `${this.apiUrl}/${company.id}`;
    return this.http.put<Company>(url, company);
  }

  /**
   * Delete a company
   */
  deleteCompany(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}