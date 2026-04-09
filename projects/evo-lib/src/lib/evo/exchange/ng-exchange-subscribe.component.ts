import {Component, Inject, OnDestroy} from '@angular/core';

import { Subject,  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {exchangeNameEnum, IAction, IChangeProperty, IExchangeSource} from './exchange.interface';
import {TNullable} from '../evo.interface';


@Component({
    selector: 'evo-exchange-subscribe',
    template: `...`
})
export class NgExchangeSubscribeComponent implements OnDestroy {
    private readonly destroyedExchange$ = new Subject();

    public constructor(
        @Inject(String) public extendsClassName: string,
    ) {
        this._initEvoAng();
    }

    /** !!! В потомке обязательно - в его ngOnDestroy добавить super.ngOnDestroy(); */
    public ngOnDestroy(): void {
        this.destroyedExchange$.next();
        this.destroyedExchange$.complete();
    }


    private _initEvoAng(): void {
        if (evo.isLocalhost) {
            evo.checkEvo.checkLogClassName(this);

            evo.checkEvo.checkLogNgOnDestroy(this);
        }

        this._subscribeActions();
    }

    /** Подписываемся на изменения в evo.exchange.l.lighthouse$ (Обменный пункт) */
    private _subscribeActions(): void {
        evo.exchange.l.lighthouse$
            .pipe(takeUntil(this.destroyedExchange$))
            .subscribe((value: TNullable<IExchangeSource>) => {
                // if (!value?.source) {
                //     throw new Error(`Для работы с this.exchangeSource$ укажите для него адресат и ресурс`);
                // }

                if (
                    this.extendsClassName
                    && value?.to
                    && (
                        value.to === 'forAllClasses'
                        || value.to === this.extendsClassName
                        || (Array.isArray(value.to) && value.to.includes(this.extendsClassName))
                    )
                ) {
                    if ([
                        exchangeNameEnum.ChangeProperty,
                        exchangeNameEnum.RunAction
                    ].includes(value.source.name)) {
                        this.executeExchange(value.source.name, JSON.parse(JSON.stringify(value)));
                    }
                } else if (value?.to) {
                    evo.log.colorWarn(
                        'red',
                        'exchange',
                        'common',
                        'Подписка exchange (NgExchangeSubscribeComponent) - Адресат отсутствует - ',
                        value?.to
                    );
                }
            });
    }

    /**
     * Выполняет действия на основе данных обмена.
     * @param name - Тип обмена - exchangeNameEnum.
     * @param exchangeSource - Данные обмена - IExchangeSource.
     */
    public executeExchange(name: exchangeNameEnum, exchangeSource: IExchangeSource): void {
        switch (name) {
            case exchangeNameEnum.ChangeProperty:
                this._handleChangeProperty(exchangeSource);
                break;
            case exchangeNameEnum.RunAction:
                this._handleRunAction(exchangeSource);
                break;
        }
    }

    /**
     * Обрабатывает изменение свойства компонента.
     * @param {IExchangeSource} exchangeSource - Данные обмена.
     *
     * @private
     */
    private _handleChangeProperty(exchangeSource: IExchangeSource): void {
        // @ts-ignore
        if (Object.keys(this).includes(exchangeSource.source.data.name)) {
            const data: IChangeProperty = exchangeSource.source.data as IChangeProperty;


            // @ts-ignore
            const property = this[exchangeSource?.source?.data?.name];

            evo.log.colorWarn(
                'green',
                'exchange',
                'common',
                `Подписка exchange (NgExchangeSubscribeComponent) - у компонента ${this.extendsClassName} свойство - ${property} = ${data.value}`
            );

            // @ts-ignore
            this[exchangeSource.source.data.name] = data.value;
        } else if (evo.isLocalhost) {
            evo.log.colorWarn(
                'red',
                'exchange',
                'common',
                `Подписка exchange (NgExchangeSubscribeComponent) - у компонента ${this.extendsClassName} нет свойства - ${exchangeSource?.source?.data?.name}`
            );
        }
    }
    /**
     * Обрабатывает вызов метода компонента.
     * @param {IExchangeSource} exchangeSource - Данные обмена.
     *
     * @private
     */
    private _handleRunAction(exchangeSource: IExchangeSource): void {
        // @ts-ignore
        if (this[exchangeSource.source.data.name]) {
            const data: IAction = exchangeSource.source.data as IAction;

            // @ts-ignore
            const method = this[exchangeSource?.source?.data?.name];

            evo.log.colorWarn(
                'green',
                'exchange',
                'common',
                `Подписка exchange (NgExchangeSubscribeComponent) - у компонента ${this.extendsClassName} метод, ${method.name} с аргументами `, data.arguments
            );

            // @ts-ignore
            this[exchangeSource.source.data.name](...data.arguments);
        } else if (evo.isLocalhost) {
            evo.log.colorWarn(
                'red',
                'exchange',
                'common',
                `Подписка exchange (NgExchangeSubscribeComponent) - у компонента ${this.extendsClassName} нет метода - ${exchangeSource?.source?.data?.name}`
            );
        }
    }

}
