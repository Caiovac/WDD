import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '../../shared/i18n/translate.pipe'; // 👈 pipe "t"

@Component({
  selector: 'app-streaming-section',
  standalone: true,
  imports: [NgIf, TranslatePipe],   // 👈 importa la pipe
  templateUrl: './streaming-section.html',
  styleUrls: ['./streaming-section.css']
})
export class StreamingSection {
  @Input() videoId: string = 'jeHNEfooias';

  // lascio opzionali così fai fallback alle traduzioni nel template
  @Input() title?: string;
  @Input() subtitle?: string;

  playerUrl!: SafeResourceUrl;
  watchUrl!: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const raw = `https://www.youtube-nocookie.com/embed/${this.videoId}?rel=0&modestbranding=1&playsinline=1`;
    this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(raw);
    this.watchUrl  = `https://www.youtube.com/watch?v=${this.videoId}`;
  }
}
