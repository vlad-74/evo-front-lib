import {APP_INITIALIZER, ComponentFactoryResolver, NgModule} from '@angular/core';
import { EvoThemeClassDirective } from './directives/evo-theme-class.directive';
import { NgExchangeSubscribeComponent } from './evo/exchange/ng-exchange-subscribe.component';
import { ResolverProviderService } from './evo/page/resolver-provider.service';
import { PageService } from './evo/page/page.service';
import { setPageService } from './evo/evo-global';

// Именованная функция, которую мы будем ВОЗВРАЩАТЬ из фабрики
export function resolverProviderAppInit(): void {
    // Ничего не делаем — важно, что deps: [ResolverProviderService] вызвался
}

// Фабрика, которая ВОЗВРАЩАЕТ именованную функцию
export function initResolverProviderFactory(): () => void {
    return resolverProviderAppInit;
}

@NgModule({
    declarations: [EvoThemeClassDirective, NgExchangeSubscribeComponent],
    exports: [
        EvoThemeClassDirective,
        NgExchangeSubscribeComponent,
    ],
    providers: [
        ResolverProviderService,
        PageService, // ✅ Добавляем явно
        {
            provide: APP_INITIALIZER,
            useFactory: initResolverProviderFactory,
            deps: [ResolverProviderService],
            multi: true
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
        setPageService(pageService); // ← передаём экземпляр в глобальный объект
    }
}
