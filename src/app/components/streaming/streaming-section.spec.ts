import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-streaming-section',
  standalone: true,
  templateUrl: './streaming-section.html',
  styleUrls: ['./streaming-section.css']
})
export class StreamingSection {
  @Input() videoId!: string;
  @Input() title = 'Diretta';    
  @Input() previewOnly = false;

  thumbUrl = '';
  watchUrl = '';
  showPlayer = false;
  playerUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.videoId) {
      console.warn('[StreamingSection] manca videoId');
      return;
    }
    this.thumbUrl = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
    this.watchUrl = `https://www.youtube.com/watch?v=${this.videoId}`;
  }

  onThumbError() {
    this.thumbUrl = `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  play() {
    if (this.previewOnly) return;
    const url =
      `https://www.youtube-nocookie.com/embed/${this.videoId}` +
      `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showPlayer = true;
  }
}
