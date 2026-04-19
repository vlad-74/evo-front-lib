import {IMaxPageWidth, MaxPageWidthLighthouse} from './max-page-width.lighthouse';
import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {DynamicStyleLighthouse} from './dynamic-style.lighthouse';
import {PageWidthWorker} from './page-width.worker';

export interface IDynamicWidth {
    maxPageWidth: ILighthouse<IMaxPageWidth>;
    dynamicStyle: ILighthouse<IMaxPageWidth>;
    dynamicWorker: PageWidthWorker;
}

export class DynamicWidth implements IDynamicWidth {
    public maxPageWidth: ILighthouse<IMaxPageWidth>;
    public dynamicStyle: ILighthouse<IMaxPageWidth>;
    public dynamicWorker: PageWidthWorker;

    public constructor() {
        this.maxPageWidth = new MaxPageWidthLighthouse();
        this.dynamicStyle = new DynamicStyleLighthouse();
        this.dynamicWorker = new PageWidthWorker();
    }
}
