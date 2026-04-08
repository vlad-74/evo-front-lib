import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { EvoLibModule } from 'evo-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      EvoLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
