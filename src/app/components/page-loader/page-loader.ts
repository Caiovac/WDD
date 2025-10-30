import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  templateUrl: './page-loader.html',
  styleUrls: ['./page-loader.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
})
export class PageLoaderComponent {
  @Input() active = false;

  /** Chiave i18n alternativa per il messaggio (default: 'loader.text') */
  @Input() messageKey?: string;

  /** Parametri opzionali per l’interpolazione */
  @Input() messageParams?: Record<string, any>;
}
