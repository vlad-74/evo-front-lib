/** Маяк для оповещения о размерах экранов и страрицы */
import {BaseLighthouse} from '../_lighthouse/base-lighthouse';
import {ElementRef} from '@angular/core';


export interface IMaxPageWidth {
    maxPageWidth: number;
    wrapperRef: ElementRef<HTMLElement>;
}

export class MaxPageWidthLighthouse extends BaseLighthouse<IMaxPageWidth>{

    public constructor() {
        super('pageWidth'); // Передаём тип для логирования и отладки
    }
}

