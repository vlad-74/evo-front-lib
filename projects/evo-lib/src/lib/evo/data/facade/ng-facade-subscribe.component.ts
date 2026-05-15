import {Component, OnDestroy} from '@angular/core';

import { Subject,  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {DataOperation, GetDataTypeEnum, IDataFacadeResult} from '../data.interface';


@Component({
    selector: 'evo-facade-subscribe',
    template: '' // Пустой шаблон, так как это базовый класс
})
export abstract  class NgFacadeSubscribeComponent implements OnDestroy {
    private readonly destroyedStorageData$ = new Subject();
    public extendsClassName = '';
    public dataPage: { [key in DataOperation]?: any } = {};

    protected constructor(
    ) {}

    protected initializeFacade(
        extendsClassName: string,
        services: {
            request: any;
            server: any;
            parsed: any;
            factory: any;
        }
    ): void {
        this.extendsClassName = extendsClassName;
        this._setServicesForFacade(services);
        this._initEvoAng();
    }

    public ngOnDestroy(): void {
        evo.data.services = null;

        this.destroyedStorageData$.next();
        this.destroyedStorageData$.complete();
    }


    private _initEvoAng(): void {
        if (evo.isLocalhost) {
            evo._checkEvo.checkLogClassName(this);

            evo._checkEvo.checkLogNgOnDestroy(this);
        }

        this._subscribeStorageData();
    }

    /** Подписываемся на изменения в  evo.data.storageData.lighthouse$ (Обменный пункт) */
    private _subscribeStorageData(): void {
        evo.data.storageData.lighthouse$
            .pipe(takeUntil(this.destroyedStorageData$))
            .subscribe((value: any) => {
                this._checkSubscribeAggregatorData(value);
            });
    }

    /**
     * Проверяет входящие данные перед агрегацией и определяет, нужно ли обрабатывать текущее сообщение.
     *
     * Метод выполняет:
     * - Валидацию наличия `extendsClassName` и `data.name`.
     * - Проверку соответствия получателя (`data.to`) текущему компоненту:
     *   - глобальный получатель (`forAllClasses`)
     *   - точное совпадение с именем компонента
     *   - имя компонента входит в список получателей (через includes)
     *
     * @param value - Объект данных, полученный из потока.
     *
     */
    private _checkSubscribeAggregatorData(value: any): void {

        if (!value) { return; }

        if (!this.extendsClassName || !value?.returnType || !value?.dataOperation) {
            throw new Error(`Ошибка в NgFacadeSubscribeComponent`);
        }

        if (
            this.extendsClassName
            && value?.to
            && value.to === this.extendsClassName
        ) {
            this._aggregatorData(value);
        }
    }

    private _getReturnType(data: IDataFacadeResult): GetDataTypeEnum {
        return data.returnType === GetDataTypeEnum.Add ? GetDataTypeEnum.Add : GetDataTypeEnum.New;
    }

    /**
     * Агрегирует входящие данные в объект dataPage.
     *
     * Присваивает значение из `data.result` под ключом `data.type`.
     *
     * @param data - Объект с данными, сгруппированные по `data.type`.
     */
    private _aggregatorData(data: IDataFacadeResult): void {
        if (data?.dataOperation) {
            const returnType = this._getReturnType(data);

            if (returnType === GetDataTypeEnum.New) {
                this.dataPage[data.dataOperation] = data?.result ?? null;
            } else {
                if (returnType === GetDataTypeEnum.Add && !Array.isArray(data?.result)) {
                    throw new Error(`Ожидался массив для добавления, получено: ${typeof data?.result} - ${data?.result}`);
                }

                const current = Array.isArray(this.dataPage[data.dataOperation]) ? this.dataPage[data.dataOperation] : [];
                const incoming = Array.isArray(data?.result) ? data.result : [];

                this.dataPage[data.dataOperation] = [...current, ...incoming];
            }

            this.onChangeViewData(data.dataOperation);
        }

    }

    /**
     * Информирование страницы
     * - для какого типа данных произошли изменения
     * - инициируется из _aggregatorData - когда данные уже получены
     *
     * @param itemDataName - Типа данных.
     */
    public onChangeViewData(itemDataName: DataOperation): void {
        throw new Error(`В компоненте ${this.extendsClassName} реализуйте метод - onChangeViewData(itemDataName) для ` + itemDataName);
    }

    /**
     * Инициализирует фасад данных, устанавливая зависимости для
     * - формирования запроса на основе данных фильтров,
     * - получения данных с сервера,
     * - парсингом полученных с сервера данных,
     * - преобразованием данных для html.
     */
    private _setServicesForFacade(services: { request: any; server: any; parsed: any; factory: any }): void {
        if (!evo.data.services) {
            evo.data.services = {
                request:  services.request,
                server:  services.server,
                parsed: services.parsed,
                factory:  services.factory,
            };
        }
    }
}
