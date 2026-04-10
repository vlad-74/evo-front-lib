// commands/templates/page-data/common-devices.js

// language=TEXT
const getCommonDevicesTemplate = (componentName, className) => `import { Component, Input, Inject } from '@angular/core';
import { NgExchangeSubscribeComponent, IScreenInfo, ScreenEnum, OrientationScreenEnum } from 'evo-lib';

@Component({
    selector: 'evo-${componentName}',
    template: \`<ng-content></ng-content>\`,
    styles: [\`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            overflow: hidden;
        }
    \`]
})
export class ${className} extends NgExchangeSubscribeComponent implements OnDestroy  {
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
}`;

module.exports = {
    getCommonDevicesTemplate
};
