// src/app/app.ts
import { Component, signal, inject } from '@angular/core';
import { RouterModule, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter } from 'rxjs/operators';

import { NavBar } from './components/nav-bar/nav-bar';
import { PageLoaderComponent } from './components/page-loader/page-loader';
import { PageLoaderService } from './shared/page-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,          // router-outlet / routerLink
    AsyncPipe,             // per usare | async nel template
    NavBar,                // la tua navbar
    PageLoaderComponent    // il loader cuoricini
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('WDD');

  // stream booleano per mostrare/nascondere il loader
  loader$ = inject(PageLoaderService).active$;

  constructor() {
    const router = inject(Router);
    const loader = inject(PageLoaderService);

    // mostra all'inizio di ogni navigazione (min 2.2s)
    router.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => loader.show(2200)); // metti 3000 per ~3s fissi

    // nascondi a navigazione conclusa/annullata/errore
    router.events.pipe(filter(e =>
      e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError
    ))
    .subscribe(() => loader.hide());
  }
}
