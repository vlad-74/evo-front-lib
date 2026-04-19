import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


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

    @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLElement>;

    @ViewChild('pageList', {read: ViewContainerRef}) containerList!: ViewContainerRef;
    @ViewChild('pageDetail', {read: ViewContainerRef}) containerDetail!: ViewContainerRef;

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
    @ViewChild('pageModal', {read: ViewContainerRef}) containerModal!: ViewContainerRef;

    public maxPageWidth = 1500;

    private destroy$ = new Subject<void>();

    //endregion

    public constructor(
        private cdr: ChangeDetectorRef,
    ) {
    }

    public async ngOnInit(): Promise<void> {
        // evo.debug.logAll.accessType = false;
        // evo.log.disableLogAll(); // только logAll + common

        evo.devicesScreen.screen.lighthouse$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {

                /** Задаем максимальную ширину страицы для экрана */
                evo.dynamicWidth.maxPageWidth.send$({maxPageWidth: this.maxPageWidth, wrapperRef: this.wrapperRef});

                setTimeout(() => {
                    // без this.cdr.detectChanges() проблемно работает ресайз экрана. В начале 2 раза, а затем прекращает
                    this.cdr.detectChanges();
                }, 0);
            });
    }

    public ngOnDestroy(): void {
        evo.destroy(); // !!! Обязательно при выходе "из использования evo"

        this.destroy$.next();
        this.destroy$.complete();
    }

    public ngAfterViewInit(): void {
        /** Задаем максимальную ширину страицы для экрана */
        evo.dynamicWidth.maxPageWidth.send$({maxPageWidth: this.maxPageWidth, wrapperRef: this.wrapperRef});

        if (!this.containerList) {
            console.error('containerList не найден!');
            return;
        }

        // evo.createPage.send({
        //     component: ParentComponent,
        //     viewContainerRef: this.containerList,
        //     isMultiPage: false,
        //     inputs: { test: 'Hello!' },
        //     outputs: { closed: () => console.log('Закрыто') }
        // });
    }
}
