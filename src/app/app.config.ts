import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockService } from '@shared/mock';
import { errorsInterceptor } from '@core/interceptors/errors.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorsInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Mock backend
    importProvidersFrom(InMemoryWebApiModule.forRoot(MockService, { delay: 1000 }))
  ]
};
