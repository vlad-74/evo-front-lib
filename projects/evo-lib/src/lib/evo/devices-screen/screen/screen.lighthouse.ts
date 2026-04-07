/** Маяк для оповещения о экране в котором находится страница */
import {baseLighthouse} from '../../_lighthouse/base-lighthouse';
import {IScreenInfo} from './screen.interfaces';


export class ScreenLighthouse extends baseLighthouse<IScreenInfo> {
    public constructor() {
        super('screen'); // Передаём тип для логирования и отладки
    }
}
