import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit {
  currentPlayer: string = 'O';
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.setChoix({ isSolo: true, currentPlayer: '' });
  }

  onChooseJeton(choice: string) {
    this.currentPlayer = choice.toUpperCase();
    let element = document.getElementById(choice);
    element?.classList.contains('choosen')
      ? ''
      : (document.querySelector('.choosen')?.classList.remove('choosen'),
        element?.parentElement?.classList.add('choosen'));
  }

  onGoToStart(isSolo: boolean) {
    this.gameService.setChoix({
      isSolo: isSolo,
      currentPlayer: this.currentPlayer
    });
    this.router.navigate(['/start']);
  }
}
