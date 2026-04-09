import {TAccessProcess, TLoggingTypes} from './debugger';


/** 1. Цвета для консоли - передаются в функцию логирования */
export type TColor = 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'white' | 'gray';

/** 2. Цвета для консоли - на основе TColor идет присвоение значения */
export const colorStyles: Record<TColor, string> = {
    red: 'background: #ff4444; color: #000000; padding: 0 5px; border-radius: 3px',
    green: 'background: #00ff00; color: #000000; padding: 0 5px; border-radius: 3px',
    blue: 'background: #3399ff; color: #ffffff; padding: 0 5px; border-radius: 3px',
    yellow: 'background: #ffcc00; color: #000000; padding: 0 5px; border-radius: 3px',
    magenta: 'background: #ff44ff; color: #000000; padding: 0 5px; border-radius: 3px',
    cyan: 'background: #00f0ff; color: #000000; padding: 0 5px; border-radius: 3px',
    white: 'background: #eeeeee; color: #000000; padding: 0 5px; border-radius: 3px',
    gray: 'background: #888888; color: #ffffff; padding: 0 5px; border-radius: 3px'
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
    colorWarn: (
        color: TColor,
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ) => void;
    disableAllExceptLogAll: () => void;
    enableAllExceptLogAll: () => void;
};
