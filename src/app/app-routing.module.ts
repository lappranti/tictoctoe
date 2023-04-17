import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameStartComponent } from './game-start/game-start.component';
import { GameGuard } from './shared/game.guard';

const routes: Routes = [
  { path: 'menu', component: GameMenuComponent },
  { path: 'start', component: GameStartComponent, canActivate: [GameGuard] },
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
