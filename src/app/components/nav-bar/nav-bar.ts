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
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule, LayoutModule ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit, AfterViewInit {
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  menuItems: MenuItem[] = [];
  isHandset = false;
  opened = true;

  private stdItems: MenuItem[] = [
    { label: 'Home',   link: '/std/home' },
    { label: 'Storia', link: '/std/our-story' },
    { label: 'Regali', link: '/std/regali' },
  ];

 private prmItems: MenuItem[] = [
    { label: 'Home',      link: '/prm/home' },
    { label: 'Storia', link: '/prm/our-story' },
    { label: 'Regali',    link: '/prm/regali' },
    // { label: 'Itinerario', link: '/prm/itinerario' },
    // { label: 'Galleria',    link: '/prm/gallery' },
  ];

  private static readonly MOBILE_QUERY = '(max-width: 959.98px)';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

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
    // ogni volta che cambia rotta, riportiamo il vero scroller in alto
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const el = this.content.getElementRef().nativeElement as HTMLElement;
        el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        // opzionale: anche il body, nel caso qualche pagina usi window come scroller
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
  }
}
