import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const choix = this.gameService.getChoix();
    if (choix.isSolo && choix.currentPlayer === '') {
      // Si l'utilisateur n'a pas encore validé les choix, on ne lui permet pas d'accéder à la page Start
      this.router.navigate(['/menu']);
      return false;
    } else if (!choix.isSolo && choix.currentPlayer === '') {
      // Si l'utilisateur est en mode multijoueur et n'a pas encore choisi son jeton, on ne lui permet pas d'accéder à la page Start
      this.router.navigate(['/menu']);
      return false;
    } else if (state.url === '/menu') {
      // Si l'utilisateur navigue vers la page Menu, on vide le localStorage
      localStorage.removeItem('choix');
    }
    return true;
  }
}
