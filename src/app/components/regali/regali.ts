import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

type Config = {
  beneficiary: string;
  bankName: string;
  iban: string;   // raw, senza spazi
  defaultCause: string;
  qrImagePath?: string; // es: '/qr-iban.png' generato da te in locale
};

const CONFIG: Config = {
  beneficiary: 'Caio & Tatiana',
  bankName: 'Banca di Esempio',
  iban: 'IT60X0542811101000000123456', // <-- SOSTITUISCI CON IL TUO
  defaultCause: 'Regalo matrimonio – Caio & Tatiana',
  qrImagePath: '/qr-iban.png'          // opzionale: metti un PNG locale
};

@Component({
  selector: 'app-regali',
  standalone: true,
  templateUrl: './regali.html',
  styleUrls: ['./regali.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
})
export class Regali {

  beneficiary = CONFIG.beneficiary;
  bankName = CONFIG.bankName;
  ibanRaw = CONFIG.iban.toUpperCase().replace(/\s+/g, '');
  cause = CONFIG.defaultCause;

  amounts = [50, 100, 150, 200];
  showQr = false;
  qrSrc = CONFIG.qrImagePath ?? '';

  constructor(private snack: MatSnackBar){}

  get formattedIban(): string {
    return this.ibanRaw.replace(/(.{4})/g, '$1 ').trim();
  }

  pickAmount(val: number | null){
    this.cause = val
      ? `${CONFIG.defaultCause} – €${val}`
      : CONFIG.defaultCause;
  }

  copy(text: string){
    navigator.clipboard.writeText(text).then(() => {
      this.snack.open('Copiato negli appunti', 'OK', { duration: 1800 });
    });
  }

  copyFull(){
    const all = [
      `Intestatario: ${this.beneficiary}`,
      `IBAN: ${this.formattedIban}`,
      `Banca: ${this.bankName}`,
      `Causale: ${this.cause}`
    ].join('\n');
    this.copy(all);
  }

  toggleQr(){
    this.showQr = !this.showQr;
  }
}
