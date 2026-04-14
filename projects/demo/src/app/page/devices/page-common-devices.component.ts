import { Component, Input, Inject, OnDestroy } from '@angular/core';
import { NgExchangeSubscribeComponent, IScreenInfo, ScreenEnum, OrientationScreenEnum } from 'evo-lib';

@Component({
    selector: 'evo-page-common-devices',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            overflow: hidden;
        }
    `]
})
export class PageCommonDevicesComponent extends NgExchangeSubscribeComponent implements OnDestroy  {
    @Input() screenInfo!: IScreenInfo;
    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    ScreenEnum = ScreenEnum;
    OrientationScreenEnum = OrientationScreenEnum;

    public constructor(@Inject(String) extendsClassName: string) {
        super(extendsClassName);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
