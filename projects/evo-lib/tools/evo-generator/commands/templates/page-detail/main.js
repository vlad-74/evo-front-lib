// commands\templates\page-detail/main.js

// Шаблон TypeScript
const getMainTemplate = (componentName, styleType, className) => `import { Component, Input } from '@angular/core';
import { ScreenEnum } from 'evo-lib';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})

export class ${className}Component {
    private static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public screenInfo$ = evo.devicesScreen.screen.lighthouse$;

    public ScreenEnum = ScreenEnum;
}
`;

const getMainHtmlTemplate = (componentName) => `<ng-container *ngIf="screenInfo$ | async as screenInfo">
    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Phone">
        <evo-${componentName}-phone
            [screenInfo]="screenInfo"
        ></evo-${componentName}-phone>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Tablet">
        <evo-${componentName}-tablet
            [screenInfo]="screenInfo"
        ></evo-${componentName}-tablet>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Desktop">
        <evo-${componentName}-desktop
            [screenInfo]="screenInfo"
        ></evo-${componentName}-desktop>
    </ng-container>
</ng-container>`;

module.exports = {
    getMainTemplate,
    getMainHtmlTemplate
};
