import { Component, signal } from '@angular/core';
// importa l’intero RouterModule (contiene RouterOutlet, RouterLink, RouterLinkActive...)
import { RouterModule }      from '@angular/router';
// importa il tuo NavBars (aggiusta il path se serve)
import { NavBar }           from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  standalone: true,             // dichiaralo standalone
  imports: [
    RouterModule,               // ← rende disponibili <router-outlet>, [routerLink], routerLinkActive
    NavBar                     // ← il tuo componente che include la sidebar + router-outlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']      // nota il plurale: styleUrls
})
export class App {
  protected readonly title = signal('WDD');
}
