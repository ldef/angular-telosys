import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.html'
})
export class CompanyFormComponent {
  companyForm: FormGroup;
  isSubmitting = signal<boolean>(false);

  fb = inject(FormBuilder);
  companyService = inject(CompanyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  company = this.route.snapshot.data['company'];

  constructor() {
    this.companyForm = this.createForm();
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
    this.isSubmitting.set(true);

    const formValue = this.companyForm.value;
    const endpoint = this.company
      ? this.companyService.updateCompany({ ...formValue, id: this.company.id })
      : this.companyService.createCompany(formValue);

    endpoint.pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe(() => {
      this.router.navigate(['/companies']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/companies']);
  }
}