import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-our-story',
  standalone: true,
  templateUrl: './our-story.html',
  styleUrls: ['./our-story.css'],
  imports: [TranslatePipe]
})
export class OurStory implements AfterViewInit, OnDestroy {
  showBackTop = false;
  private scroller: HTMLElement | Window = window;

  constructor(private zone: NgZone) {}

  private onScrollHandler = () => {
    const y = this.scroller instanceof Window
      ? (window.scrollY || document.documentElement.scrollTop)
      : this.scroller.scrollTop;

    this.zone.run(() => this.showBackTop = y > 380);
  };

  ngAfterViewInit() {
    const el = document.querySelector('.mat-sidenav-content') as HTMLElement | null;
    if (el) this.scroller = el;

    this.scroller.addEventListener('scroll', this.onScrollHandler, { passive: true });
    this.onScrollHandler();
  }

  ngOnDestroy() {
    this.scroller.removeEventListener('scroll', this.onScrollHandler as any);
  }

  scrollTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.scroller.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }
}
