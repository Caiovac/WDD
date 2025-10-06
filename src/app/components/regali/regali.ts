import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Idea = { id: string; name: string; img: string };

@Component({
  selector: 'app-regali',
  standalone: true,
  templateUrl: './regali.html',
  styleUrls: ['./regali.css'],
  imports: [CommonModule, FormsModule],
})
export class Regali {
  // === DATI VOSTRI ===
  beneficiary = ' Monica Tatiana Mantilla Doce';
  bankName    = 'Banca Popolare di Sondrio';
  ibanRaw     = 'IT02J0569611009CCI000114942'; // <-- SOSTITUISCI
  defaultCause = 'Regalo matrimonio — Caio & Tatiana';
  qrSrc       = '/qr-iban-fake.png'; // opzionale
  amounts     = [30, 50, 100, 200];

  // === IDEE (mini immagine + nome) ===
  ideas: Idea[] = [
    { id: 'viaggio',  name: 'Viaggio Nozze', img: 'viaggio.jpg' },
    { id: 'cena',     name: 'Cena speciale',      img: 'cena.jpg' },
    { id: 'casa',      name: 'Casa',        img: 'casa.jpg' },
  ];

  // === Stato selezioni ===
  selectedIdeaId: string | null = null;
  customIdeaEnabled = false;
  customIdea = '';

  selectedAmount: number | null = null;
  customAmountEnabled = false;
  customAmount: number | null = null;

  // === UI ===
  cause = this.defaultCause;
  showQr = false;
  toastVisible = false;
  toastMessage = 'Copiato!';

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
    const ideaText = this.customIdeaEnabled
      ? (this.customIdea ?? '').trim()
      : (this.selectedIdeaId
          ? (this.ideas.find(i => i.id === this.selectedIdeaId)?.name ?? '')
          : '');

    const amountVal = this.customAmountEnabled
      ? (this.customAmount ?? 0)
      : (this.selectedAmount ?? 0);

    const ideaPart   = ideaText ? ` — ${ideaText}` : '';
    const amountPart = amountVal > 0 ? ` — €${Math.round(amountVal)}` : '';

    this.cause = `${this.defaultCause}${ideaPart}${amountPart}`;
  }

  // ====== Azioni utili ======
  copy(text: string){
    navigator.clipboard.writeText(text).then(() => this.showToast('Copiato negli appunti'));
  }

  copyFull(){
    const all = [
      `Intestatario: ${this.beneficiary}`,
      `IBAN: ${this.formattedIban}`,
      `Banca: ${this.bankName}`,
      `Causale: ${this.cause}`,
    ].join('\n');
    this.copy(all);
  }

  toggleQr(){ this.showQr = !this.showQr; }

  private showToast(msg: string){
    this.toastMessage = msg;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 1600);
  }
}
