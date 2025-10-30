import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.html'
})
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup = null!;
  isEditMode = false;
  isSubmitting = false;

  fb = inject(FormBuilder);
  driverService = inject(DriverService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  driver = this.route.snapshot.data['driver'];

  ngOnInit(): void {
    this.driverForm = this.createForm();
    this.isEditMode = !!this.driver;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [this.driver?.firstName || '', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      lastName: [this.driver?.lastName || '', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      birthDate: [this.driver?.birthDate || '', [
        Validators.required
      ]],
      certified: [false]
    });
  }

  onSubmit(): void {
    if (this.driverForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.driverForm.value;
      formValue.birthDate = new Date(formValue.birthDate);
      const endpoint = this.isEditMode
        ? this.driverService.updateDriver({ ...formValue, id: this.driver.id })
        : this.driverService.createDriver(formValue);

      endpoint.subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/drivers']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/drivers']);
  }
}