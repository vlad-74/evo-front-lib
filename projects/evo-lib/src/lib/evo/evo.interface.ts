// evo-lib\src\lib\evo\evo.interface.ts
import {TLoggingAccessType} from './logging/debugger';
import {TEvoLog} from './logging/logger.interface';
import {IDevicesScreen} from './devices-screen/devices-screen';
import {IAwaitTryCatchService} from './await-try-catch/await-try-catch.service';
import {ILighthouse} from './_lighthouse/_lighthouse.interface';
import {ITheme} from './theme/theme.lighthouse';
import {IExchangeSource} from './exchange/exchange.interface';
import {CreatePageService} from './create-page/create-page.service';
import {IData} from './data/data';
import {IPageWidth} from './page-width/page-width.lighthouse';


export type TNullable<T> = T | null;

export type TEvo = {
    isLocalhost: boolean;

    /**  Полная очистка всех подписок и ресурсов */
    destroy: () => void;

    /**  Строка с подсказкой — например, список доступных команд или справка по API */
    help: string;

    /**  Инструменты отладки (например, включение/выключение логов) */
    debug: TLoggingAccessType;

    /**  Система логирования */
    log: TEvoLog;

    /**  Управление экранами устройств */
    devicesScreen: IDevicesScreen;

    /**  Тема интерфейса (цвета, стили и т.д.) */
    theme: ILighthouse<ITheme>;

    /** Система взаимодействия между компонентами */
    exchange: ILighthouse<IExchangeSource>;

    /** Проверка компонентов при extends */
    checkEvo: any;

    /** Сервис для безопасной обработки Promise с централизованной системой ошибок */
    awaitTryCatch: IAwaitTryCatchService;

    /** Сервис для создания страниц */
    createPage: CreatePageService,

    /** Работа с данными */
    data: IData,

    /** Максимальная ширина страницы */
    pageWidth: ILighthouse<IPageWidth>;
};
