import {ElementRef} from '@angular/core';
import { ScreenEnum } from '../devices-screen/screen/screen.enum';

export class PageWidthWorker {

    /** Задаем максимальную ширину страицы для экрана */
    public setWidth(wrapperRef: ElementRef<HTMLElement>): void {
        const valueS  =  window.evo.devicesScreen.screen.lighthouse$.getValue();
        const screenType = valueS?.screen.type;

        const valueW =  window.evo.dynamicWidth.maxPageWidth.lighthouse$.getValue();
        const pageWidth = valueW?.maxPageWidth;

        const maxSize = valueS?.screen?.options?.maxSize;

        const width = (pageWidth as number) <= (maxSize as number)
            ? `${pageWidth}px`
            : '100%';

        const widthWrapper = screenType === ScreenEnum.Desktop ? width  : '100%';

        if (screenType) {

            if (wrapperRef?.nativeElement) {
                wrapperRef.nativeElement.style.setProperty('--evo-page-width', widthWrapper);
            }
        }
    }
}
