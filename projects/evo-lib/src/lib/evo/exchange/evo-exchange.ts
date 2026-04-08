import {IExchangeSource} from './exchange.interface';
import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {ExchangeLighthouse} from './exchange.lighthous';

export interface IEvoExchange {
    l: ILighthouse<IExchangeSource>;
}

export class EvoExchange implements IEvoExchange {
    public l: ILighthouse<IExchangeSource>;

    public constructor() {
        this.l = new ExchangeLighthouse();
    }
}
