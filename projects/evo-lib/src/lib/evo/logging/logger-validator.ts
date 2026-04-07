import { accessProcessArray, evoLoggingAccessType, loggingTypesArray } from './debugger';
import { TAccessProcess, TLoggingTypes } from './debugger';

/**
 * Результат валидации сообщения для логирования
 */
interface IValidationResult {
    isValid: boolean;
}

/**
 * Проверяет, разрешено ли логирование для указанного типа и процесса
 * @param loggingType - тип логирования
 * @param processName - название процесса
 * @returns результат валидации
 */
export function validateLogging(
    loggingType: TLoggingTypes,
    processName: TAccessProcess
): IValidationResult {
    // Получаем конфигурацию для указанного типа
    const debugConfig = evoLoggingAccessType[loggingType];

    if (!debugConfig) {
        return { isValid: false };
    }

    // 1. Проверка isLocalhost - логирование работает ТОЛЬКО на localhost
    if (!debugConfig.isLocalhost) {
        return { isValid: false };
    }

    // 2. Проверка accessType
    if (!debugConfig.accessType) {
        return { isValid: false };
    }

    // 3. Проверка accessProcess (не должен быть пустым)
    if (!debugConfig.accessProcess || debugConfig.accessProcess.length === 0) {
        return { isValid: false };
    }

    // 4. Проверка, что processName есть в списке разрешенных
    if (!debugConfig.accessProcess.includes(processName)) {
        return { isValid: false };
    }

    return { isValid: true };
}

/**
 * Универсальная функция проверки перед логированием
 * @param args - аргументы функции логирования (loggingType, processName, ...messages)
 * @returns объект с результатом валидации и остальными аргументами
 */
export function beforeLogging(args: unknown[]): { validation: IValidationResult; restArgs: unknown[] } {
    if (args.length < 2) {
        return {
            validation: { isValid: false },
            restArgs: []
        };
    }

    const loggingType = args[0] as TLoggingTypes;
    const processName = args[1] as TAccessProcess;
    const messages = args.slice(2);

    // Валидируем типы
    const validLoggingTypes: TLoggingTypes[] = loggingTypesArray;
    const validProcessNames: TAccessProcess[] = accessProcessArray;

    if (!validLoggingTypes.includes(loggingType)) {
        return {
            validation: { isValid: false },
            restArgs: args
        };
    }

    if (!validProcessNames.includes(processName)) {
        return {
            validation: { isValid: false },
            restArgs: args
        };
    }

    const validation = validateLogging(loggingType, processName);

    return { validation, restArgs: messages };
}
