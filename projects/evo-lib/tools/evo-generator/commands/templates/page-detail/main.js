// commands/templates/page-detail/main.js

const getMainTemplate = (componentName, styleType, className) => `import { Component, Input, OnDestroy } from '@angular/core';

import {ScreenEnum, IScreenInfo} from 'evo-lib';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})

export class ${className}Component implements OnDestroy {
    private static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public ScreenEnum = ScreenEnum;
    public evo = evo;

    public ngOnDestroy(): void {
    }
}
`;

const getMainHtmlTemplate = (componentName) => `<ng-container *ngIf="evo.devicesScreen.screen.lighthouse$ | async as info">
    <ng-container *ngIf="info.screen.type === ScreenEnum.Phone">
        <evo-page-phone
            [screenInfo]="info"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
            (click)="newPage()"
        ></evo-page-phone>
    </ng-container>

    <ng-container *ngIf="info.screen.type === ScreenEnum.Tablet">
        <evo-page-tablet
            [screenInfo]="info"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
            (click)="newPage()"
        ></evo-page-tablet>
    </ng-container>

    <ng-container *ngIf="info.screen.type === ScreenEnum.Desktop">
        <evo-page-desktop
            [screenInfo]="info"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
            (click)="newPage()"
        ></evo-page-desktop>
    </ng-container>
</ng-container>`;

module.exports = {
    getMainTemplate,
    getMainHtmlTemplate
};
