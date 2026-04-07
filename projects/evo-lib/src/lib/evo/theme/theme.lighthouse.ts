/** Маяк для оповещения о размерах экранов и страрицы */
import {baseLighthouse} from '../_lighthouse/base-lighthouse';


export interface ITheme {
    name: string;
    options?: {
        callback?: (bg: string) => void;
        bg: string
    };
}

export class ThemeLighthouse extends baseLighthouse<ITheme>{

    public constructor() {
        super('theme'); // Передаём тип для логирования и отладки
    }
}
