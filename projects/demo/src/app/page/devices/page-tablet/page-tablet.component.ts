import { Component } from '@angular/core';

import { PageCommonDevicesComponent } from '../page-common-devices.component';

@Component({
    selector: 'evo-page-tablet',
    templateUrl: './page-tablet.component.html',
    styleUrls: ['./page-tablet.component.scss']
})
export class PageTabletComponent extends PageCommonDevicesComponent {
    static readonly extendsClassName = 'PageTabletComponent';

    constructor() {
        super(PageTabletComponent.extendsClassName);
    }

}
