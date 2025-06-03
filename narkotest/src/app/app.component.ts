import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Element {
  symbol: string;
  name: string;
  mass: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Chemical Elements Parser';
  inputText = '';
  parsedElements: Element[] = [];
  unparsedText = '';

  // Słownik pierwiastków chemicznych z polskimi nazwami
  private elements: { [key: string]: Element } = {
    H: { symbol: 'H', name: 'Wodór', mass: 1.008 },
    He: { symbol: 'He', name: 'Hel', mass: 4.003 },
    Li: { symbol: 'Li', name: 'Lit', mass: 6.941 },
    Be: { symbol: 'Be', name: 'Beryl', mass: 9.012 },
    B: { symbol: 'B', name: 'Bor', mass: 10.811 },
    C: { symbol: 'C', name: 'Węgiel', mass: 12.011 },
    N: { symbol: 'N', name: 'Azot', mass: 14.007 },
    O: { symbol: 'O', name: 'Tlen', mass: 15.999 },
    F: { symbol: 'F', name: 'Fluor', mass: 18.998 },
    Ne: { symbol: 'Ne', name: 'Neon', mass: 20.18 },
    Na: { symbol: 'Na', name: 'Sód', mass: 22.99 },
    Mg: { symbol: 'Mg', name: 'Magnez', mass: 24.305 },
    Al: { symbol: 'Al', name: 'Glin', mass: 26.982 },
    Si: { symbol: 'Si', name: 'Krzem', mass: 28.086 },
    P: { symbol: 'P', name: 'Fosfor', mass: 30.974 },
    S: { symbol: 'S', name: 'Siarka', mass: 32.065 },
    Cl: { symbol: 'Cl', name: 'Chlor', mass: 35.453 },
    Ar: { symbol: 'Ar', name: 'Argon', mass: 39.948 },
    K: { symbol: 'K', name: 'Potas', mass: 39.098 },
    Ca: { symbol: 'Ca', name: 'Wapń', mass: 40.078 },
    Sc: { symbol: 'Sc', name: 'Skand', mass: 44.956 },
    Ti: { symbol: 'Ti', name: 'Tytan', mass: 47.867 },
    V: { symbol: 'V', name: 'Wanad', mass: 50.942 },
    Cr: { symbol: 'Cr', name: 'Chrom', mass: 51.996 },
    Mn: { symbol: 'Mn', name: 'Mangan', mass: 54.938 },
    Fe: { symbol: 'Fe', name: 'Żelazo', mass: 55.845 },
    Co: { symbol: 'Co', name: 'Kobalt', mass: 58.933 },
    Ni: { symbol: 'Ni', name: 'Nikiel', mass: 58.693 },
    Cu: { symbol: 'Cu', name: 'Miedź', mass: 63.546 },
    Zn: { symbol: 'Zn', name: 'Cynk', mass: 65.38 },
    Ga: { symbol: 'Ga', name: 'Gal', mass: 69.723 },
    Ge: { symbol: 'Ge', name: 'German', mass: 72.63 },
    As: { symbol: 'As', name: 'Arsen', mass: 74.922 },
    Se: { symbol: 'Se', name: 'Selen', mass: 78.971 },
    Br: { symbol: 'Br', name: 'Brom', mass: 79.904 },
    Kr: { symbol: 'Kr', name: 'Krypton', mass: 83.798 },
    Rb: { symbol: 'Rb', name: 'Rubid', mass: 85.468 },
    Sr: { symbol: 'Sr', name: 'Stront', mass: 87.62 },
    Y: { symbol: 'Y', name: 'Itr', mass: 88.906 },
    Zr: { symbol: 'Zr', name: 'Cyrkon', mass: 91.224 },
    Nb: { symbol: 'Nb', name: 'Niob', mass: 92.906 },
    Mo: { symbol: 'Mo', name: 'Molibden', mass: 95.95 },
    Tc: { symbol: 'Tc', name: 'Technet', mass: 98 },
    Ru: { symbol: 'Ru', name: 'Ruten', mass: 101.07 },
    Rh: { symbol: 'Rh', name: 'Rod', mass: 102.906 },
    Pd: { symbol: 'Pd', name: 'Pallad', mass: 106.42 },
    Ag: { symbol: 'Ag', name: 'Srebro', mass: 107.868 },
    Cd: { symbol: 'Cd', name: 'Kadm', mass: 112.411 },
    In: { symbol: 'In', name: 'Ind', mass: 114.818 },
    Sn: { symbol: 'Sn', name: 'Cyna', mass: 118.71 },
    Sb: { symbol: 'Sb', name: 'Antymon', mass: 121.76 },
    Te: { symbol: 'Te', name: 'Tellur', mass: 127.6 },
    I: { symbol: 'I', name: 'Jod', mass: 126.904 },
    Xe: { symbol: 'Xe', name: 'Ksenon', mass: 131.293 },
    Cs: { symbol: 'Cs', name: 'Cez', mass: 132.905 },
    Ba: { symbol: 'Ba', name: 'Bar', mass: 137.327 },
    La: { symbol: 'La', name: 'Lantan', mass: 138.905 },
    Ce: { symbol: 'Ce', name: 'Cer', mass: 140.116 },
    Pr: { symbol: 'Pr', name: 'Prazeodym', mass: 140.908 },
    Nd: { symbol: 'Nd', name: 'Neodym', mass: 144.242 },
    Pm: { symbol: 'Pm', name: 'Promet', mass: 145 },
    Sm: { symbol: 'Sm', name: 'Samar', mass: 150.36 },
    Eu: { symbol: 'Eu', name: 'Europ', mass: 151.964 },
    Gd: { symbol: 'Gd', name: 'Gadolin', mass: 157.25 },
    Tb: { symbol: 'Tb', name: 'Terb', mass: 158.925 },
    Dy: { symbol: 'Dy', name: 'Dysproz', mass: 162.5 },
    Ho: { symbol: 'Ho', name: 'Holm', mass: 164.93 },
    Er: { symbol: 'Er', name: 'Erb', mass: 167.259 },
    Tm: { symbol: 'Tm', name: 'Tul', mass: 168.934 },
    Yb: { symbol: 'Yb', name: 'Iterb', mass: 173.054 },
    Lu: { symbol: 'Lu', name: 'Lutet', mass: 174.967 },
    Hf: { symbol: 'Hf', name: 'Hafn', mass: 178.49 },
    Ta: { symbol: 'Ta', name: 'Tantal', mass: 180.948 },
    W: { symbol: 'W', name: 'Wolfram', mass: 183.84 },
    Re: { symbol: 'Re', name: 'Ren', mass: 186.207 },
    Os: { symbol: 'Os', name: 'Osm', mass: 190.23 },
    Ir: { symbol: 'Ir', name: 'Iryd', mass: 192.217 },
    Pt: { symbol: 'Pt', name: 'Platyna', mass: 195.084 },
    Au: { symbol: 'Au', name: 'Złoto', mass: 196.967 },
    Hg: { symbol: 'Hg', name: 'Rtęć', mass: 200.592 },
    Tl: { symbol: 'Tl', name: 'Tal', mass: 204.383 },
    Pb: { symbol: 'Pb', name: 'Ołów', mass: 207.2 },
    Bi: { symbol: 'Bi', name: 'Bizmut', mass: 208.98 },
    Po: { symbol: 'Po', name: 'Polon', mass: 209 },
    At: { symbol: 'At', name: 'Astat', mass: 210 },
    Rn: { symbol: 'Rn', name: 'Radon', mass: 222 },
    Fr: { symbol: 'Fr', name: 'Frans', mass: 223 },
    Ra: { symbol: 'Ra', name: 'Rad', mass: 226 },
    Ac: { symbol: 'Ac', name: 'Aktyn', mass: 227 },
    Th: { symbol: 'Th', name: 'Tor', mass: 232.038 },
    Pa: { symbol: 'Pa', name: 'Protaktyn', mass: 231.036 },
    U: { symbol: 'U', name: 'Uran', mass: 238.029 },
  };

  parseText(): void {
    if (!this.inputText.trim()) {
      this.parsedElements = [];
      this.unparsedText = '';
      return;
    }

    const text = this.inputText.trim().toLowerCase();
    const result = this.findOptimalElementSequence(text);

    this.parsedElements = result.elements;
    this.unparsedText = result.remaining;
  }

  private findOptimalElementSequence(text: string): {
    elements: Element[];
    remaining: string;
  } {
    const n = text.length;
    const used = new Array(n).fill(false);
    const foundElements: Element[] = [];

    // Algorytm zachłanny - najpierw próbujemy dwuznakowe symbole
    for (let i = 0; i < n - 1; i++) {
      if (used[i] || used[i + 1]) continue;

      const twoChar = text.substring(i, i + 2);
      const capitalizedTwoChar =
        twoChar.charAt(0).toUpperCase() + twoChar.charAt(1).toLowerCase();

      if (this.elements[capitalizedTwoChar]) {
        foundElements.push(this.elements[capitalizedTwoChar]);
        used[i] = true;
        used[i + 1] = true;
      }
    }

    // Potem próbujemy jednoznakowe symbole
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;

      const oneChar = text.charAt(i).toUpperCase();

      if (this.elements[oneChar]) {
        foundElements.push(this.elements[oneChar]);
        used[i] = true;
      }
    }

    // Zbieramy nieużyte znaki
    let remaining = '';
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        remaining += text.charAt(i);
      }
    }

    return {
      elements: foundElements,
      remaining: remaining.trim(),
    };
  }

  clearInput(): void {
    this.inputText = '';
    this.parsedElements = [];
    this.unparsedText = '';
  }
}
