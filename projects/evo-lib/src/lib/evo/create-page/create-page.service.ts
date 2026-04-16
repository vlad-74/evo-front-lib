// evo-lib\src\lib\evo\page\page.service.ts
import { ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import { ResolverProviderService } from './resolver-provider.service';

// --- Интерфейсы ---

/**
 * Конфигурация для создания компонента
 */
export interface ICreatePage {
    component: any;                    // Компонент для создания
    viewContainerRef: ViewContainerRef; // Контейнер (только напрямую!)
    isMultiPage: boolean;              // Сохранить предыдущие?
    inputs?: { [key: string]: any };   // @Input() значения
    outputs?: { [key: string]: (event: any) => void }; // @Output() подписки
}

/**
 * Сервис для динамического создания компонентов
 */
@Injectable()
export class CreatePageService {
    public readonly componentRefs = new WeakMap<ViewContainerRef, ComponentRef<any>[]>();

    // Конструктор с необязательным инъектированием (для совместимости с `new PageService()`)
    constructor(
        private resolverProvider?: ResolverProviderService
    ) {
        if (!resolverProvider) {
            console.error('ResolverProviderService должен быть внедрён. Убедитесь, что используется DI.');
        }
    }

    /**
     * Создаёт компонент в указанном контейнере
     */
    public send(config: ICreatePage): void {
        const cfr = this.resolverProvider?.getComponentFactoryResolver();
        if (!cfr) {
            throw new Error('ComponentFactoryResolver недоступен.');
        }

        const { component, viewContainerRef: vcr, isMultiPage, inputs, outputs } = config;

        if (!vcr?.createComponent) {
            console.error('Invalid ViewContainerRef provided');
            return;
        }

        if (!this.componentRefs.has(vcr)) {
            this.componentRefs.set(vcr, []);
        }

        if (!isMultiPage) {
            this.clearContainer(vcr);
        }

        const componentRef = vcr.createComponent(
            cfr.resolveComponentFactory(component)
        );

        // 👉 проброс служебных ссылок - нужно указать в компоненте
        // private __componentRef!: ComponentRef<any>;
        // private __vcr!: ViewContainerRef;
        Object.assign(componentRef.instance as any, {
            __componentRef: componentRef,
            __vcr: vcr
        });

        // 👉 сохраняем ссылку
        // tslint:disable-next-line:no-non-null-assertion
        this.componentRefs.get(vcr)!.push(componentRef);

        // 👉 inputs
        if (inputs) {
            Object.assign(componentRef.instance, inputs);
        }

        // 👉 outputs
        if (outputs) {
            for (const [key, handler] of Object.entries(outputs)) {
                const emitter = (componentRef.instance as any)[key];
                if (emitter?.subscribe) {
                    const sub = emitter.subscribe(handler);
                    componentRef.onDestroy(() => sub.unsubscribe());
                }
            }
        }

        evo.log.colorWarn(
            'blue',
            'createPage',
            'common',
            'В PageService - создан компонент ',
            component.name
        );
    }

    /**
     * Удаляет конкретный компонент из контейнера
     * Пример использования в компоненте
     * private __componentRef!: ComponentRef<any>;
     * private __vcr!: ViewContainerRef;
     *
     * close(): void {
     *     this.pageService.removeComponent(this.__vcr, this.__componentRef);
     * }
     */
    public removeComponent(
        vcr: ViewContainerRef,
        componentRef: ComponentRef<any>
    ): void {
        const refs = this.componentRefs.get(vcr);

        if (!refs || refs.length === 0) {
            return;
        }

        const index = refs.indexOf(componentRef);

        if (index === -1) {
            console.warn('ComponentRef не найден в контейнере');
            return;
        }

        // Удаляем из ViewContainerRef
        vcr.remove(vcr.indexOf(componentRef.hostView));

        // Уничтожаем компонент
        componentRef.destroy();

        // Удаляем из массива
        refs.splice(index, 1);
    }

    /**
     * Удаляет все компоненты из контейнера
     */
    public clearContainer(vcr: ViewContainerRef): void {
        const refs = this.componentRefs.get(vcr);
        if (refs) {
            refs.forEach(ref => ref.destroy());
            refs.length = 0;
        }
        vcr.clear();
    }

    /**
     * Получить текущие компоненты в контейнере
     */
    public getComponents(vcr: ViewContainerRef): ComponentRef<any>[] {
        return this.componentRefs.get(vcr) || [];
    }
}
