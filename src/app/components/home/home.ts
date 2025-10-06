import { Component, HostListener } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryModule, RouterModule, MatButtonModule], // ⬅️ aggiunto
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private router: Router) {}

  images = [
    new ImageItem({ src: '/foto1.png', thumb: '/foto1.png' }),
    new ImageItem({ src: '/assets/foto2.jpg', thumb: '/assets/foto2.jpg' }),
    new ImageItem({ src: '/assets/foto3.jpg', thumb: '/assets/foto3.jpg' })
  ];

  parallax = 0;
  @HostListener('window:scroll', []) onWindowScroll(){ this.parallax = window.scrollY * 0.3; }

  // prefisso dinamico: /prm o /std
  get basePrefix(): 'prm' | 'std' {
    const seg = (this.router.url.split(/[?#]/)[0].split('/').filter(Boolean)[0]) || 'std';
    return seg === 'prm' ? 'prm' : 'std';
  }
}
