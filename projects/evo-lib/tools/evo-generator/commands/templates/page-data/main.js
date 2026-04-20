// commands/templates/page-data/main.js

const getMainTemplate = (componentName, styleType, className, componentPascal) => `import {Component, Input, OnDestroy} from '@angular/core';

import {ScreenEnum, NgFacadeSubscribeComponent} from 'evo-lib';

import { ${componentPascal}1RequestService } from './services/${componentName}-1-request.service';
import { ${componentPascal}2ServerService } from './services/${componentName}-2-server.service';
import { ${componentPascal}3ParsedService } from './services/${componentName}-3-parsed.service';
import { ${componentPascal}4FactoryService } from './services/${componentName}-4-factory.service';
import { ${componentPascal}5DispatcherService } from './services/${componentName}-5-dispatcher.service';

import {ParentComponent} from '../parent/parent.component';
import {ContainerRefService} from '../service/container-ref.service';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})
export class ${className}Component extends NgFacadeSubscribeComponent implements OnDestroy{
    static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public ScreenEnum = ScreenEnum;
    public evo = evo;

    public constructor(
        public requestService: ${componentPascal}1RequestService,
        public serverService: ${componentPascal}2ServerService,
        public parsedService: ${componentPascal}3ParsedService,
        public factoryService: ${componentPascal}4FactoryService,
        public dispatcherService: ${componentPascal}5DispatcherService,
        public containerRefService: ContainerRefService,
    ) {
        super();
        this.initialize(PageComponent.extendsClassName, {
            request: requestService,
            server: serverService,
            parsed: parsedService,
            factory: factoryService
        });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public newPage(): void {
        const containerList = this.containerRefService.getContainerList();

        if (containerList) {
            evo.createPage.send({
                component: ParentComponent,
                viewContainerRef: containerList,
                isMultiPage: false,
                inputs: { test: 'Hello!' },
                outputs: { closed: () => console.log('Закрыто') }
            });
        } else {
            console.error('containerList не найден! Невозможно создать страницу.');
        }
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
