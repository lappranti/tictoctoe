import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {
  choix!: any;
  modal: boolean = false;

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer!: string;
  winner: string = 'O';
  player!: string;
  cpuPlayer!: string;
  isFirstMove!: boolean;

  player1: string = 'X';
  player2: string = 'O';

  isGameEnd: boolean = false;
  message!: string;

  //Score

  x: number = 0;
  o: number = 0;
  draw: number = 0;

  constructor(private gameService: GameService, private router: Router) {}
  ngOnInit(): void {
    this.initilizeJetons();
  }

  initilizeJetons() {
    this.currentPlayer = 'X';
    this.winner = '';
    this.isFirstMove = true;
    this.choix = this.gameService.getChoix();

    this.cpuPlayer =
      this.gameService.getChoix().currentPlayer === 'X' ? 'O' : 'X';
    this.player = this.gameService.getChoix().currentPlayer;

    if (this.player == 'O' && this.choix.isSolo) {
      this.makeComputerMove();
    }
  }

  makeMove(row: number, col: number) {
    if (this.choix.isSolo) {
      if (this.board[row][col] === '') {
        this.board[row][col] = this.currentPlayer;
        console.log(this.board[row][col]);

        if (this.checkWin(this.currentPlayer)) {
          this.winner = this.currentPlayer;
          console.log('you win !');
        } else if (this.checkDraw()) {
          this.winner = 'Draw';
          console.log('Match nul !');
        } else {
          if (this.isFirstMove && this.currentPlayer === this.cpuPlayer) {
            this.currentPlayer = this.player;
            this.isFirstMove = false;
          } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
          }
          if (this.currentPlayer === this.cpuPlayer) {
            setTimeout(() => {
              this.makeComputerMove();
            }, 500);
          }
        }
        this.checkEnd();
      }
    } else {
      const currentPlayer = this.currentPlayer;

      if (this.board[row][col] === '') {
        this.board[row][col] = currentPlayer;

        if (this.checkWin(currentPlayer)) {
          this.winner = currentPlayer;
        } else if (this.checkDraw()) {
          this.winner = 'Draw';
        } else {
          this.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
      this.checkEnd();
    }
  }

  /* makeComputerMove() {
    let bestScore = -Infinity;
    let move;

    // Recherche du meilleur mouvement possible
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Si la case est vide, on simule un mouvement du CPU et on évalue son score
        if (this.board[i][j] === '') {
          this.board[i][j] = this.cpuPlayer;
          let score = this.minimax(0, false);
          this.board[i][j] = '';

          // Si le score est meilleur que le meilleur score actuel, on met à jour le meilleur score et le mouvement optimal
          if (score > bestScore) {
            bestScore = score;
            move = { row: i, col: j };
          }
        }
      }
    }

    // Effectue le mouvement optimal
    if (move) {
      this.board[move.row][move.col] = this.cpuPlayer;
      if (this.checkWin(this.cpuPlayer)) {
        this.winner = this.cpuPlayer;
      } else if (this.checkDraw()) {
        this.winner = 'Draw';
      } else {
        this.currentPlayer = this.player;
      }
    }
  }*/

  makeComputerMove() {
    setTimeout(() => {
      let bestScore = -Infinity;
      let move;
      if (
        this.isFirstMove &&
        (this.cpuPlayer === 'X' || this.cpuPlayer === 'x')
      ) {
        // Choose a random move for the first move
        const randomRow = Math.floor(Math.random() * 3);
        const randomCol = Math.floor(Math.random() * 3);
        move = { row: randomRow, col: randomCol };
        this.board[randomRow][randomCol] = this.cpuPlayer;
        this.isFirstMove = false;
      } else {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === '') {
              this.board[i][j] = this.cpuPlayer;
              let score = this.minimax(0, false, 2);
              this.board[i][j] = '';
              if (score > bestScore) {
                bestScore = score;
                move = { row: i, col: j };
              }
            }
          }
        }
      }
      if (move) this.board[move.row][move.col] = this.cpuPlayer;
      this.currentPlayer = this.player;
      this.checkEnd();
    }, Math.random() * 500 + 500); // pause aléatoire entre 500 et 1000 millisecondes
  }

  minimax(depth: number, isMaximizing: boolean, maxDepth: number): number {
    // arrêter la recherche si la profondeur maximale est atteinte
    if (depth >= maxDepth) {
      return 0;
    }
    if (this.checkWin(this.cpuPlayer)) {
      // Si le CPU gagne, retourne un score positif en fonction de la profondeur
      return 10 - depth;
    } else if (this.checkWin(this.player)) {
      // Si le joueur gagne, retourne un score négatif en fonction de la profondeur
      return depth - 10;
    } else if (this.checkDraw()) {
      // Si c'est un match nul, retourne un score nul
      return 0;
    }

    if (isMaximizing) {
      // Si c'est le tour du CPU, cherche le meilleur score en maximisant
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            this.board[i][j] = this.cpuPlayer;
            let score = this.minimax(depth + 1, false, 2);
            this.board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      // Si c'est le tour du joueur, cherche le meilleur score en minimisant
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            this.board[i][j] = this.player;
            let score = this.minimax(depth + 1, true, 2);
            this.board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  checkWin(player: string): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === player &&
        this.board[i][1] === player &&
        this.board[i][2] === player
      ) {
        return true;
      }
      if (
        this.board[0][i] === player &&
        this.board[1][i] === player &&
        this.board[2][i] === player
      ) {
        return true;
      }
    }
    if (
      this.board[0][0] === player &&
      this.board[1][1] === player &&
      this.board[2][2] === player
    ) {
      return true;
    }
    if (
      this.board[0][2] === player &&
      this.board[1][1] === player &&
      this.board[2][0] === player
    ) {
      return true;
    }
    return false;
  }

  checkDraw(): boolean {
    if (this.checkWin('X') || this.checkWin('O')) {
      return false;
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  }

  reset() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.initilizeJetons();
  }

  checkEnd() {
    if (this.choix.isSolo) {
      if (this.checkWin(this.cpuPlayer)) {
        console.log('La machine a gagné !');
        this.scoreAndMessage(this.cpuPlayer, 'OH NO, YOU LOST…');
        return true;
      } else if (this.checkWin(this.player)) {
        console.log('Vous avez gagné !');
        this.scoreAndMessage(this.player, 'YOU WON!');
        return true;
      } else if (this.checkDraw()) {
        console.log('Match nul !');
        this.scoreAndMessage('', 'DRAW');
        return true;
      } else {
        console.log('Le jeu continue.');
      }
      return false;
    } else {
      console.log('MultiPlayer');

      if (this.checkWin(this.player1)) {
        console.log(`Congratulations, Player 1 wins!`);
        this.scoreAndMessage(this.player1, 'Congratulations, Player 1 wins!');
        return true;
      } else if (this.checkWin(this.player2)) {
        console.log(`Congratulations, Player 2 wins!`);

        this.scoreAndMessage(this.player2, 'Congratulations, Player 2 wins!');
        return true;
      } else if (this.checkDraw()) {
        console.log('Match null');
        this.scoreAndMessage('', 'DRAW');
        return true;
      } else {
        console.log('Le jeu continue !');
      }
      return false;
    }
  }

  scoreAndMessage(player: string, message: string) {
    this.winner = player;
    this.isGameEnd = true;
    this.message = message;
    if (this.winner == 'X') {
      this.x++;
    } else if (this.winner == 'O') {
      this.o++;
    } else {
      this.draw++;
    }
  }

  onToggleModalRestart() {
    this.modal = !this.modal;
  }

  onCancel() {
    this.router.navigate(['/menu']);
  }

  onRestart() {
    this.modal = false;
    this.isGameEnd = false;
    this.reset();
  }

  format(row: number, cel: number) {
    return row + `` + cel;
  }
}
