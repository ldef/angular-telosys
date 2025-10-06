import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html'
})
export class BrandsComponent implements OnInit {
  brands = signal<Brand[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  brandService = inject(BrandService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {    
    this.brandService.getBrands().subscribe((brands) => {
      this.brands.set(brands);
      this.loading.set(false);
    });
  }

  editBrand(code: string): void {
    this.router.navigate(['/brands/edit', code]);
  }

  deleteBrand(code: string): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(code).pipe(
        catchError((error) => {
          this.error.set(error.message || 'Failed to delete brand');
          console.error('Error deleting brand:', error);
          throw error;
        })
      ).subscribe(() => {
        const currentBrands = this.brands();
        this.brands.set(currentBrands.filter(brand => brand.code !== code));
      });
    }
  }
}