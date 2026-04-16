import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ParentComponent} from './parent/parent.component';


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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    //region Свойства класса

    @ViewChild('pageList', { read: ViewContainerRef }) containerList!: ViewContainerRef;
    @ViewChild('pageDetail', { read: ViewContainerRef }) containerDetail!: ViewContainerRef;

    /**
     * Создание для pageModal с флагом isMultiPage
     * тогда предыдущие компоненты не будут удаляться перед созданием нового
     *
     * @example
     *
     * evo.createPage.send({
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

    public async ngOnInit(): Promise<void> {
        // evo.debug.logAll.accessType = false;
        // evo.log.disableLogAll(); // только logAll + common
    }

    public ngOnDestroy(): void {
        evo.destroy(); // !!! Обязательно при выходе "из использования evo"
    }

    public ngAfterViewInit(): void {
        if (!this.containerList) {
            console.error('containerList не найден!');
            return;
        }

        evo.createPage.send({
            component: ParentComponent,
            viewContainerRef: this.containerList,
            isMultiPage: false,
            inputs: { test: 'Hello!' },
            outputs: { closed: () => console.log('Закрыто') }
        });
    }
}
