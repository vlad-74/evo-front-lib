// commands/templates/page-data/device.js

const getDeviceTemplate = (deviceName, styleType, parentClassName, parentImportPath, className) => `import { Component } from '@angular/core';

import { ${parentClassName} } from '${parentImportPath}';

@Component({
    selector: 'evo-${deviceName}',
    templateUrl: './${deviceName}.component.html',
    styleUrls: ['./${deviceName}.component.${styleType}']
})
export class ${className} extends ${parentClassName} {
    static readonly extendsClassName = '${className}';

    constructor() {
        super(${className}.extendsClassName);
    }

}
`;

const getDeviceHtmlTemplate = (deviceName) => `<div class="device" *ngIf="screenInfo$ | async as screenInfo"
    [ngClass]="{
        'phone': screenInfo.screen.type === ScreenEnum.Phone,
        'tablet': screenInfo.screen.type === ScreenEnum.Tablet,
        'desktop': screenInfo.screen.type === ScreenEnum.Desktop
    }"
>
    <p [ngClass]="{
        'vertical': screenInfo.screen.orientation === OrientationScreenEnum.Vertical,
        'horizontal': screenInfo.screen.orientation === OrientationScreenEnum.Horizontal
    }">${deviceName} device works!</p>
</div>`;

module.exports = {
    getDeviceTemplate,
    getDeviceHtmlTemplate
};
