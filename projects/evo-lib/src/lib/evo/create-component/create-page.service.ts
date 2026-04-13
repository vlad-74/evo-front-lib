import {ComponentFactoryResolver, Injectable} from '@angular/core';

@Injectable()
export class CreatePageService {

    public constructor(
        componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }
}
