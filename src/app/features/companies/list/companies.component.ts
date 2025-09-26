import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [CommonModule, RouterLink],
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
  companies = signal<Company[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  companyService = inject(CompanyService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {    
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies.set(companies);
      this.loading.set(false);
    });
  }

  editCompany(id: number): void {
    this.router.navigate(['/companies/edit', id]);
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(id).pipe(
        catchError((error) => {
          this.error.set(error.message || 'Failed to delete company');
          console.error('Error deleting company:', error);
          throw error;
        })
      ).subscribe(() => {
        const currentCompanies = this.companies();
        this.companies.set(currentCompanies.filter(company => company.id !== id));
      });
    }
  }
}