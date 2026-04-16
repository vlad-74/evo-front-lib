import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResolverProviderService {
    // tslint:disable-next-line:variable-name
    private _cfr: ComponentFactoryResolver | null = null;

    setComponentFactoryResolver(cfr: ComponentFactoryResolver): void {
        if (!this._cfr) {
            this._cfr = cfr;
        }
    }

    getComponentFactoryResolver(): ComponentFactoryResolver {
        if (!this._cfr) {
            throw new Error(
                'ComponentFactoryResolver недоступен. Убедитесь, что EvoLibModule инициализирован с корректным провайдером.'
            );
        }
        return this._cfr;
    }
}
