// commands/templates/page-data/main.js
// language=TEXT
const getMainTemplate = (componentName, styleType, className, componentPascal) => `import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ScreenEnum, NgFacadeSubscribeComponent, IScreenInfo} from 'evo-lib';

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
export class ${className}Component extends NgFacadeSubscribeComponent implements OnInit, OnDestroy{
    static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public screenInfo$ = evo?.devicesScreen?.screen?.lighthouse$?.asObservable() as Observable<IScreenInfo>;

    private destroy$ = new Subject<void>();

    public ScreenEnum = ScreenEnum;

    public constructor(
        requestService: ${componentPascal}1RequestService,
        serverService: ${componentPascal}2ServerService,
        parsedService: ${componentPascal}3ParsedService,
        factoryService: ${componentPascal}4FactoryService,
        dispatcherService: ${componentPascal}5DispatcherService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
        this.initialize(PageComponent.extendsClassName, {
            request: requestService,
            server: serverService,
            parsed: parsedService,
            factory: factoryService
        });
    }

    public ngOnInit(): void {
        evo.devicesScreen.screen.lighthouse$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                this.cdr.detectChanges();
            });

        this._startTheme();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this.destroy$.next();
        this.destroy$.complete();
    }

    private _startTheme(): void {
        const themeName = 'black';

        setTimeout(() => {
            evo.theme.send$({
                name: themeName,
            });
        }, 3000);
    }
}
`;

const getMainHtmlTemplate = (componentName) => `
<ng-container *ngIf="screenInfo$ | async as screenInfo">
    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Phone">
        <evo-${componentName}-phone
            [screenInfo$]="screenInfo$"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
        ></evo-${componentName}-phone>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Tablet">
        <evo-${componentName}-tablet
            [screenInfo$]="screenInfo$"
            [viewDataPage]="viewDataPage"
            [filters]="filters"
            [options]="options"
        ></evo-${componentName}-tablet>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Desktop">
        <evo-${componentName}-desktop
            [screenInfo$]="screenInfo$"
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
