import { Component } from '@angular/core';

import { PageCommonDevicesComponent } from '../page-common-devices.component';

@Component({
    selector: 'evo-page-desktop',
    templateUrl: './page-desktop.component.html',
    styleUrls: ['./page-desktop.component.scss']
})
export class PageDesktopComponent extends PageCommonDevicesComponent {
    static readonly extendsClassName = 'PageDesktopComponent';

    constructor() {
        super(PageDesktopComponent.extendsClassName);
    }

}
