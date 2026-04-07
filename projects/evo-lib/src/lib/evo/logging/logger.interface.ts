import {TAccessProcess, TLoggingTypes} from './debugger';



/** 1. Цвета для консоли - передаются в функцию логирования */
export type TColor = 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'white' | 'gray';

/** 2. Цвета для консоли - на основе TColor идет присвоение значения */
export const colorStyles: Record<TColor, string> = {
    red: 'color: #ff4444',
    green: 'color: #00ff00',
    blue: 'color: #4444ff',
    yellow: 'color: #ffff00',
    magenta: 'color: #ff44ff',
    cyan: 'color: #00ffff',
    white: 'color: #ffffff',
    gray: 'color: #888888'
};

/** Методы логирования */
export type TEvoLog = {
    warn: (
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ) => void;
    color: (
        color: TColor,
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ) => void;
    info: (msg: any) => void;
};
