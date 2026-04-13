import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { EvoLibModule } from 'evo-lib';
import { ChildComponentComponent } from './child-component/child-component.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
      AppComponent,
      ChildComponentComponent
  ],
  imports: [
    BrowserModule, EvoLibModule, HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
