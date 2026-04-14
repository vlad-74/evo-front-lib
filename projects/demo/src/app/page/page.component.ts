import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ScreenEnum, OrientationScreenEnum, NgFacadeSubscribeComponent } from 'evo-lib';

import { Page1RequestService } from './services/page-1-request.service';
import { Page2ServerService } from './services/page-2-server.service';
import { Page3ParsedService } from './services/page-3-parsed.service';
import { Page4FactoryService } from './services/page-4-factory.service';
import { Page5DispatcherService } from './services/page-5-dispatcher.service';

@Component({
    selector: 'evo-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent extends NgFacadeSubscribeComponent implements OnInit, OnDestroy{
    static readonly extendsClassName = 'PageComponent';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public screenInfo$ = evo.devicesScreen.screen.lighthouse$;

    public ScreenEnum = ScreenEnum;
    public OrientationScreenEnum = OrientationScreenEnum;

    public constructor(
        requestService: Page1RequestService,
        serverService: Page2ServerService,
        parsedService: Page3ParsedService,
        factoryService: Page4FactoryService,
        dispatcherService: Page5DispatcherService
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
        this._startTheme();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
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
