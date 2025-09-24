import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '../driver.service';
import { Driver } from '../driver';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.component.html'
})
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private router: Router
  ) {
    this.driverForm = this.createForm();
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
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
      const newDriver: Omit<Driver, 'id'> = {
        firstName: formValue.firstName.trim(),
        lastName: formValue.lastName.trim(),
        birthDate: new Date(formValue.birthDate),
        certified: formValue.certified
      };

      this.driverService.createDriver(newDriver).pipe(
        catchError((error) => {
          console.error('Error creating driver:', error);
          this.submitError = error.message || 'An error occurred while creating the driver';
          this.isSubmitting = false;
          throw error;
        })).subscribe((createdDriver) => {
          console.log('Driver created successfully:', createdDriver);
          this.router.navigate(['/drivers']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/drivers']);
  }
}