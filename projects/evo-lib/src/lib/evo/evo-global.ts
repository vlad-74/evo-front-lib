// evo-lib\src\lib\evo\evo-global.ts
import { Subject } from 'rxjs';

import {evoLoggingAccessType, isLocalhost} from './logging/debugger';
import {logService} from './logging/logger';
import {DevicesScreen} from './devices-screen/devices-screen';
import {devices} from './devices-screen/devices/devices';
import {setupSubscriptions} from './evo-subscriptions';
import {TEvo} from './evo.interface';
import {CheckEvoWorker} from './workers/validations.worker';
import {AwaitTryCatchService} from './await-try-catch/await-try-catch.service';
import {ThemeLighthouse} from './theme/theme.lighthouse';
import {ExchangeLighthouse} from './exchange/exchange.lighthous';
import {ICreatePage, PageService} from './page/page.service';
import {ViewContainerRef} from '@angular/core';

// Сохраняем экземпляр, созданный через DI

let pageService: PageService;

export function setPageService(instance: PageService): void {
    pageService = instance;
}


// ------------------------------

const libraryDestroy$ = new Subject<void>();

// Этап 1: базовая инициализация (debug и log)
const evoStart = {
    /**  Полная очистка всех подписок и ресурсов */
    destroy(): void {
        libraryDestroy$.next();
        libraryDestroy$.complete();

        // Дополнительно очищаем ссылку на evo из window
        if ((window as any).evo === this) {
            delete (window as any).evo;
        }

        console.log('EVO destroyed - subscriptions & window');
    },

    isLocalhost,

    /**  Инструменты отладки (например, включение/выключение логов) */
    debug: evoLoggingAccessType,

    /**  Система логирования */
    log: logService,
};


// Этап 2: полная инициализация с остальными полями
export const evoBase: TEvo = {
    ...evoStart,
    help: 'раздел в разработке',

    /**  Управление экранами устройств */
    devicesScreen:  new DevicesScreen(),

    /**  Тема интерфейса (цвета, стили и т.д.) */
    theme: new ThemeLighthouse(),

    /** Система взаимодействия между компонентами */
    exchange: new ExchangeLighthouse(),

    /** Проверка компонентов при extends */
    checkEvo: new CheckEvoWorker(),

    /** Сервис для безопасной обработки Promise с централизованной системой ошибок */
    awaitTryCatch: new AwaitTryCatchService(),

    /** Сервис для создания страниц */
    createPage: {
        send: (config: ICreatePage) => pageService.send(config),
        clearContainer: (vcr: ViewContainerRef) => pageService.clearContainer(vcr),
    } as PageService
};


(window as any).evo = evoBase;

// ------------------------------

// Настройка подписок
setupSubscriptions(evoBase, libraryDestroy$);

// Эмитим (отправляем) начальную конфигурацию устройств в итоге получаем информацию об Экране
evoBase.devicesScreen.devices.send$(devices, 'старт - evo-global!!!');
