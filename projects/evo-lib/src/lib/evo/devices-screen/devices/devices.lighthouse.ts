/** Маяк для оповещения о размерах экранов и страрицы */
import {BaseLighthouse} from '../../_lighthouse/base-lighthouse';
import {IDevices} from './devices';


export class DevicesLighthouse extends BaseLighthouse<IDevices>{

    public constructor() {
        super('devices'); // Передаём тип для логирования и отладки
    }
}
