import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { DriversComponent } from './drivers';
import { DriverService } from '../driver.service';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;
  let driverService: DriverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers: [provideHttpClient(), provideRouter([]), DriverService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    driverService = TestBed.inject(DriverService);
    driverService.getDrivers = jasmine.createSpy().and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
