import { APP_BOOTSTRAP_LISTENER, ComponentFactoryResolver, NgModule } from '@angular/core';
import { EvoThemeClassDirective } from './directives/evo-theme-class.directive';
import { NgExchangeSubscribeComponent } from './evo/exchange/ng-exchange-subscribe.component';
import { ResolverProviderService } from './evo/create-page/resolver-provider.service';
import { CreatePageService } from './evo/create-page/create-page.service';
import { setPageService } from './evo/evo-global';
import { StartComponentWorker } from './evo/workers/start-component.worker';

/* tslint:disable:only-arrow-functions space-before-function-paren typedef */

// 👇 Вынесенная функция (НЕ внутри factory)
export function bootstrapListener(detector: StartComponentWorker): void {
    setTimeout(runDetect, 0);

    function runDetect() {
        detector.detectBootstrapComponents();
    }
}

// 👇 factory теперь просто возвращает ссылку
export function bootstrapListenerFactory(detector: StartComponentWorker): () => void {
    return bootstrapListener.bind(null, detector);
}

/* tslint:enable:only-arrow-functions space-before-function-paren typedef */

@NgModule({
    declarations: [
        EvoThemeClassDirective,
        NgExchangeSubscribeComponent,
    ],
    exports: [
        EvoThemeClassDirective,
        NgExchangeSubscribeComponent,
    ],
    providers: [
        ResolverProviderService,
        CreatePageService,
        StartComponentWorker,
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: bootstrapListenerFactory,
            deps: [StartComponentWorker]
        }
    ]
})
export class EvoLibModule {
    constructor(
        private cfr: ComponentFactoryResolver,
        private resolverProvider: ResolverProviderService,
        private pageService: CreatePageService
    ) {
        this.resolverProvider.setComponentFactoryResolver(cfr);
        setPageService(this.pageService);
    }
}
