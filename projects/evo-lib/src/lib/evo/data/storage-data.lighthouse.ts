/** Маяк для оповещения о экране в котором находится страница */
import {BaseLighthouse} from '../_lighthouse/base-lighthouse';


export class StorageDataLighthouse extends BaseLighthouse<any> {
    public constructor() {
        super('storageData'); // Передаём тип для логирования и отладки
    }
}
