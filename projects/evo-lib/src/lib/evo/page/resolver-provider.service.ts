// resolver-provider.service.ts
import { Injectable, ComponentFactoryResolver } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResolverProviderService {
    private static resolver: ComponentFactoryResolver;

    constructor(private cfr: ComponentFactoryResolver) {
        ResolverProviderService.resolver = cfr;
    }

    static getResolver(): ComponentFactoryResolver {
        return this.resolver;
    }
}
