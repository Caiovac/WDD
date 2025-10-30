import { Component, HostListener } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

// 👇 importa la pipe (aggiusta il path se diverso)
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryModule, RouterModule, MatButtonModule, TranslatePipe], // ⬅️ aggiunta la pipe
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private router: Router) {}

  images = [
    new ImageItem({ src: '/assets/foto1.png', thumb: '/assets/foto1.png' }),
    new ImageItem({ src: '/assets/foto2.jpg', thumb: '/assets/foto2.jpg' }),
    new ImageItem({ src: '/assets/foto3.jpg', thumb: '/assets/foto3.jpg' })
  ];

  parallax = 0;
  @HostListener('window:scroll', []) onWindowScroll(){ this.parallax = window.scrollY * 0.3; }

  // opzionale per saveDate/address:
  // eventDate = '22 November 2025';
  // eventPlace = 'Warehouse, via Feltre 32, Milano';

  // prefisso dinamico: /prm o /std
  get basePrefix(): 'prm' | 'std' {
    const seg = (this.router.url.split(/[?#]/)[0].split('/').filter(Boolean)[0]) || 'std';
    return seg === 'prm' ? 'prm' : 'std';
  }
}
