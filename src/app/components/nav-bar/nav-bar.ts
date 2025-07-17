import { Component, OnInit }                from '@angular/core';
import { Router, NavigationEnd }            from '@angular/router';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { filter }                           from 'rxjs/operators';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit {
  menuItems: MenuItem[] = [];

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

  constructor(private router: Router) {}

  ngOnInit() {
    const updateMenu = (url: string) => {
      this.menuItems = url.startsWith('/prm')
        ? this.prmItems
        : this.stdItems;
    };

    // 1) Imposta subito il menu in base all'URL corrente
    updateMenu(this.router.url);

    // 2) Ogni volta che cambia rotta, ricomputa il menu
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // usa urlAfterRedirects per sicurezza
        const activeUrl = e.urlAfterRedirects || e.url;
        updateMenu(activeUrl);
      });
  }
}
