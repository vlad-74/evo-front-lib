import { BehaviorSubject } from 'rxjs';
import {TNullable} from '../evo.interface';


export interface ILighthouse<T> {

    lighthouse$: BehaviorSubject<TNullable<T>>;

    send(config: T): void;
}
