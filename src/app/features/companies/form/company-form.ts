import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.html'
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup = null!;
  companyId: number | null = null;
  isEditMode = false;
  isSubmitting = false;

  fb = inject(FormBuilder);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.companyForm = this.createForm();
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.companyId = +id;
      this.isEditMode = true;
      this.loadCompany(this.companyId);
    }
  }

  private loadCompany(id: number): void {
    this.companyService.getCompany(id).subscribe((company) => {
      this.companyForm.patchValue(company);
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.companyForm.value;
      const endpoint = this.isEditMode
        ? this.companyService.updateCompany({ ...formValue, id: this.companyId })
        : this.companyService.createCompany(formValue);

      endpoint.subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/companies']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/companies']);
  }
}