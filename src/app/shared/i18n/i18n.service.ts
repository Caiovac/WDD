// src/app/shared/i18n/i18n.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export type Lang = 'it' | 'en' | 'es' | 'pt';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private langSubject = new BehaviorSubject<Lang>('it');
  private dictSubject = new BehaviorSubject<Record<string, any>>({});

  readonly lang$ = this.langSubject.asObservable();
  readonly dict$ = this.dictSubject.asObservable();

  // cache dei dizionari già caricati
  private cache: Record<Lang, Record<string, any>> = {} as any;

  constructor(private http: HttpClient) {}

  get lang(): Lang { return this.langSubject.value; }

  async use(lang: Lang): Promise<void> {
    // carica dalla cache se già presente
    if (this.cache[lang]) {
      this.dictSubject.next(this.cache[lang]);
      this.langSubject.next(lang);
      document.documentElement.lang = lang;
      return;
    }

    const url = `/assets/i18n/${lang}.json`; // assoluto dalla root
    try {
      const dict = await firstValueFrom(this.http.get<Record<string, any>>(url));
      this.cache[lang] = dict ?? {};
      this.dictSubject.next(this.cache[lang]);
      this.langSubject.next(lang);
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      console.info(`[i18n] loaded ${lang}: ${Object.keys(this.cache[lang]).length} top-level keys`);
      // Precarica IT come fallback (una volta sola)
      if (lang !== 'it' && !this.cache['it']) { void this.preload('it'); }
    } catch (err) {
      console.warn('[i18n] failed to load', url, err);
      this.cache[lang] = {};
      this.dictSubject.next(this.cache[lang]);
      this.langSubject.next(lang);
    }
  }

  t(key: string, params?: Record<string, any>): string {
    const cur = this.cache[this.lang] ?? {};
    let raw = this.resolve(cur, key);
    // fallback su IT se la chiave non esiste nella lingua corrente
    if (raw == null && this.cache['it']) {
      raw = this.resolve(this.cache['it'], key);
    }
    if (raw == null) {
      this.debugMissing(key);
      return key;
    }
    return typeof raw === 'string' ? this.interpolate(raw, params) : String(raw);
  }

  // ---------- helpers ----------
  private async preload(lang: Lang) {
    const url = `/assets/i18n/${lang}.json`;
    try {
      const dict = await firstValueFrom(this.http.get<Record<string, any>>(url));
      this.cache[lang] = dict ?? {};
      console.info(`[i18n] preloaded ${lang}`);
    } catch (e) {
      console.warn('[i18n] preload failed', lang, e);
    }
  }

  private resolve(obj: any, path: string) {
    return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);
  }

  private interpolate(str: string, params?: Record<string, any>): string {
    if (!params) return str;
    return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (params[k] ?? ''));
  }

  private debugMissing(key: string) {
    const mark = '__missing_keys__';
    // @ts-expect-error attach debug set
    if (!this[mark]) this[mark] = new Set<string>();
    // @ts-expect-error
    const s: Set<string> = this[mark];
    if (!s.has(key)) {
      console.debug(`[i18n] missing key in ${this.lang} (and IT):`, key);
      s.add(key);
    }
  }
}
