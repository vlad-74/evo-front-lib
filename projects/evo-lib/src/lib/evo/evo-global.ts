import { Subject } from 'rxjs';

import {evoLoggingAccessType} from './logging/debugger';
import {logService} from './logging/logger';
import {DevicesScreen} from './devices-screen/devices-screen';
import {Theme} from './theme/theme';
import {devices} from './devices-screen/devices/devices';
import {setupSubscriptions} from './evo-subscriptions';
import {TEvo} from './evo.interface';


// ------------------------------

const libraryDestroy$ = new Subject<void>();

// Этап 1: базовая инициализация (debug и log)
const evoStart = {
    // Метод для отписки от всех подписок и для очистки window.evo
    destroy(): void {
        libraryDestroy$.next();
        libraryDestroy$.complete();

        // Дополнительно очищаем ссылку на evo из window
        if ((window as any).evo === this) {
            delete (window as any).evo;
        }

        console.log('EVO destroyed - subscriptions & window');
    },
    // настройка логирования
    debug: evoLoggingAccessType,
    // логирование
    log: logService,
};

// Этап 2: полная инициализация с остальными полями
export const evoBase: TEvo = {
    ...evoStart,
    help: 'раздел в разработке',
    // информация об экране на основе предоставленной информации о девайсах
    devicesScreen:  new DevicesScreen(),
    theme: new Theme(),
};

(window as any).evo = evoBase;

// ------------------------------

// Настройка подписок
setupSubscriptions(evoBase, libraryDestroy$);

// Эмитим (отправляем) начальную конфигурацию устройств в итоге получаем информацию об Экране
evoBase.devicesScreen.devices.l.send(devices);



