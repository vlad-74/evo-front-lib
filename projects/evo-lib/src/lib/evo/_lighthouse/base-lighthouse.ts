import { BehaviorSubject } from 'rxjs';

import { ILighthouse } from './_lighthouse.interface';
import {TLoggingTypes} from '../logging/debugger';

import {TNullable} from '../evo.interface';


export class BaseLighthouse<T> implements ILighthouse<T> {
    public lighthouse$: BehaviorSubject<TNullable<T>> = new BehaviorSubject<TNullable<T>>(null);

    constructor(
        private type: TLoggingTypes,
    ) {}

    public send(value: T): void {
        if (!value) { return; }

        evo.log.warn(this.type, 'common', ' - Метод SEND в BaseLighthouse - ' + this.type, ' - ', value);

        this.lighthouse$.next(value);
    }
}
