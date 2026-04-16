/** Маяк для оповещения о экране в котором находится страница */
import {BaseLighthouse} from '../../_lighthouse/base-lighthouse';

export interface IParamsFacade {
    functionName: string; args: any[];
}

export interface IFacade {
    request: IParamsFacade;
    server: IParamsFacade;
    parsed: IParamsFacade;
    factory: IParamsFacade;
}

export class FacadeLighthouse extends BaseLighthouse<IFacade> {
    public constructor() {
        super('facade'); // Передаём тип для логирования и отладки
    }
}
