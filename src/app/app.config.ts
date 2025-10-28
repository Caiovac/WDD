// src/app/app.config.ts
import { ApplicationConfig, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { I18nService } from './shared/i18n/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimations(),
    provideHttpClient(withFetch()),

    // ✅ nuova API (niente deprecazione) + injection diretta
    provideAppInitializer(async () => {
      const i18n = inject(I18nService);
      const saved = (localStorage.getItem('lang') as any) || 'it';
      const lang: 'it'|'en'|'es'|'pt' = (['it','en','es','pt'] as const).includes(saved) ? saved : 'it';
      await i18n.use(lang);
    }),
  ],
};
