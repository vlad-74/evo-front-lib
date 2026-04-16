// start-component.service.ts
import {ApplicationRef, Injectable, Type} from '@angular/core';

@Injectable()
export class StartComponentService {
    private startupComponent: Type<any> | null = null;

    constructor(private appRef: ApplicationRef) {}

    detectBootstrapComponents(): void {
        if (this.appRef.components.length > 0) {
            this.startupComponent = this.appRef.components[0].componentType;

            // Проверка наличия ngOnDestroy и evo.destroy()
            if (!this.hasProperOnDestroy(this.startupComponent)) {
                console.log('Startup component:', this.startupComponent?.name);
                evo.log.colorWarn('red',
                    'logAll',
                    'common',
                    ` В ngOnDestroy компонента ${this.startupComponent?.name} реализуйте evo.destroy(); Это необходимо для реализации "отписок в библиотеке evo"`
                );
            }
        }
    }

    private hasProperOnDestroy(componentType: Type<any> | null): boolean {
        if (!componentType) { return false; }

        // Получаем прототип компонента
        const prototype = componentType.prototype;

        // Проверяем наличие метода ngOnDestroy
        if (!prototype.ngOnDestroy || typeof prototype.ngOnDestroy !== 'function') {
            return false;
        }

        // Получаем тело функции ngOnDestroy
        const ngOnDestroyBody = prototype.ngOnDestroy.toString();

        // Проверяем наличие вызова evo.destroy()
        // Паттерны для поиска: evo.destroy()
        return /evo\s*\.\s*destroy\s*\(/.test(ngOnDestroyBody);
    }

    getStartupComponent(): Type<any> | null {
        return this.startupComponent;
    }
}
