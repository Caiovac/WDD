import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

// Material
import { MatSidenavModule, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; // 👈 NEW
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';

// i18n zero-lib
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

interface MenuItem {
  label: string; // ora è una CHIAVE (es. 'nav.home')
  link: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule, LayoutModule,
    TranslatePipe // 👈 per usare | t nel template
  ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit, AfterViewInit {
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  menuItems: MenuItem[] = [];
  isHandset = false;
  opened = true;

  // 👇 lingua corrente (per il bottone)
  currentLang: 'it'|'en'|'es'|'pt' = 'it';

  // Usa le CHIAVI di traduzione del tuo JSON ("nav.*")
  private stdItems: MenuItem[] = [
    { label: 'nav.home',     link: '/std/home' },
    { label: 'nav.ourStory', link: '/std/our-story' },
    { label: 'nav.gifts',    link: '/std/regali' },
  ];

  private prmItems: MenuItem[] = [
    { label: 'nav.home',     link: '/prm/home' },
    { label: 'nav.ourStory', link: '/prm/our-story' },
    { label: 'nav.gifts',    link: '/prm/regali' },
    // { label: 'nav.itinerary', link: '/prm/itinerario' },
    // { label: 'nav.gallery',   link: '/prm/gallery' },
  ];

  private static readonly MOBILE_QUERY = '(max-width: 959.98px)';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private i18n: I18nService // 👈
  ) {
    this.currentLang = this.i18n.lang;
  }

  ngOnInit() {
    const m = window.matchMedia(NavBar.MOBILE_QUERY).matches;
    this.isHandset = m;
    this.opened = !m;

    this.breakpointObserver.observe([NavBar.MOBILE_QUERY]).subscribe(s => {
      this.isHandset = s.matches;
      this.opened = !this.isHandset;
    });

    const updateMenu = (url: string) => {
      this.menuItems = url.startsWith('/prm') ? this.prmItems : this.stdItems;
    };
    updateMenu(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const activeUrl = e.urlAfterRedirects || e.url;
        updateMenu(activeUrl);
      });
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const el = this.content.getElementRef().nativeElement as HTMLElement;
        el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
  }

  // 👇 cambia lingua dal menu
  async setLang(lang: 'it'|'en'|'es'|'pt') {
    await this.i18n.use(lang);
    this.currentLang = lang;
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
