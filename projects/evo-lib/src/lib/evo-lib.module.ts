// evo-lib.module.ts
import { APP_BOOTSTRAP_LISTENER, ComponentFactoryResolver, NgModule } from '@angular/core';
import { EvoThemeClassDirective } from './directives/evo-theme-class.directive';
import { NgExchangeSubscribeComponent } from './evo/exchange/ng-exchange-subscribe.component';
import { ResolverProviderService } from './evo/create-page/resolver-provider.service';
import { PageService } from './evo/create-page/page.service';
import { setPageService } from './evo/evo-global';
import { StartComponentService } from './evo/start-component.service';

export function bootstrapListenerFactory(detector: StartComponentService): () => void {
    return () => {
        // Даем Angular время добавить компоненты в ApplicationRef
        setTimeout(() => {
            detector.detectBootstrapComponents();
        });
    };
}

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
        PageService,
        StartComponentService,
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: bootstrapListenerFactory,
            deps: [StartComponentService]
        }
    ]
})
export class EvoLibModule {
    constructor(
        private cfr: ComponentFactoryResolver,
        private resolverProvider: ResolverProviderService,
        private pageService: PageService
    ) {
        this.resolverProvider.setComponentFactoryResolver(cfr);
        setPageService(pageService);
    }
}
