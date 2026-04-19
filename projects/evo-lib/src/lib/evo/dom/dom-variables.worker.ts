import {ElementRef} from '@angular/core';
import {DomStyleWorker} from './dom-style.worker';

/**
 * Класс для работы с DOM переменными
 */
export const cssModuleBaseWidths: number[] = [
    ...Array.from({ length: 50 }, (_, i) => i + 1),
    60, 70, 80, 90, 100, 150, 210
];

export interface IDomVariablesWorker {
    varsMaxWidthActivePage(element: ElementRef<HTMLElement>, maxWidth: number, arrNumberVars: number[]): void;

    addItemToCssRootBaseWidths(arr?: number[]): number[];

    deleteRootVariables(element: ElementRef<HTMLElement>): void;
}

export class DomVariablesWorker implements IDomVariablesWorker {

    public document: Document;
    private domStyleWorker: DomStyleWorker;

    /** Массив для удаления переменных созданных в varsMaxWidthActivePage */
        // tslint:disable-next-line:variable-name
    private _variablesToDelete: string[] = [];

    public constructor(document: Document) {
        this.document = document;
        this.domStyleWorker = new DomStyleWorker(document);
    }

    /**
     * Получить родительский элемент как HTMLElement
     */
    private getParentElement(element: HTMLElement): HTMLElement | null {
        return element.parentElement;
    }

    //region CSS ДИНАМИЧЕСКИЕ ПЕРЕМЕННЫЕ
    /**
     * Генерирует CSS "ДИНАМИЧЕСКИЕ ПЕРЕМЕННЫЕ" в зависимости от ширины активной страницы.
     * ДИНАМИЧЕСКИЕ ПЕРЕМЕННЫЕ - root.style.setProperty(`--evo${i}`, `min(calc(${i} * 100vmax / ${desktopMaxWidth}), ${i}px)`);
     *
     * @param {ElementRef<HTMLElement>} element - элемент
     * @param {number} maxWidth - Максимальная ширина активной страницы.
     * @param {number[]} arrNumberVars - Массив конкретных значений.
     *
     * @example
     * const maxVars = 50;
     * const arrVars = [60, 70, 80, 90, 100, 150, 210];
     *
     * this._style.varsMaxWidthActivePage(desktopMaxWidth, [
     *  ...Array.from({length: maxVars}, (_, i) => i + 1),
     *  ...arrVars
     * ]);
     */
    varsMaxWidthActivePage(element: ElementRef<HTMLElement>, maxWidth: number, arrNumberVars: number[] = []): void {
        const root = element.nativeElement.parentElement;

        if (!root) {
            console.error('Root элемент не найден');
            return;
        }

        // На выходе переменные типа - --evo50: min(calc(50 * 100vmax / 1500), 50px);
        if (Array.isArray(arrNumberVars) && arrNumberVars.length > 0) {
            arrNumberVars.forEach(i => {
                this.domStyleWorker.applyStyleProperty(root, `--evo${i}`, `min(calc(${i} * 100vmax / ${maxWidth}), ${i}px)`);
                this._variablesToDelete.push(`--evo${i}`);
            });
        }
    }

    addItemToCssRootBaseWidths(arr?: number[]): number[] {
        if (!arr) {
            return cssModuleBaseWidths;
        }

        return [...cssModuleBaseWidths, ...arr];
    }

    /**
     * Удаление всех переменных созданных в varsMaxWidthActivePage
     * @see {@link varsMaxWidthActivePage}
     */
    deleteRootVariables(element: ElementRef<HTMLElement>): void {
        const root = element.nativeElement.parentElement;

        if (!root) { return; }

        this._variablesToDelete.forEach(variable => {
            root.style.removeProperty(variable);
        });

        // Очищаем массив после удаления
        this._variablesToDelete = [];
    }

    //endregion
}
