import { Component, HostListener } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryModule, NgStyle],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  images = [
    new ImageItem({ src: '/foto1.png', thumb: '/foto1.png' }),
    new ImageItem({ src: '/assets/foto2.jpg', thumb: '/assets/foto2.jpg' }),
    new ImageItem({ src: '/assets/foto3.jpg', thumb: '/assets/foto3.jpg' })
  ];
  parallax: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Parallax lento: la posizione Y è 30% della scroll
    this.parallax = window.scrollY * 0.3;
  }
}
