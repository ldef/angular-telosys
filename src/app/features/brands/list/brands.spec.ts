import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsComponent } from './brands';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('BrandsComponent', () => {
  let component: BrandsComponent;
  let fixture: ComponentFixture<BrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsComponent],
      providers: [provideHttpClient(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});