import {IExchangeSource} from './exchange.interface';
import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {ExchangeLighthouse} from './exchange.lighthous';

export interface IEvoExchange {
    com: ILighthouse<IExchangeSource>;
}

export class EvoExchange implements IEvoExchange {
    public com: ILighthouse<IExchangeSource>;

    public constructor() {
        this.com = new ExchangeLighthouse();
    }
}
