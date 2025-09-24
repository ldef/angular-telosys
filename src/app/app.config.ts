import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MockService } from '@shared/mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Mock backend
    importProvidersFrom(InMemoryWebApiModule.forRoot(MockService, { delay: 1000 })),
  ]
};
