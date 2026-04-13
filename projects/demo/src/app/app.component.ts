import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';


/**
 * AppComponent - компонент для дебага библиотеки 'evo-lib'
 *
 * !!! Если непонятки с использованием библиотеки 'evo-lib' - например evo или exchangeNameEnum
 *
 * Удалить node_modules и переустановить
 */

/*
Remove-Item -Path node_modules -Recurse -Force
npm install
*/

@Component({
  selector: 'evo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    //region Свойства класса

    @ViewChild('pageList', { read: ViewContainerRef }) containerList!: ViewContainerRef;
    @ViewChild('pageDetail', { read: ViewContainerRef }) containerDetail!: ViewContainerRef;

    /**
     * Создание для pageModal с флагом isMultiPage
     * тогда предыдущие компоненты не будут удаляться перед созданием нового
     *
     * @example
     *
     * _evo_page$.send({
     *      component: DetailingExampleComponent,
     *      viewContainerRef: ContainerName.Detail,
     *      inputs: {
     *        data: {
     *          source: this.viewDataFields,
     *          isFromList: true,
     *        }
     *      },
     *      isMultiPage: true,
     * });
     *
     */
    @ViewChild('pageModal', { read: ViewContainerRef }) containerModal!: ViewContainerRef;

    //endregion

    public constructor() {}

    public async ngOnInit(): Promise<void> {
        // evo.debug.logAll.accessType = false;
        // evo.log.disableLogAll(); // только logAll + common
    }

    /**
     * Устанавливает текущую страницу (page) в указанном контейнере page.viewContainerRef.
     *
     * - setCurrentPage - вызывается из SubscribersWorker - setContainerPage
     * - подписка срабатывает после сигнала - _evo_page$.send({ component: component || ListExampleComponent });
     *
     * @param page - Объект конфигурации страницы, реализующий интерфейс `ICreatePage`.
     *
     * Должен содержать как минимум:
     * - `component`: Angular-компонент, который нужно отобразить.
     * - `viewContainerRef`: Контейнер, в котором будет создан компонент. Может быть строкой ('containerList', 'containerDetail' и т.д.)
     * или прямой ссылкой на ViewContainerRef.
     * - Другие необязательные параметры (например, данные, настройки инициализации и т.п.),
     * которые могут использоваться сервисом CreatePageService.
     *
     *
     * @example
     * - для того чтобы вызвалось setCurrentPage нужно инициировать _evo_page$.send({ component: component || ListExampleComponent });
     */
/*    public setCurrentPage(page: ICreatePage): void {

        if (!page?.viewContainerRef) {
            page.viewContainerRef = ContainerName.List;
        }

        if (typeof page.viewContainerRef === 'string') {
            page.type = page.viewContainerRef as ContainerName;
        }

        page.viewContainerRef = evo.page$.resolveViewContainerRef(page.viewContainerRef);

        if (!page.viewContainerRef) {
            throw new Error('Не определен контейнер для страницы');
        }

        evo.page$.createPage(page);
    }*/
}
