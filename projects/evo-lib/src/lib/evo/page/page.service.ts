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
export class PageService {
    public readonly componentRefs = new WeakMap<ViewContainerRef, ComponentRef<any>[]>();

    // Конструктор с необязательным инъектированием (для совместимости с `new PageService()`)
    constructor(private resolverProvider?: ResolverProviderService) {
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
            throw new Error('ComponentFactoryResolver недоступен. Проверьте инициализацию EvoLibModule.');
        }

        const { component, viewContainerRef, isMultiPage, inputs, outputs } = config;

        if (!viewContainerRef || typeof viewContainerRef.createEmbeddedView !== 'function') {
            console.error('Invalid ViewContainerRef provided');
            return;
        }

        const vcr = viewContainerRef;

        // Инициализируем массив ссылок
        if (!this.componentRefs.has(vcr)) {
            this.componentRefs.set(vcr, []);
        }

        // Удаляем предыдущие компоненты, если isMultiPage === false
        if (!isMultiPage) {
            this.clearContainer(vcr);
        }

        if (!cfr) {
            console.error('ComponentFactoryResolver недоступен. Убедитесь, что EvoLib инициализирован.');
            return;
        }

        const factory = cfr.resolveComponentFactory(component);
        const componentRef = vcr.createComponent(factory);

        // Сохраняем ссылку
        // tslint:disable-next-line:no-non-null-assertion
        const refs = this.componentRefs.get(vcr)!;
        refs.push(componentRef);

        // Передаём @Input()
        if (inputs) {
            Object.keys(inputs).forEach(key => {
                (componentRef.instance as any)[key] = inputs[key];
            });
        }

        // Подписываемся на @Output()
        if (outputs) {
            Object.keys(outputs).forEach(outputName => {
                const emitter = (componentRef.instance as any)[outputName];
                const handler = outputs[outputName];

                if (emitter && typeof emitter.subscribe === 'function') {
                    const subscription = emitter.subscribe(handler);
                    componentRef.onDestroy(() => subscription.unsubscribe());
                }
            });
        }
        evo.log.colorWarn('white', 'createPage', 'common', 'В PageService - создан компонент ', component.name);
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
