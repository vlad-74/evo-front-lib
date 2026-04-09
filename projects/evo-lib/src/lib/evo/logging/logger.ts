import { beforeLogging } from './logger-validator';
import { TLoggingTypes, TAccessProcess, evoLoggingAccessType, loggingTypesArray } from './debugger';
import { colorStyles, TColor } from './logger.interface';

// Счетчики для каждого типа логирования - динамическая инициализация
const messageCounters: Partial<Record<TLoggingTypes, number>> = {};

/**
 * Получает текущее местное время с миллисекундами
 * @returns строка с временем в формате HH:MM:SS.mmm
 */
function getLocalTimeWithMs(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * Увеличивает счетчик для указанного типа логирования
 * @param loggingType - тип логирования
 * @returns текущее значение счетчика
 */
function incrementCounter(loggingType: TLoggingTypes): number {
    const currentValue = messageCounters[loggingType] || 0;
    const newValue = currentValue + 1;
    messageCounters[loggingType] = newValue;
    return newValue;
}

/**
 * Форматирует сообщение для вывода (только для примитивных типов)
 * @param loggingType - тип логирования
 * @param processName - название процесса
 * @param messages - сообщения для логирования
 *
 * @returns объект с префиксом и остальными сообщениями
 */
function buildLogArgs(loggingType: TLoggingTypes, processName: TAccessProcess, messages: unknown[]): [string, ...unknown[]] {
    const localTime = getLocalTimeWithMs();
    const counter = incrementCounter(loggingType);
    // Формат: счетчик --- время --- тип --- [процесс] - сообщение
    const prefix = `${counter} --- ${localTime} --- ${loggingType} --- [${processName}] -`;

    // Первый аргумент - префикс, остальные - исходные сообщения
    return [prefix, ...messages];
}

/**
 * Выключает логирование для всех типов, кроме logAll
 *
 * @example
 * evo.log.disableAllExceptLogAll()
 */
function disableAllExceptLogAll(): void {
    for (const loggingType of loggingTypesArray) {
        if (loggingType !== 'logAll' && evoLoggingAccessType[loggingType]) {
            evoLoggingAccessType[loggingType].accessType = false;
        }
    }
}

/**
 * Включает логирование для всех типов, кроме logAll
 *
 * @example
 * evo.log.enableAllExceptLogAll()
 */
function enableAllExceptLogAll(): void {
    for (const loggingType of loggingTypesArray) {
        if (loggingType !== 'logAll' && evoLoggingAccessType[loggingType]) {
            evoLoggingAccessType[loggingType].accessType = true;
        }
    }
}

/**
 * warn - аналог console.warn с валидацией
 * @param loggingType - тип логирования (logAll, awaitTryCatch)
 * @param processName - название процесса
 * @param messages - сообщения для логирования
 *
 * @example
 * evo.log.warn('logAll', 'common', 'Сообщение предупреждения')
 * evo.log.warn('awaitTryCatch', 'process1', 'Сообщение', 'еще сообщение')
 * evo.log.warn('logAll', 'common', { key: 'value' }, ['array'], new Date())
 */
function warn(
    loggingType: TLoggingTypes,
    processName: TAccessProcess,
    ...messages: unknown[]
): void {
    const validationResult = beforeLogging([loggingType, processName, ...messages]);

    // Если валидация не пройдена - ничего не выводим
    if (!validationResult.validation.isValid) {
        return;
    }

    // Выводим с префиксом, объекты останутся объектами
    const logArgs = buildLogArgs(loggingType, processName, validationResult.restArgs);
    console.warn(...logArgs);
}

/**
 * color - цветное логирование в консоли с валидацией
 * @param colorLog - цвет текста
 * @param loggingType - тип логирования (logAll, awaitTryCatch)
 * @param processName - название процесса
 * @param messages - сообщения для логирования
 *
 * @example
 * evo.log.color('red', 'logAll', 'common', 'Красное сообщение')
 * evo.log.color('green', 'awaitTryCatch', 'process2', 'Зеленое сообщение', { obj: true })
 */
function color(
    colorLog: TColor,
    loggingType: TLoggingTypes,
    processName: TAccessProcess,
    ...messages: unknown[]
): void {
    // Проверяем наличие цвета
    if (!colorStyles[colorLog]) {
        return;
    }

    const validationResult = beforeLogging([loggingType, processName, ...messages]);

    // Если валидация не пройдена - ничего не выводим
    if (!validationResult.validation.isValid) {
        return;
    }

    // Для цветного логирования нужно применить стиль только к префиксу
    const localTime = getLocalTimeWithMs();
    const counter = incrementCounter(loggingType);
    const prefix = `${counter} --- ${localTime} --- ${loggingType} --- [${processName}] -`;
    const styledPrefix = `%c${prefix}`;

    // Первый аргумент - стилизованный префикс, затем стиль, затем остальные сообщения
    console.log(styledPrefix, colorStyles[colorLog], ...validationResult.restArgs);
}

/**
 * info - упрощенное обычное логирование с фиксированными параметрами
 * @param msg - сообщение для логирования
 *
 * @example
 * evo.log.info('Простое сообщение')
 * evo.log.info({ user: 'John', age: 30 })
 */
function info(msg: unknown): void {
    log('logAll', 'common', msg);
}

/**
 * log - обычное логирование с валидацией
 * @param loggingType - тип логирования
 * @param processName - название процесса
 * @param messages - сообщения для логирования
 */
export function log(
    loggingType: TLoggingTypes,
    processName: TAccessProcess,
    ...messages: unknown[]
): void {
    const validationResult = beforeLogging([loggingType, processName, ...messages]);

    if (!validationResult.validation.isValid) {
        return;
    }

    const logArgs = buildLogArgs(loggingType, processName, validationResult.restArgs);
    console.log(...logArgs);
}

/**
 * colorWarn - цветное предупреждение в консоли с валидацией
 * @param colorLog - цвет текста
 * @param loggingType - тип логирования (logAll, awaitTryCatch)
 * @param processName - название процесса
 * @param messages - сообщения для логирования
 *
 * @example
 * evo.log.colorWarn('red', 'logAll', 'common', 'Красное предупреждение')
 * evo.log.colorWarn('orange', 'awaitTryCatch', 'process2', 'Оранжевое предупреждение', { obj: true })
 */
export function colorWarn(
    colorLog: TColor,
    loggingType: TLoggingTypes,
    processName: TAccessProcess,
    ...messages: unknown[]
): void {
    // Проверяем наличие цвета
    if (!colorStyles[colorLog]) {
        return;
    }

    const validationResult = beforeLogging([loggingType, processName, ...messages]);

    // Если валидация не пройдена - ничего не выводим
    if (!validationResult.validation.isValid) {
        return;
    }

    // Для цветного warn применяем стиль только к префиксу
    const localTime = getLocalTimeWithMs();
    const counter = incrementCounter(loggingType);
    const prefix = `- ${counter} - ${localTime} - ${loggingType} / ${processName} -`;
    const styledPrefix = `%c${prefix}`;

    // Используем console.warn вместо console.log
    console.warn(styledPrefix, colorStyles[colorLog], ...validationResult.restArgs);
}

/**
 * Сброс счетчиков для всех типов логирования
 */
export function resetCounters(): void {
    for (const key in messageCounters) {
        if (Object.prototype.hasOwnProperty.call(messageCounters, key)) {
            delete messageCounters[key as TLoggingTypes];
        }
    }
}

/**
 * Получение текущих значений счетчиков
 */
export function getCounters(): Partial<Record<TLoggingTypes, number>> {
    return { ...messageCounters };
}

export const logService = {
    warn,
    color,
    info,
    log,
    colorWarn,
    disableAllExceptLogAll,
    enableAllExceptLogAll,
    resetCounters,
    getCounters
};
