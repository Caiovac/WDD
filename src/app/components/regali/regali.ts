import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';
import { I18nService } from '../../shared/i18n/i18n.service';
import { Subscription } from 'rxjs';

type Idea = { id: 'viaggio' | 'cena' | 'casa'; img: string };

@Component({
  selector: 'app-regali',
  standalone: true,
  templateUrl: './regali.html',
  styleUrls: ['./regali.css'],
  imports: [CommonModule, FormsModule, TranslatePipe],
})
export class Regali implements OnDestroy {
  // === DATI VOSTRI ===
  beneficiary = 'Monica Tatiana Mantilla Doce';
  bankName    = 'Banca Popolare di Sondrio';
  ibanRaw     = 'IT02J0569611009CCI000114942'; // <-- SOSTITUISCI
  qrSrc       = '/assets/qr-iban-fake.png'; // opzionale
  amounts     = [30, 50, 100, 200];

  // === IDEE === (solo id: il testo viene dal JSON)
  ideas: Idea[] = [
    { id: 'viaggio', img: '/assets/viaggio.jpg' },
    { id: 'cena',    img: '/assets/cena.jpg' },
    { id: 'casa',    img: '/assets/casa.jpg' },
  ];

  // === Stato selezioni ===
  selectedIdeaId: Idea['id'] | null = null;
  customIdeaEnabled = false;
  customIdea = '';

  selectedAmount: number | null = null;
  customAmountEnabled = false;
  customAmount: number | null = null;

  // === UI ===
  cause = '';                 // verrà impostata in constructor
  showQr = false;
  toastVisible = false;
  toastMessage = '';

  private sub?: Subscription;

  constructor(private i18n: I18nService) {
    // init messaggi e causale in base alla lingua
    this.toastMessage = this.i18n.t('gifts.toast.copied');
    this.updateCause();

    // quando cambia lingua, aggiorna testi runtime (causale, toast, etc.)
    this.sub = this.i18n.lang$.subscribe(() => {
      this.toastMessage = this.i18n.t('gifts.toast.copied');
      this.updateCause();
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  // IBAN formattato 4-4-4…
  get formattedIban(): string {
    return this.ibanRaw.toUpperCase().replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  // ====== Interazioni ======
  pickIdea(it: Idea){
    this.selectedIdeaId = it.id;
    this.customIdeaEnabled = false;
    this.customIdea = '';
    this.updateCause();
  }

  enableCustomIdea(){
    this.customIdeaEnabled = true;
    this.selectedIdeaId = null;
    this.updateCause();
  }

  pickAmount(val: number){
    this.selectedAmount = val;
    this.customAmountEnabled = false;
    this.customAmount = null;
    this.updateCause();
  }

  enableCustomAmount(){
    this.customAmountEnabled = true;
    this.selectedAmount = null;
    this.updateCause();
  }

  updateCause(){
    const base = this.i18n.t('gifts.defaultCause');

    const ideaText = this.customIdeaEnabled
      ? (this.customIdea ?? '').trim()
      : (this.selectedIdeaId ? this.i18n.t('gifts.ideas.' + this.selectedIdeaId) : '');

    const amountVal = this.customAmountEnabled
      ? (this.customAmount ?? 0)
      : (this.selectedAmount ?? 0);

    const ideaPart   = ideaText ? ` — ${ideaText}` : '';
    const amountPart = amountVal > 0 ? ` — €${Math.round(amountVal)}` : '';

    this.cause = `${base}${ideaPart}${amountPart}`;
  }

  // ====== Azioni utili ======
  copy(text: string){
    navigator.clipboard.writeText(text).then(() => this.showToast(this.i18n.t('gifts.toast.copied')));
  }

  copyFull(){
    const lines = [
      `${this.i18n.t('gifts.fields.beneficiary')}: ${this.beneficiary}`,
      `${this.i18n.t('gifts.fields.iban')}: ${this.formattedIban}`,
      `${this.i18n.t('gifts.fields.bank')}: ${this.bankName}`,
      `${this.i18n.t('gifts.fields.cause')}: ${this.cause}`
    ];
    this.copy(lines.join('\n'));
  }

  toggleQr(){ this.showQr = !this.showQr; }

  private showToast(msg: string){
    this.toastMessage = msg;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 1600);
  }
}
