// commands\templates\page-detail/main.js

// language=TEXT
const getMainTemplate = (componentName, styleType, className) => `import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ScreenEnum, IScreenInfo} from 'evo-lib';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})

export class ${className}Component implements OnInit, OnDestroy{
    private static readonly extendsClassName = '${className}Component';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public screenInfo$ = evo?.devicesScreen?.screen?.lighthouse$?.asObservable() as Observable<IScreenInfo>;

    private destroy$ = new Subject<void>();

    public ScreenEnum = ScreenEnum;

    public constructor(
        private cdr: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        evo.devicesScreen.screen.lighthouse$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                setTimeout(() => {this.cdr.detectChanges(); }, 0);
            });
    }

        public ngOnDestroy(): void {

        this.destroy$.next();
        this.destroy$.complete();
    }
}
`;

const getMainHtmlTemplate = (componentName) => `<ng-container *ngIf="screenInfo$ | async as screenInfo">
    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Phone">
        <evo-${componentName}-phone
            [screenInfo$]="screenInfo$"
            [viewDataPage]="viewDataPage"
        ></evo-${componentName}-phone>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Tablet">
        <evo-${componentName}-tablet
            [screenInfo$]="screenInfo$"
            [viewDataPage]="viewDataPage"
        ></evo-${componentName}-tablet>
    </ng-container>

    <ng-container *ngIf="screenInfo.screen.type === ScreenEnum.Desktop">
        <evo-${componentName}-desktop
            [screenInfo$]="screenInfo$"
            [viewDataPage]="viewDataPage"
        ></evo-${componentName}-desktop>
    </ng-container>
</ng-container>`;

module.exports = {
    getMainTemplate,
    getMainHtmlTemplate
};
