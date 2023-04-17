import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameStartComponent } from './game-start/game-start.component';

@NgModule({
  declarations: [
    AppComponent,
    GameMenuComponent,
    GameStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
