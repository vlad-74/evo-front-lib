import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {ITheme, ThemeLighthouse} from './theme.lighthouse';


export interface IEvoTheme {
    l: ILighthouse<ITheme>;
}

export class Theme implements IEvoTheme {
    public l: ILighthouse<ITheme>;

    public constructor() {
        this.l = new ThemeLighthouse();
    }
}
