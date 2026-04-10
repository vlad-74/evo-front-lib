import { NgModule } from '@angular/core';
import {EvoThemeClassDirective} from './directives/evo-theme-class.directive';
import {NgExchangeSubscribeComponent} from './evo/exchange/ng-exchange-subscribe.component';

@NgModule({
  declarations: [EvoThemeClassDirective, NgExchangeSubscribeComponent],
  imports: [
  ],
  exports: [
      EvoThemeClassDirective,
  ]
})
export class EvoLibModule { }
