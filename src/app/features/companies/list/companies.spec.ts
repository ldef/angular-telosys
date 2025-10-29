import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CompaniesComponent } from './companies';
import { CompanyService } from '../company.service';

describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesComponent],
      providers: [provideHttpClient(), provideRouter([]), CompanyService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);
    companyService.getCompanies = jasmine.createSpy().and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});