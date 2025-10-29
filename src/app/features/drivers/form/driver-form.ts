import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../driver.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.html'
})
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup = null!;
  submitError: string | null = null;
  driverId: number | null = null;
  isEditMode = false;
  isSubmitting = false;

  fb = inject(FormBuilder);
  driverService = inject(DriverService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.driverForm = this.createForm();
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.driverId = +id;
      this.isEditMode = true;
      this.loadDriver(this.driverId);
    }
  }

  private loadDriver(id: number): void {
    this.driverService.getDriver(id).subscribe((driver) => {
      const birthDate = new Date(driver.birthDate).toISOString().substring(0, 10);
      this.driverForm.patchValue({ ...driver, birthDate });
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      birthDate: ['', [
        Validators.required
      ]],
      certified: [false]
    });
  }

  onSubmit(): void {
    if (this.driverForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = null;

      const formValue = this.driverForm.value;
      formValue.birthDate = new Date(formValue.birthDate);
      const endpoint = this.isEditMode
        ? this.driverService.updateDriver({ ...formValue, id: this.driverId })
        : this.driverService.createDriver(formValue);

      endpoint.pipe(
        catchError((error) => {
          this.isSubmitting = false;
          this.submitError = error.message || 'An error occurred while submitting the form.';
          console.error('Error submitting form:', error);
          throw error;
        })
      ).subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/drivers']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/drivers']);
  }
}