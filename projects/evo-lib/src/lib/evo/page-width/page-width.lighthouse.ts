/** Маяк для оповещения о размерах экранов и страрицы */
import {BaseLighthouse} from '../_lighthouse/base-lighthouse';


export interface IPageWidth {
    maxPageWidth: number;
}

export class PageWidthLighthouse extends BaseLighthouse<IPageWidth>{

    public constructor() {
        super('pageWidth'); // Передаём тип для логирования и отладки
    }
}
