import {ComponentFactoryResolver, ComponentRef, EventEmitter, ViewContainerRef} from '@angular/core';
import {ResolverProviderService} from './resolver-provider.service';

export enum ContainerName {
    List = 'containerList',
    Detail = 'containerDetail',
    Modal = 'containerModal'
}

/** Интерфейс для создания страницы. */
export interface ICreatePage {
    component: any; // класс компонента
    viewContainerRef: TViewContainerRef; // контейнер для создания компонента
    isMultiPage: boolean; // при true - сохранить при создании предыдущую страницу при создании новой страницы
    type?: ContainerName; // текстовое наименование контейнера для создания компонента
    inputs?: { [key: string]: any };
    outputs?: { [key: string]: (event: any) => void };
    data?: any; // Данные для создания компонента
    options?: { }; // любые данные для создания страницы из компонента
}

/** Контейнер в котором будет создаваться страница (компонент) в EvoDispatcherComponent */
export type TViewContainerRef = ContainerName | ViewContainerRef;

// Добавляем интерфейс для компонента с подписками
interface ComponentWithSubscriptions {
    _subscriptions?: any[];
    [key: string]: any;
}

export interface IPageService {
    containerList: ViewContainerRef;
    containerDetail: ViewContainerRef;
    containerModal: ViewContainerRef;

    getViewContainerRef: (containerName: ContainerName) => ViewContainerRef;
    componentFactoryResolver: ComponentFactoryResolver | null;
    componentRefs: WeakMap<ViewContainerRef, ComponentRef<any>>;

    /**
     * Утилита для получения ViewContainerRef по строковому ключу или возврата напрямую.
     * Используется в динамических операциях с компонентами.
     *
     * @param viewContainerRef - строка (ключ) или напрямую ViewContainerRef
     *
     * @returns разрешённый ViewContainerRef или null
     */
    resolveViewContainerRef(
        viewContainerRef: ContainerName | ViewContainerRef | null,
    ): ViewContainerRef | null;

    /**
     * Динамически создаёт компонент в указанном контейнере.
     * Поддерживает передачу @Input() и подписку на @Output().
     *
     * @param page - Конфигурация для создания компонента
     */
    createPage(page: ICreatePage): void;

    /**
     * Удаляет динамически созданный компонент из указанного контейнера.
     * Принимает либо ViewContainerRef, либо строковой ключ,
     * который разрешается через _getViewContainerRef контекста.
     *
     * @param viewContainerRef - строка (ключ) или ViewContainerRef
     */
    deletePage(
        viewContainerRef: ContainerName | ViewContainerRef | null,
    ): void;

    getComponentRef(viewContainerRef: ViewContainerRef): ComponentRef<any> | null;
}

/** PageService - Участвует в процессах создания и удаления страниц в EVO */
export class PageService implements IPageService {
    // Добавляем definite assignment assertion или инициализируем в конструкторе
    public containerList!: ViewContainerRef;
    public containerDetail!: ViewContainerRef;
    public containerModal!: ViewContainerRef;

    public componentFactoryResolver: ComponentFactoryResolver | null = null;

    // Храним ссылки на созданные компоненты
    public componentRefs = new WeakMap<ViewContainerRef, ComponentRef<any>>();

    constructor() {
        this.componentFactoryResolver = ResolverProviderService.getResolver();
    }

    //region Публичные методы

    public resolveViewContainerRef(
        viewContainerRef: ContainerName | ViewContainerRef | null,
    ): ViewContainerRef | null {
        if (typeof viewContainerRef === 'string') {
            return this.getViewContainerRef(viewContainerRef);
        }
        if (this._isViewContainerRef(viewContainerRef)) {
            return viewContainerRef;
        }
        return null;
    }

