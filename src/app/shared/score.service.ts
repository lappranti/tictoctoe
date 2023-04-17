import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private readonly localStorageKey = 'ticTacToeScore';
  private score: { [key: string]: number } = {};

  constructor() {}

  private loadScore(): void {
    const storedScore = localStorage.getItem(this.localStorageKey);
    if (storedScore) {
      this.score = JSON.parse(storedScore);
    }
  }

  private saveScore(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.score));
  }

  private updateScore(player: string, result: 'you' | 'draw' | 'cpu'): void {
    if (!this.score[player]) {
      this.score[player] = 0;
    }

    if (result === 'you') {
      this.score[player]++;
    } else if (result === 'draw') {
      this.score[player] += 0.5;
    }

    this.saveScore();
  }
}
