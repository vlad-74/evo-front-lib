import { BehaviorSubject } from 'rxjs';

import { ILighthouse } from './_lighthouse.interface';
import {TLoggingTypes} from '../logging/debugger';
import {evoBase} from '../evo-global';
import {TNullable} from '../evo.interface';

// tslint:disable-next-line:class-name
export class baseLighthouse<T> implements ILighthouse<T> {
    public lighthouse$: BehaviorSubject<TNullable<T>> = new BehaviorSubject<TNullable<T>>(null);

    constructor(private type: TLoggingTypes) {}

    public send(value: T): void {
        if (!value) { return; }

        evoBase.log.warn(this.type, 'common', 'Метод SEND в baseLighthouse2 ' + this.type, value);

        this.lighthouse$.next(value);
    }
}
