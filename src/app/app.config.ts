import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { I18nService, Lang } from './shared/i18n/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideAppInitializer(async () => {
      const i18n = inject(I18nService);
      const saved = (localStorage.getItem('lang') as Lang | null);
      const lang: Lang = (saved && (['it','en','es','pt'] as Lang[]).includes(saved)) ? saved : 'en';
      console.info('[i18n:init]', { saved, chosen: lang });
      await i18n.use(lang);
    }),
  ],
};
