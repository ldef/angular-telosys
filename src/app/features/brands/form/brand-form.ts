import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '@features/companies/company.service';
import { finalize } from 'rxjs';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { Company } from '../../companies/company';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand-form.html'
})
export class BrandFormComponent {
  brandForm: FormGroup;
  isSubmitting = signal<boolean>(false);

  fb = inject(FormBuilder);
  brandService = inject(BrandService);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brand: Brand = this.route.snapshot.data['brand'];
  companies: Company[] = this.route.snapshot.data['companies'];

  constructor() {
    this.brandForm = this.createForm();
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
      company: [this.brand?.company || '', [
        Validators.required
      ]]
    });
  }

  compareCompanies(c1: Company, c2: Company): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit(): void {
    this.isSubmitting.set(true);
    const formValue = this.brandForm.getRawValue();

    let endpoint;
    if (this.brand) {
      endpoint = this.brandService.updateBrand({id: this.brand.id, ...formValue});
    } else {
      endpoint = this.brandService.createBrand(formValue);
    }

    endpoint.pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe(() => {
      this.router.navigate(['/brands']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/brands']);
  }
}