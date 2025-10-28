import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { I18nService } from './i18n.service';

@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private last = '';

  constructor(private i18n: I18nService, cdr: ChangeDetectorRef) {
    this.sub = combineLatest([this.i18n.lang$, this.i18n.dict$]).subscribe(() => cdr.markForCheck());
  }

  transform(key: string, params?: Record<string, any>): string {
    if (!key) return '';
    this.last = this.i18n.t(key, params);
    return this.last;
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }
}
