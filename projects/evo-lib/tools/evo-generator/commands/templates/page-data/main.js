// commands/templates/page-data/main.js

const getMainTemplate = (componentName, styleType, className, componentPascal) => `
import { Component, ComponentRef, Input } from '@angular/core';

import { Observable } from "rxjs";

import cloneDeep from 'lodash-es/cloneDeep';

import { evo } from "@evo-page/evo/evo.worker";
import { evoLighthouse } from '@evo-page/evo/evo.lighthouse';
import { NgDataSubscribeComponent } from "@evo-page/evo/core/_workers/_data/ng-data-subscribe.component";

import { OrientationScreenEnum, ScreenEnum } from '@evo-page/evo/core/_workers/support/screen/screen.enum';
import { DataOperation } from '@evo-page/evo/core/_workers/_data/data.worker';
import { IScreenInfo } from "@evo-page/evo/core/_workers/support/screen/screen.interfaces";

import { ${componentPascal}1RequestService } from './services/${componentName}-1-request.service';
import { ${componentPascal}2ServerService } from './services/${componentName}-2-server.service';
import { ${componentPascal}3ParsedService } from './services/${componentName}-3-parsed.service';
import { ${componentPascal}4FactoryService } from './services/${componentName}-4-factory.service';
import { ${componentPascal}5DispatcherService } from './services/${componentName}-5-dispatcher.service';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})
export class ${className}Component extends NgDataSubscribeComponent {
    @Input() $componentRef: ComponentRef<${className}Component>;

    static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: { [key in DataOperation]?: any } = {};
    @Input() filters: any;
    @Input() options: any;

    ScreenEnum = ScreenEnum;
    OrientationScreenEnum = OrientationScreenEnum;

    lighthouseScreen$: Observable<IScreenInfo>;

    constructor(
        requestService: ${componentPascal}1RequestService,
        serverService: ${componentPascal}2ServerService,
        parsedService: ${componentPascal}3ParsedService,
        dispatcherService: ${componentPascal}5DispatcherService
    ) {
        super(
            ${className}Component.extendsClassName,
            requestService,
            serverService,
            parsedService,
            ${componentPascal}4FactoryService,
        );

        this.lighthouseScreen$ = evoLighthouse.screen$.lighthouse$.asObservable();
    }

    ngOnInit(): void {
        this.dispatcherService.start(${className}Component.extendsClassName);
        this.startTheme();
    }

    startTheme(): void {
        const themeName = 'black';

        setTimeout(() => {
            evo.theme$.sendLighthouse({
                name: themeName,
                options: { callback: this.setTheme, bg: themeName }
            });
        }, 3000);
    }

    setTheme(bg: string) {
        const parentRoot = evo.root$.getParentRootElement();
        const value = bg === 'black' ? 'black' : 'white';
        evo.dom.style.applyStyleProperty(parentRoot, 'background-color', value);
    }

    setViewData(itemDataName: DataOperation): void {
        this.viewDataPage[itemDataName] = cloneDeep(this.dataPage[itemDataName]);

        if (evo.dynamicConst.isLocalhost && evo.debug.debugger.data.value && evo.debug.debugger.data.type.includes(itemDataName)) {
            evo.log.warn(['------- setViewData', 'this.viewDataPage.' + itemDataName, this.viewDataPage[itemDataName]]);
        }
    }

    changeViewData(itemDataName: DataOperation): void {
        if (!this.viewDataPage) {
            this.viewDataPage = {};
        }
        this.setViewData(itemDataName);
    }

    ngOnDestroy(): void { super.onDestroy(); }
}`;

const getMainHtmlTemplate = (componentName) => `
<ng-container *ngIf="lighthouseScreen$ | async as screenLighthouse">
    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Phone">
        <evo-${componentName}-phone
            [screenLighthouse]="screenLighthouse"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
        ></evo-${componentName}-phone>
    </ng-container>

    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Tablet">
        <evo-${componentName}-tablet
            [screenLighthouse]="screenLighthouse"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
        ></evo-${componentName}-tablet>
    </ng-container>

    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Desktop">
        <evo-${componentName}-desktop
            [screenLighthouse]="screenLighthouse"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
        ></evo-${componentName}-desktop>
    </ng-container>
</ng-container>`;

module.exports = {
    getMainTemplate,
    getMainHtmlTemplate
};
