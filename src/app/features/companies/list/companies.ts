import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { CompanyService } from '../company.service';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [CommonModule, RouterLink],
  templateUrl: './companies.html'
})
export class CompaniesComponent {
  companyService = inject(CompanyService);
  router = inject(Router);

  loading = signal(true);
  private refresh$ = new BehaviorSubject<void>(undefined);

  companies = this.refresh$.pipe(
    tap(() => this.loading.set(true)),
    switchMap(() => this.companyService.getCompanies().pipe(
      finalize(() => this.loading.set(false))
    )),
  );

  editCompany(id: number): void {
    this.router.navigate(['/companies/edit', id]);
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.loading.set(true);
      this.companyService.deleteCompany(id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }
}