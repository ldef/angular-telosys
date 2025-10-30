import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Company } from '../../companies/company';
import { CompanyService } from '@features/companies/company.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand-form.html'
})
export class BrandFormComponent implements OnInit {
  brandForm: FormGroup = null!;
  isEditMode = false;
  isSubmitting = false;

  loading = signal(true);

  fb = inject(FormBuilder);
  brandService = inject(BrandService);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brand: Brand = this.route.snapshot.data['brand'];
  companies: Company[] = this.route.snapshot.data['company'];

  ngOnInit(): void {
    this.brandForm = this.createForm();
    this.isEditMode = !!this.brand;
    this.loading.set(false);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      code: [this.brand?.code || '', [
        Validators.required,
        Validators.maxLength(3)
      ]],
      name: [this.brand?.name || '', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      companyId: [this.brand?.company.id || '', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    if (this.brandForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.brandForm.getRawValue(); // getRawValue to include disabled fields
      const selectedCompany = this.companies.find(c => c.id === +formValue.companyId);

      if (!selectedCompany) {
        this.isSubmitting = false;
        return;
      }

      let endpoint;
        const data: Brand = {
          id: this.brand?.id,
          code: formValue.code,
          name: formValue.name,
          company: selectedCompany
        };
      if (this.isEditMode) {
        endpoint = this.brandService.updateBrand(data);
      } else {
        endpoint = this.brandService.createBrand(data);
      }

      endpoint.subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/brands']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/brands']);
  }
}