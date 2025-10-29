import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandsComponent implements OnInit {
  brands = signal<Brand[]>([]);
  loading = signal(true);

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
      this.brandService.deleteBrand(code).subscribe(() => {
        const currentBrands = this.brands();
        this.brands.set(currentBrands.filter(brand => brand.code !== code));
      });
    }
  }
}