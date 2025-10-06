import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Company } from '../../companies/company';
import { catchError, forkJoin } from 'rxjs';
import { CompanyService } from '@features/companies/company.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand-form.component.html'
})
export class BrandFormComponent implements OnInit {
  brandForm: FormGroup = null!;
  submitError: string | null = null;
  brandCode: string | null = null;
  isEditMode = false;
  isSubmitting = false;

  companies = signal<Company[]>([]);
  loading = signal(true);

  fb = inject(FormBuilder);
  brandService = inject(BrandService);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.brandForm = this.createForm();

    // Check if we're in edit mode
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.brandCode = code;
      this.isEditMode = true;
    }

    // Load companies and brand data if in edit mode
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const companies = this.companyService.getCompanies();
    const brand = this.isEditMode ? this.brandService.getBrand(this.brandCode!) : null;

    if (brand) {
      forkJoin({ companies, brand }).subscribe(({ companies, brand }) => {
        this.companies.set(companies);
        this.populateForm(brand);
        this.loading.set(false);
      });
    } else {
      companies.subscribe((companies) => {
        this.companies.set(companies);
        this.loading.set(false);
      });
    }
  }

  private populateForm(brand: Brand): void {
    this.brandForm.patchValue({
      code: brand.code,
      name: brand.name,
      companyId: brand.company.id
    });

    // In edit mode, disable the code field since it's the primary key
    if (this.isEditMode) {
      this.brandForm.get('code')?.disable();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      code: ['', [
        Validators.required,
        Validators.maxLength(3)
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      companyId: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    if (this.brandForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = null;

      const formValue = this.brandForm.getRawValue(); // getRawValue to include disabled fields
      const selectedCompany = this.companies().find(c => c.id === +formValue.companyId);

      if (!selectedCompany) {
        this.submitError = 'Selected company not found';
        this.isSubmitting = false;
        return;
      }

      let endpoint;
      if (this.isEditMode) {
        const updateData: Brand = {
          code: formValue.code,
          name: formValue.name,
          company: selectedCompany
        };
        endpoint = this.brandService.updateBrand(updateData);
      } else {
        const createData: Brand = {
          code: formValue.code.toUpperCase(), // Convert to uppercase for consistency
          name: formValue.name,
          company: selectedCompany
        };
        endpoint = this.brandService.createBrand(createData);
      }

      endpoint.pipe(
        catchError((error) => {
          this.isSubmitting = false;
          this.submitError = error.message || 'An error occurred while submitting the form.';
          console.error('Error submitting form:', error);
          throw error;
        })
      ).subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/brands']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/brands']);
  }
}