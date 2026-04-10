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

    ngOnInit(): void { }
}`;

const getDeviceHtmlTemplate = (deviceName) => `<div
    [ngClass]="{
        'phone': screenLighthouse.type === ScreenEnum.Phone,
        'tablet': screenLighthouse.type === ScreenEnum.Tablet,
        'desktop': screenLighthouse.type === ScreenEnum.Desktop
    }"
>
    <p [ngClass]="{
        'vertical': screenLighthouse.orientation === OrientationScreenEnum.Vertical,
        'horizontal': screenLighthouse.orientation === OrientationScreenEnum.Horizontal
    }">${deviceName} device works!</p>
</div>`;

module.exports = {
    getDeviceTemplate,
    getDeviceHtmlTemplate
};
