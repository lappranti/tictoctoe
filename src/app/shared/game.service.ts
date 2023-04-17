import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  choix = {
    isSolo: true,
    currentPlayer: ''
  };

  constructor() {
    this.loadChoix();
  }

  setChoix(choix: any) {
    this.choix = choix;
    localStorage.setItem('choix', JSON.stringify(this.choix));
  }

  getChoix() {
    return this.choix;
  }

  loadChoix() {
    const choixString = localStorage.getItem('choix');
    if (choixString) {
      this.choix = JSON.parse(choixString);
    }
  }
}
