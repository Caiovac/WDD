import { Component, OnInit }                from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { filter }                           from 'rxjs/operators';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule }    from '@angular/material/list';
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';


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
export class NavBar implements OnInit {
  menuItems: MenuItem[] = [];
  isHandset = false;
  opened = true; // Aperto di default su desktop

  // **QUI dentro la classe!**
  private stdItems: MenuItem[] = [
    { label: 'Home',      link: '/std/home' },
    { label: 'Our Story', link: '/std/our-story' },
    { label: 'Regali',    link: '/std/regali' },
  ];

  private prmItems: MenuItem[] = [
    { label: 'Home',      link: '/prm/home' },
    { label: 'Our Story', link: '/prm/our-story' },
    { label: 'Regali',    link: '/prm/regali' },
    { label: 'Itinerario', link: '/prm/itinerario' },
    { label: 'Menu',       link: '/prm/menu' },
    { label: 'Gallery',    link: '/prm/gallery' },
  ];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    // Responsive: true se mobile/tablet, false se desktop
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        this.opened = !this.isHandset; // Chiudi di default su mobile, apri su desktop
      });

    // Menù dinamico (uguale a prima)
    const updateMenu = (url: string) => {
      this.menuItems = url.startsWith('/prm')
        ? this.prmItems
        : this.stdItems;
    };

    updateMenu(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const activeUrl = e.urlAfterRedirects || e.url;
        updateMenu(activeUrl);
      });
  }
}
