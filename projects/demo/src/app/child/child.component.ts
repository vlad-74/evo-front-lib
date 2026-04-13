import {Component, OnDestroy} from '@angular/core';
import {NgExchangeSubscribeComponent} from 'evo-lib';

@Component({
  selector: 'evo-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent extends NgExchangeSubscribeComponent implements OnDestroy{
    private static readonly extendsClassName =  'ChildComponent';
    public txt = 'Исходный текст!!!';

    public constructor() {
        super(ChildComponent.extendsClassName);
    }

    public exchChangeText(arg: string): void {
        this.txt = arg;
    }


    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
