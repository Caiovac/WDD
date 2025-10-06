import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-page-loader',
  standalone: true,
  templateUrl: './page-loader.html',
  styleUrl: './page-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoaderComponent {
  @Input() active = false;
}
