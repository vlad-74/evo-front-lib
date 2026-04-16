import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ScreenEnum, NgFacadeSubscribeComponent, IScreenInfo} from 'evo-lib';

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

    public screenInfo$ = evo?.devicesScreen?.screen?.lighthouse$?.asObservable() as Observable<IScreenInfo>;

    private destroy$ = new Subject<void>();

    public ScreenEnum = ScreenEnum;

    public constructor(
        requestService: Page1RequestService,
        serverService: Page2ServerService,
        parsedService: Page3ParsedService,
        factoryService: Page4FactoryService,
        dispatcherService: Page5DispatcherService,
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
                setTimeout(() => {
                    // без this.cdr.detectChanges() проблемно работает ресайз экрана. В начале 2 раза, а затем прекращает
                    this.cdr.detectChanges();
                }, 0);
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
