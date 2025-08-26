import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
    DialogService,
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
  ]
};
