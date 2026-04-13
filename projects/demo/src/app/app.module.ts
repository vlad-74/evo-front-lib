import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EvoLibModule } from 'evo-lib';
import { ChildComponentComponent } from './child-component/child-component.component';


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
