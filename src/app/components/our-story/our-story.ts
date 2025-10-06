import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.html',
  styleUrl: './our-story.css'
})
export class OurStory implements AfterViewInit, OnDestroy {
  showBackTop = false;
  private scroller: HTMLElement | Window = window;
  private onScrollHandler = () => {
    const y = this.scroller instanceof Window
      ? (window.scrollY || document.documentElement.scrollTop)
      : this.scroller.scrollTop;
    // rientra nella zona Angular per aggiornare la view
    this.zone.run(() => this.showBackTop = y > 380);
  };

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    // prova a usare il contenitore di Angular Material
    const el = document.querySelector('.mat-sidenav-content') as HTMLElement | null;
    if (el) this.scroller = el;

    // ascolta lo scroll del target giusto
    this.scroller.addEventListener('scroll', this.onScrollHandler, { passive: true });
    // inizializza lo stato (se sei già in basso)
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
