import {ElementRef} from '@angular/core';
import { ScreenEnum } from '../devices-screen/screen/screen.enum';

export class PageWidthWorker {

    /**
     * Задает максимальную ширину страницы для экрана
     *
     * @description
     * Метод анализирует текущий тип устройства (Desktop/мобильное) и установленные
     * ограничения ширины, после чего применяет соответствующее значение через CSS-переменную.
     *
     * @param wrapperRef - Ссылка на DOM-элемент, для которого устанавливается ширина
     *
     * @throws {Error} Не выбрасывает исключений, безопасно обрабатывает отсутствие данных
     *
     * @see {@link ScreenEnum} - Типы экранов
     * @see {@link window.evo} - Глобальный объект с настройками
     */
    public setWidth(wrapperRef: ElementRef<HTMLElement>): void {
        // Получаем текущую информацию об экране из глобального объекта evo
        const valueS = window.evo.devicesScreen.screen.lighthouse$.getValue();
        const screenType = valueS?.screen.type;

        // Получаем настроенную максимальную ширину страницы
        const valueW = window.evo.dynamicWidth.maxPageWidth.lighthouse$.getValue();
        const pageWidth = valueW?.maxPageWidth;

        // Получаем максимальный размер для текущего типа экрана
        const maxSize = valueS?.screen?.options?.maxSize;

        // Рассчитываем итоговую ширину:
        // - Если pageWidth меньше или равен maxSize, используем pageWidth
        // - Иначе ширина = 100% (растягиваем на всю доступную область)
        const width = (pageWidth as number) <= (maxSize as number)
            ? `${pageWidth}px`
            : '100%';

        // Для Desktop используем рассчитанную ширину, для мобильных - 100%
        const widthWrapper = screenType === ScreenEnum.Desktop ? width : '100%';

        // Если тип экрана определен и элемент существует, устанавливаем CSS-переменную
        if (screenType) {
            if (wrapperRef?.nativeElement) {
                wrapperRef.nativeElement.style.setProperty('--evo-page-width', widthWrapper);
            }
        }
    }
}
