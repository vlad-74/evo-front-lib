/** Маяк для оповещения о экране в котором находится страница */
import {BaseLighthouse} from '../../_lighthouse/base-lighthouse';
import {IScreenInfo} from './screen.interfaces';


export class ScreenLighthouse extends BaseLighthouse<IScreenInfo> {
    public constructor() {
        super('screen'); // Передаём тип для логирования и отладки
    }
}

/*
<!-- В HTML получаем весь объект и обращаемся к вложенному полю -->
<div *ngIf="evo.screen.lighthouse$ | async as info">
    Тип экрана: {{ info.screen?.options?.type }}
</div>
*/
