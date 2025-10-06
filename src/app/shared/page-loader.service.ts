// src/app/shared/page-loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageLoaderService {
  private _active = new BehaviorSubject(false);
  active$ = this._active.asObservable();

  private startedAt = 0;
  private minMs = 2200;
  private fallback?: any;

  show(minMs = 2200, maxMs = 4000) {
    this.minMs = minMs;
    this.startedAt = performance.now();
    if (this.fallback) clearTimeout(this.fallback);
    this._active.next(true);
    document.documentElement.classList.add('loading-lock');
    document.body.classList.add('loading-lock');
    this.fallback = setTimeout(() => this.forceHide(), maxMs);
  }

  hide() {
    const elapsed = performance.now() - this.startedAt;
    const wait = Math.max(0, this.minMs - elapsed);
    setTimeout(() => this.forceHide(), wait);
  }

  private forceHide() {
    if (this.fallback) { clearTimeout(this.fallback); this.fallback = undefined; }
    this._active.next(false);
    document.documentElement.classList.remove('loading-lock');
    document.body.classList.remove('loading-lock');
  }
}
