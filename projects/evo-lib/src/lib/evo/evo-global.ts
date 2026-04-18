// evo-lib\src\lib\evo\evo-global.ts
import { Subject } from 'rxjs';

import {evoLoggingAccessType, isLocalhost} from './logging/debugger';
import {logService} from './logging/logger';
import {DevicesScreen} from './devices-screen/devices-screen';
import {startDevices} from './devices-screen/devices/devices';
import {initDevicesSizes, setupSubscriptions} from './evo-subscriptions';
import {TEvo} from './evo.interface';
import {CheckEvoWorker} from './workers/validations.worker';
import {AwaitTryCatchService} from './await-try-catch/await-try-catch.service';
import {ThemeLighthouse} from './theme/theme.lighthouse';
import {ExchangeLighthouse} from './exchange/exchange.lighthous';
import {ICreatePage, CreatePageService} from './create-page/create-page.service';
import {ViewContainerRef} from '@angular/core';
import {Data} from './data/data';
import {PageWidthLighthouse} from './page-width/page-width.lighthouse';

// Сохраняем экземпляр, созданный через DI

let pageService: CreatePageService;

export function setPageService(instance: CreatePageService): void {
    pageService = instance;
}


// ------------------------------

const libraryDestroy$ = new Subject<void>();

// Этап 1: базовая инициализация (debug и log)
const evoStart = {
    /**
     * Полная очистка всех подписок и ресурсов
     *
     * Если приложение не вызовет destroy(), подписки останутся активными на ВСЁ ВРЕМЯ ЖИЗНИ СТРАНИЦЫ.
     */
    destroy(): void {
        libraryDestroy$.next();
        libraryDestroy$.complete();

        // Дополнительно очищаем ссылку на evo из window
        if ((window as any).evo === this) {
            delete (window as any).evo;
        }

        console.log('EVO destroyed - subscriptions & window');

        window.removeEventListener('resize', resizeHandler);
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
    } as CreatePageService,

    /** Работа с данными */
    data: new Data(),

    /** Максимальная ширина страницы */
    pageWidth: new PageWidthLighthouse()
};


(window as any).evo = evoBase;

// ------------------------------

// Настройка подписок
setupSubscriptions(evoBase, libraryDestroy$);

// Эмитим (отправляем) начальную конфигурацию устройств в итоге получаем информацию об Экране
// evoBase.devicesScreen.devices.send$(devices, 'старт - evo-global!!!');

// ------------------------------
/**
 * Обработчик события изменения размера окна.
 *
 * Асинхронно пересчитывает параметры экрана при каждом resize.
 *
 */

// функция для "изменения (resize) экрана"
const resizeHandler = async () => { await initDevicesSizes(); };

// Подписываемся на событие resize
window.addEventListener('resize', resizeHandler);

// Эмитим (отправляем) начальную конфигурацию устройств в итоге получаем информацию об Экране
evoBase.devicesScreen.devices.send$(startDevices, 'СТАРТ DEVICES');

evo.pageWidth.send$({maxPageWidth: 3000});

// ------------------------------
