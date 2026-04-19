/** Маяк для оповещения о размерах экранов и страрицы */
import {BaseLighthouse} from '../_lighthouse/base-lighthouse';
import {IMaxPageWidth} from './max-page-width.lighthouse';


export class DynamicStyleLighthouse extends BaseLighthouse<IMaxPageWidth>{

    public constructor() {
        super('dynamicStyle'); // Передаём тип для логирования и отладки
    }
}
