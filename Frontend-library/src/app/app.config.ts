import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // avoid using the fetch-based client because its responses run
      // outside the Angular zone by default, preventing change
      // detection from firing until another UI event occurs.
      // withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
