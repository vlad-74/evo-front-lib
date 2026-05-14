/** Маяк для оповещения о экране в котором находится страница */
import {BaseLighthouse} from '../../_lighthouse/base-lighthouse';
import {DataOperation, GetDataTypeEnum} from '../data.interface';
import {TNullable} from '../../evo.interface';

export interface IParamsFacade {
    functionName: string; args: any[];
}

export interface IFacade {
    for: string;
    dataOperation: DataOperation;
    returnType: GetDataTypeEnum;
    request: TNullable<IParamsFacade>;
    server: TNullable<IParamsFacade>;
    parsed: TNullable<IParamsFacade>;
    factory: TNullable<IParamsFacade>;
}

export class FacadeLighthouse extends BaseLighthouse<IFacade> {
    public constructor() {
        super('facade'); // Передаём тип для логирования и отладки
    }
}
