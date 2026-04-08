import {Component, OnDestroy} from '@angular/core';
import {NgExchangeSubscribeComponent} from 'evo-lib';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent extends NgExchangeSubscribeComponent implements OnDestroy{
    private static readonly extendsClassName =  'ChildComponentComponent';
    public txt = 'Исходный текст!!!';

    public constructor() {
        super(ChildComponentComponent.extendsClassName);
    }

    public exchChangeText(arg: string): void {
        this.txt = arg;
    }


    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
