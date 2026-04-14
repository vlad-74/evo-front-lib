import { Component } from '@angular/core';

import { PageCommonDevicesComponent } from '../page-common-devices.component';

@Component({
    selector: 'evo-page-phone',
    templateUrl: './page-phone.component.html',
    styleUrls: ['./page-phone.component.scss']
})
export class PagePhoneComponent extends PageCommonDevicesComponent {
    static readonly extendsClassName = 'PagePhoneComponent';

    constructor() {
        super(PagePhoneComponent.extendsClassName);
    }

}
