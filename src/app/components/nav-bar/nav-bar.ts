import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

// Material
import { MatSidenavModule, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// i18n zero-lib
import { I18nService, Lang } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule, LayoutModule,
    TranslatePipe
  ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  menuItems: MenuItem[] = [];
  isHandset = false;
  opened = true;

  currentLang: Lang = 'it';       // viene aggiornato dalla subscribe
  private i18nSub?: Subscription;  // (teniamo anche una sub diretta)
  private destroy$ = new Subject<void>();

  private stdItems: MenuItem[] = [
    { label: 'nav.home',     link: '/std/home' },
    { label: 'nav.ourStory', link: '/std/our-story' },
    { label: 'nav.gifts',    link: '/std/regali' },
    { label: 'nav.streaming', link: '/std/streaming' },

  ];

  private prmItems: MenuItem[] = [
    { label: 'nav.home',     link: '/prm/home' },
    { label: 'nav.ourStory', link: '/prm/our-story' },
    { label: 'nav.gifts',    link: '/prm/regali' },
    { label: 'nav.streaming', link: '/prm/streaming' },
    { label: 'nav.itinerary', link: '/prm/itinerario' },
    // { label: 'nav.gallery',   link: '/prm/gallery' },
  ];

  private static readonly MOBILE_QUERY = '(max-width: 959.98px)';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private i18n: I18nService
  ) {}

  ngOnInit() {
    // segui la lingua scelta dall'AppInitializer / utente (NO use() qui)
    this.i18nSub = this.i18n.lang$.subscribe(l => (this.currentLang = l));

    // responsive sidenav
    const m = window.matchMedia(NavBar.MOBILE_QUERY).matches;
    this.isHandset = m;
    this.opened = !m;

    this.breakpointObserver
      .observe([NavBar.MOBILE_QUERY])
      .pipe(takeUntil(this.destroy$))
      .subscribe(s => {
        this.isHandset = s.matches;
        this.opened = !this.isHandset;
      });

    // aggiorna voci menu in base al prefisso rotta (/prm | /std)
    const updateMenu = (url: string) => {
      this.menuItems = url.startsWith('/prm') ? this.prmItems : this.stdItems;
    };
    updateMenu(this.router.url);

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((e: NavigationEnd) => {
        const activeUrl = e.urlAfterRedirects || e.url;
        updateMenu(activeUrl);
      });
  }

  ngAfterViewInit() {
    // scroll to top ad ogni navigazione
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const el = this.content.getElementRef().nativeElement as HTMLElement;
        el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.i18nSub?.unsubscribe();
  }

  // cambio lingua solo su click
  async setLang(lang: Lang) {
    if (lang !== this.currentLang) {
      await this.i18n.use(lang);
    }
  }
  flagFor(l: string): string {
    switch (l) {
      case 'it': return '🇮🇹';
      case 'pt': return '🇵🇹';
      case 'es': return '🇪🇸';
      case 'en': return '🇬🇧';
      default:   return '🏳️';
    }
  }
}