    public createPage(page: ICreatePage): void {
        if (!this.componentFactoryResolver) { return; }

        if (!page.component) {
            throw new Error('Не указан компонент для создания страницы');
        }

        const viewContainerRef = page.viewContainerRef as ViewContainerRef;

        if (!page.isMultiPage) {
            // Удаляем предыдущий компонент, если он существует
            this.deletePage(viewContainerRef);
        }

        // Создать компонент динамически - Используем ComponentFactoryResolver
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(page.component);
        const componentRef = (page.viewContainerRef as ViewContainerRef).createComponent(componentFactory);

        // Присваеиваем класс для коспонента который будет создан
        // const nativeElement = componentRef.location.nativeElement;
        // nativeElement.style.zIndex = page.type === 'containerModal' ? 300000
        //     : page.type === 'containerDetail' ? 200000 : 100000;


        // Сохраняем ссылку
        this.componentRefs.set(viewContainerRef, componentRef);

        // Передача @Input()
        const inputs = {
            ...page.inputs,
            $componentRef: componentRef, // <-- добавляем реф для дальнейшего использовании при удалении компонента
        };

        // Передача @Input()
        if (inputs) {
            Object.keys(inputs).forEach(input => {
                // @ts-ignore
                componentRef.instance[input] = inputs[input];
            });
        }

        // Обработка @Output()
        if (page?.outputs) {
            Object.keys(page.outputs).forEach(output => {
                // @ts-ignore
                const eventEmitter: EventEmitter<any> = componentRef.instance[output];
                // tslint:disable-next-line:no-non-null-assertion
                const handler = page.outputs![output];

                if (eventEmitter && eventEmitter instanceof EventEmitter && handler) {
                    const subscription = eventEmitter.subscribe((event: any) => handler(event));
                    // Сохраняем подписку для отписки при уничтожении

                    const instance = componentRef.instance as ComponentWithSubscriptions;

                    if (!instance._subscriptions) {

                        instance._subscriptions = [];
                    }
                    instance._subscriptions.push(subscription);

                    // Автоматическая отписка при уничтожении компонента
                    componentRef.onDestroy(() => {
                        subscription.unsubscribe();
                    });
                } else {
                    console.warn(`Output '${output}' not found or is not an EventEmitter on component`, componentRef.instance);
                }
            });
        }
    }

    public deletePage(
        viewContainerRef: ContainerName | ViewContainerRef | null,
    ): void {
        const resolvedVcr = this.resolveViewContainerRef(viewContainerRef);

        if (!resolvedVcr) {
            if (viewContainerRef) {
                console.warn(`Не удалось разрешить ViewContainerRef для:`, viewContainerRef);
            }
            return;
        }

        const componentRef = this.componentRefs.get(resolvedVcr);

        if (componentRef) {
            // Отписываемся от всех событий перед уничтожением
            const instance = componentRef.instance as ComponentWithSubscriptions;
            if (instance._subscriptions) {
                instance._subscriptions.forEach(subscription => {
                    if (subscription && typeof subscription.unsubscribe === 'function') {
                        subscription.unsubscribe();
                    }
                });
            }

            componentRef.destroy();
            this.componentRefs.delete(resolvedVcr);
        }

        // Очищаем контейнер на всякий случай
        resolvedVcr.clear();
    }

    public getComponentRef(viewContainerRef: ViewContainerRef): ComponentRef<any> | null {
        return this.componentRefs.get(viewContainerRef) || null;
    }

    public getViewContainerRef(containerName: ContainerName): ViewContainerRef {
        switch (containerName) {
            case ContainerName.List:
                return this.containerList;
            case ContainerName.Detail:
                return this.containerDetail;
            case ContainerName.Modal:
                return this.containerModal;
            default:
                throw new Error(`Unknown container: ${containerName}`);
        }
    }

    // Эти методы требуют дополнительной реализации или импорта
    // public sendLighthouse(item: ICreatePage): void {
    //     evo.page$.send(item);
    // }

    // public getLighthouseValue(): ICreatePage {
    //     return evoLighthouse.page$.lighthouse$.value;
    // }

    /**
     * Проверяет, является ли значение экземпляром ViewContainerRef
     */
    private _isViewContainerRef(value: any): value is ViewContainerRef {
        return value && typeof value.createEmbeddedView === 'function';
    }

    //endregion
}

// Для использования класса PageService нужно передать зависимости в конструктор:
// const PageService = new PageService(containerList, containerDetail, containerModal, componentFactoryResolver);
