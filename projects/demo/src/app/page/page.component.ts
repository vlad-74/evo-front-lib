import {Component, Input, OnDestroy} from '@angular/core';

import {ScreenEnum, NgFacadeSubscribeComponent} from 'evo-lib';

import { Page1RequestService } from './services/page-1-request.service';
import { Page2ServerService } from './services/page-2-server.service';
import { Page3ParsedService } from './services/page-3-parsed.service';
import { Page4FactoryService } from './services/page-4-factory.service';
import { Page5DispatcherService } from './services/page-5-dispatcher.service';
import {ParentComponent} from '../parent/parent.component';
import {ContainerRefService} from '../service/container-ref.service';

@Component({
    selector: 'evo-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent extends NgFacadeSubscribeComponent implements OnDestroy{
    static readonly extendsClassName = 'PageComponent';

    @Input() viewDataPage: any = {};
    @Input() filters: any;
    @Input() options: any;

    public ScreenEnum = ScreenEnum;
    public evo = evo;

    public constructor(
        public requestService: Page1RequestService,
        public serverService: Page2ServerService,
        public parsedService: Page3ParsedService,
        public factoryService: Page4FactoryService,
        public dispatcherService: Page5DispatcherService,
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
            // Можно добавить fallback логику или уведомление пользователя
        }

    }
}
