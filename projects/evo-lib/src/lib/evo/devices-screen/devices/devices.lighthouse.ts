/** Маяк для оповещения о размерах экранов и страрицы */
import {baseLighthouse} from '../../_lighthouse/base-lighthouse';
import {IDevices} from './devices';


export class DevicesLighthouse extends baseLighthouse<IDevices>{

    public constructor() {
        super('devices'); // Передаём тип для логирования и отладки
    }
}
