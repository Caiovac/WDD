import { Component } from '@angular/core';
import { GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  images = [
    new ImageItem({ src: '/foto1.jpeg', thumb: '/foto1.jpeg' }),
    new ImageItem({ src: '/assets/foto2.jpg', thumb: '/assets/foto2.jpg' }),
    new ImageItem({ src: '/assets/foto3.jpg', thumb: '/assets/foto3.jpg' })
  ];
}
