import { Routes } from '@angular/router';
import { Home }       from './components/home/home';
import { OurStory }   from './components/our-story/our-story';
import { Regali }     from './components/regali/regali';
import { Itinerario } from './components/itinerario/itinerario';
import { Menu }       from './components/menu/menu';
import { Gallery }    from './components/gallery/gallery';

export const routes: Routes = [
  // STANDARD (solo 3)
  { path: 'std/home',      component: Home },
  { path: 'std/our-story', component: OurStory },
  { path: 'std/regali',    component: Regali },

  // PREMIUM (tutte e 6)
  { path: 'prm/home',       component: Home },
  { path: 'prm/our-story',  component: OurStory },
  { path: 'prm/regali',     component: Regali },
  { path: 'prm/itinerario', component: Itinerario },
  { path: 'prm/menu',       component: Menu },
  { path: 'prm/gallery',    component: Gallery },

  // default / fallback
  { path: '',    redirectTo: 'std/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'std/home' }
];
