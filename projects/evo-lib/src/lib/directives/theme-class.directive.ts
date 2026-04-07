import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';

import { filter, takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';

import {ITheme} from '../evo/theme/theme.lighthouse';
import '../evo/evo-global-declare';

/**
 * Директива автоматически добавляет суффикс с названием текущей темы к базовым классам элемента.
 *
 * Механизм работы:
 * 1. Принимает массив базовых CSS-классов через входное свойство `evoThemeClass`
 * 2. Подписывается на поток текущей темы
 * 3. Формирует итоговые классы в формате: `{baseClassName}_{themeName}` для каждого базового класса
 * 4. Автоматически обновляет классы при изменении темы или базовых классов
 *
 * Пример использования:
 *
 * ```ts
 * evo.theme.l.send({name: 'white'});
 * ```
 *
 * ```html
 *  [themeClass]="['license-widget']
 * ```
 */
@Directive({
    selector: '[evoThemeClass]'
})
export class ThemeClassDirective implements OnInit, OnDestroy {
    //region Properties
    /**
     * Массив базовых CSS-классов, к которым будет добавлен суффикс темы
     * Пример: ['button', 'btn'] и теме 'dark' добавятся классы 'button_dark' и 'btn_dark'
     */
    @Input() themeClass: string[] = [];

    /**
     * Массив предыдущих примененных темизированных классов.
     * Сохраняется для корректного удаления при обновлении темы или базовых классов.
     */
    private previousClassNames: string[] = [];

    private readonly destroyed$ = new Subject<void>();
    //endregion

    public constructor(
        private elementRef: ElementRef
    ) {}

    //region Lifecycle hooks
    public ngOnInit(): void {
        evo.theme.l.lighthouse$
            .pipe(
                takeUntil(this.destroyed$),
                // Используем type guard для сужения типа и исключения null
                filter((theme): theme is ITheme => theme !== null && theme !== undefined)
            )
            .subscribe((theme: ITheme) => {
                this._updateClassNames(theme.name);

                if (theme?.options?.callback) {
                    theme.options.callback(theme?.options?.bg);
                }
            });
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    //endregion

    //region Private methods
    /**
     * Обновляет темизированные классы элемента.
     * Удаляет предыдущие темизированные классы и добавляет новые.
     *
     * @param theme - название текущей темы (модификатор)
     */
    private _updateClassNames(theme: string): void {
        // Удаляем старые темизированные классы
        this._removePreviousClassNames();

        // Очищаем массив предыдущих классов
        this.previousClassNames = [];

        // Добавляем новые темизированные классы
        this._addNewClassNames(theme);
    }

    /**
     * Удаляет все предыдущие темизированные классы из элемента
     */
    private _removePreviousClassNames(): void {
        if (this.previousClassNames.length > 0) {
            this.previousClassNames.forEach(className => {
                this.elementRef.nativeElement.classList.remove(className);
            });
        }
    }

    /**
     * Добавляет новые темизированные классы на основе текущей темы
     * @param theme - название текущей темы
     */
    private _addNewClassNames(theme: string): void {
        if (this.themeClass && this.themeClass.length > 0 && theme) {
            this.themeClass.forEach(themeClas => {
                const themedClassName = `${themeClas}_${theme}`;
                this.previousClassNames.push(themedClassName);
                this.elementRef.nativeElement.classList.add(themedClassName);
            });
        }
    }


    //endregion
}

/* Пример использования callback
public ngOnInit(): void {
    const themeName = 'black';

    setTimeout(_ => {
    evo.theme$.sendLighthouse({
        name: themeName,
        options: {callback: this.setTheme, bg: themeName}
    });
}, 3000)
}

public setTheme(bg: string) {
    const parentRoot = evo.root$.getParentRootElement();
    const value = bg === 'black' ? 'black' : 'white';

    evo.dom.style.applyStyleProperty(parentRoot, 'background-color', value);
}
*/
