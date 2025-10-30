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
  isEditMode = false;
  isSubmitting = false;

  fb = inject(FormBuilder);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  company = this.route.snapshot.data['company'];

  ngOnInit(): void {
    this.companyForm = this.createForm();
    this.isEditMode = !!this.company;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [this.company?.name || '', [
        Validators.required,
        Validators.maxLength(20)
      ]]
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const formValue = this.companyForm.value;
    const endpoint = this.isEditMode
      ? this.companyService.updateCompany({ ...formValue, id: this.company.id })
      : this.companyService.createCompany(formValue);

    endpoint.subscribe(() => {
      this.isSubmitting = false;
      this.router.navigate(['/companies']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/companies']);
  }
}