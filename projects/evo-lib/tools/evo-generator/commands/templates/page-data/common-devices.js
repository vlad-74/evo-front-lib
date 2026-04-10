// commands/templates/page-data/common-devices.js

const getCommonDevicesTemplate = (componentName, className) => `import { Component, Input, Inject } from '@angular/core';

import { NgExchangeSubscribeComponent } from '@evo-page/evo/core/_workers/_exchange/root/ng-exchange-subscribe.component';

import { OrientationScreenEnum, ScreenEnum } from '@evo-page/evo/core/_workers/support/screen/screen.enum';
import { IScreenInfo } from "@evo-page/evo/core/_workers/support/screen/screen.interfaces";
import { DataOperation } from '@evo-page/evo/core/_workers/_data/data.worker';

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
export class ${className} extends NgExchangeSubscribeComponent {
    @Input() screenLighthouse: IScreenInfo;
    @Input() viewDataPage: { [key in DataOperation]?: any } = {};
    @Input() filters: any;
    @Input() options: any;

    ScreenEnum = ScreenEnum;
    OrientationScreenEnum = OrientationScreenEnum;

    constructor(@Inject(String) extendsClassName: string) {
        super(extendsClassName);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        super.onDestroy();
    }
}`;

module.exports = {
    getCommonDevicesTemplate
};
