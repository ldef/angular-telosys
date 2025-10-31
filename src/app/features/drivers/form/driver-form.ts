import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../driver.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.html'
})
export class DriverFormComponent {
  driverForm: FormGroup = null!;
  isSubmitting = signal<boolean>(false);

  fb = inject(FormBuilder);
  driverService = inject(DriverService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  driver = this.route.snapshot.data['driver'];

  constructor() {
    this.driverForm = this.createForm();
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
    this.isSubmitting.set(true);

    const formValue = this.driverForm.value;
    formValue.birthDate = new Date(formValue.birthDate);
    const endpoint = this.driver
      ? this.driverService.updateDriver({ ...formValue, id: this.driver.id })
      : this.driverService.createDriver(formValue);

    endpoint.pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe(() => {
      this.router.navigate(['/drivers']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/drivers']);
  }
}