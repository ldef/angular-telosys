import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { BrandService } from '../brand.service';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandsComponent {
  brandService = inject(BrandService);
  router = inject(Router);

  loading = signal(true);
  private refresh$ = new BehaviorSubject<void>(undefined);

  brands = this.refresh$.pipe(
    tap(() => this.loading.set(true)),
    switchMap(() => this.brandService.getBrands().pipe(
      finalize(() => this.loading.set(false))
    )),
  );

  editBrand(id: number): void {
    this.router.navigate(['/brands/edit', id]);
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe(() => {
        this.refresh$.next();
      });
    }
  }
}