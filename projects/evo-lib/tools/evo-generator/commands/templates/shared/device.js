// commands/templates/shared/device.js

const getDeviceTemplate = (deviceName, styleType, parentClassName, parentImportPath, className) => `import { Component } from '@angular/core';

import { ${parentClassName} } from '${parentImportPath}';

@Component({
    selector: 'evo-${deviceName}',
    templateUrl: './${deviceName}.component.html',
    styleUrls: ['./${deviceName}.component.${styleType}']
})
export class ${className} extends ${parentClassName} {
    private static readonly extendsClassName = '${className}';

    public constructor() {
        super(${className}.extendsClassName);
    }
}
`;

const getDeviceHtmlTemplate = (deviceName) => `<div class="device"
    [ngClass]="{
        'phone': screenInfo.screen.type === ScreenEnum.Phone,
        'tablet': screenInfo.screen.type === ScreenEnum.Tablet,
        'desktop': screenInfo.screen.type === ScreenEnum.Desktop
    }"
>
    <div [ngClass]="{
        'vertical': screenInfo.screen.orientation === OrientationScreenEnum.Vertical,
        'horizontal': screenInfo.screen.orientation === OrientationScreenEnum.Horizontal
    }">
        <p>932 - 1366 -  1500</p>
        ${deviceName} device works! - {{screenInfo.screen.options.proportions.width}} - {{screenInfo.screen.options.proportions.innerWidth}}
    </div>
</div>`;

module.exports = {
    getDeviceTemplate,
    getDeviceHtmlTemplate
};
