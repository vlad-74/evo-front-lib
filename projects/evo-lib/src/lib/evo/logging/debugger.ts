/** Режим разработки, для логирования */
export const isLocalhost = window.location.hostname === 'localhost';

// -------------------------------------------------
/** Процесс логирования */
export type TAccessProcess = 'common' | 'process1' | 'process2' | 'process3' | 'process4' | 'process5'  | 'process6' | 'process7' | 'process8' | 'process9' | 'process10';

/** Используется при валидации логирования */
export const accessProcessArray: TAccessProcess[] = [
    'common',
    'process1',
    'process2',
    'process3',
    'process4',
    'process5',
    'process6',
    'process7',
    'process8',
    'process9',
    'process10',
];

// ---------------------------------------------------
/** Интерфейс для каждого поля отладчика */
interface IDebugger {
    accessType: boolean; // доступ к логированию типа
    isLocalhost: boolean; // режим разработки
    accessProcess: TAccessProcess[];
}

// ---------------------------------------------------
/** Типы логирования */
export type TLoggingTypes = 'logAll' | 'awaitTryCatch' | 'devices' | 'screen' | 'theme' | 'exchange';

/** Тип для объекта логирования */
export type TLoggingAccessType = Record<TLoggingTypes, IDebugger>;

/**
 * Инструмент предостваления доступа к логированию ТИПОВ
 *
 * - доступ редостваляется по значению у accessType и у accessProcess
 * - isLocalhost - автоматом получает - от const isLocalhost
 */
export const evoLoggingAccessType: TLoggingAccessType = {
    // logAll - доступ ко ВСЕМУ логированию, может меняться только значение для accessType
    logAll: { accessType: true, accessProcess: ['common'], isLocalhost },
    awaitTryCatch: { accessType: true, accessProcess: ['common'], isLocalhost },
    devices: { accessType: true, accessProcess: ['common'], isLocalhost },
    screen: { accessType: true, accessProcess: ['common'], isLocalhost },
    theme: { accessType: true, accessProcess: ['common'], isLocalhost },
    exchange: { accessType: true, accessProcess: ['common'], isLocalhost },
};

/** Используется при валидации логирования */
export const loggingTypesArray = Object.keys(evoLoggingAccessType) as TLoggingTypes[];
