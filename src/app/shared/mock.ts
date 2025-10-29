import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Driver } from '@features/drivers/driver';
import { Company } from '@features/companies/company';
import { Brand } from '@features/brands/brand';


@Injectable({
  providedIn: 'root',
})
export class MockService implements InMemoryDbService {
  createDb() {
    const drivers: Driver[] = [
        { id: 11, firstName: 'Dr IQ', lastName: 'Smith', birthDate: new Date('1990-01-01'), certified: true },
        { id: 12, firstName: 'Bombasto', lastName: 'Johnson', birthDate: new Date('1985-05-15'), certified: false },
        { id: 13, firstName: 'Celeritas', lastName: 'Williams', birthDate: new Date('1978-09-23'), certified: true },
        { id: 14, firstName: 'Magneta', lastName: 'Brown', birthDate: new Date('1992-11-30'), certified: false },
        { id: 15, firstName: 'RubberMan', lastName: 'Jones', birthDate: new Date('1988-07-07'), certified: true },
        { id: 16, firstName: 'Dynama', lastName: 'Garcia', birthDate: new Date('1995-03-12'), certified: true },
        { id: 17, firstName: 'Dr IQ', lastName: 'Miller', birthDate: new Date('1983-12-25'), certified: false },
        { id: 18, firstName: 'Magma', lastName: 'Davis', birthDate: new Date('1975-08-19'), certified: true },
        { id: 19, firstName: 'Tornado', lastName: 'Rodriguez', birthDate: new Date('1991-04-04'), certified: false },
    ];
    const companies: Company[] = [
      { id: 1, name: 'Stellantis' },
      { id: 2, name: 'General Motors' },
      { id: 3, name: 'Ford' },
      { id: 4, name: 'Porsche SE' }
    ];
    const brands: Brand[] = [
      { code: 'Pgt', name: 'Peugeot', company: companies[0] },
      { code: 'Cit', name: 'Citroën', company: companies[0] },
      { code: 'Che', name: 'Chevrolet', company: companies[1] },
      { code: 'Cad', name: 'Cadillac', company: companies[1] },
      { code: 'For', name: 'Ford', company: companies[2] },
      { code: 'Pse', name: 'Porsche', company: companies[3] }
    ];
    return {drivers, companies, brands};
  }

  // Overrides the genId method to ensure that a entity always has an id.
  // the method below returns the initial number (11).
  // if the entity array is not empty, the method below returns the highest
  // entity id + 1.
  genId(entity: any[]): number {
    return entity.length > 0 ? Math.max(...entity.map(e => e.id)) + 1 : 11;
  }
}