// commands/templates/page-detail/main.js

const getMainTemplate = (componentName, styleType, className) => `import { Component, ComponentRef, Input } from '@angular/core';

import { Observable } from "rxjs";

import { evo } from "@evo-page/evo/evo.worker";
import { evoLighthouse } from '@evo-page/evo/evo.lighthouse';

import { OrientationScreenEnum, ScreenEnum } from '@evo-page/evo/core/_workers/support/screen/screen.enum';
import { DataOperation } from '@evo-page/evo/core/_workers/_data/data.worker';
import { IScreenInfo } from "@evo-page/evo/core/_workers/support/screen/screen.interfaces";

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})
export class ${className}Component {
    @Input() $componentRef: ComponentRef<${className}Component>;

    private static readonly extendsClassName = '${className}Component';

    public lighthouseScreen$: Observable<IScreenInfo>;

    @Input() viewDataPage: { [key in DataOperation]?: any } = {};
    @Input() filters: any;
    @Input() options: any;

    public ScreenEnum = ScreenEnum;
    public OrientationScreenEnum = OrientationScreenEnum;

    constructor() {
        this.lighthouseScreen$ = evoLighthouse.screen$.lighthouse$.asObservable();
    }

    ngOnInit(): void {
        const themeName = 'black';

        setTimeout(_ => {
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

    ngOnDestroy(): void { }
}`;

const getMainHtmlTemplate = (componentName) => `<ng-container *ngIf="lighthouseScreen$ | async as screenLighthouse">
    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Phone">
        <evo-${componentName}-phone
            [screenLighthouse]="screenLighthouse"
        ></evo-${componentName}-phone>
    </ng-container>

    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Tablet">
        <evo-${componentName}-tablet
            [screenLighthouse]="screenLighthouse"
        ></evo-${componentName}-tablet>
    </ng-container>

    <ng-container *ngIf="screenLighthouse.type === ScreenEnum.Desktop">
        <evo-${componentName}-desktop
            [screenLighthouse]="screenLighthouse"
        ></evo-${componentName}-desktop>
    </ng-container>
</ng-container>`;

module.exports = {
    getMainTemplate,
    getMainHtmlTemplate
};
