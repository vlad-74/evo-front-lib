import {accessProcessArray, evoLoggingAccessType, isLocalhost, loggingTypesArray, TAccessProcess, TLoggingTypes} from './debugger';

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

    // 1. Первая и главная проверка: isLocalhost
    if (!isLocalhost) {
        return { isValid: false };
    }

    // 2. Логирование если разрешено ОБЩЕЕ логирование
    if (! evoLoggingAccessType.logAll.accessType) {
        return { isValid: false };
    }

    // 3. Получаем конфигурацию для указанного типа
    const debugConfig = evoLoggingAccessType[loggingType];

    if (!debugConfig) {
        return { isValid: false };
    }

    // 3. Проверка accessType для конкретного типа логирования
    if (!debugConfig.accessType) {
        return { isValid: false };
    }

    // 4. Проверка, что processName есть в списке разрешенных
    if (!debugConfig.accessProcess || debugConfig.accessProcess.length === 0) {
        return { isValid: false };
    }

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
    // Проверяем минимальное количество аргументов
    if (args.length < 2) {
        return {
            validation: { isValid: false },
            restArgs: []
        };
    }

    const loggingType = args[0] as TLoggingTypes;
    const processName = args[1] as TAccessProcess;
    const messages = args.slice(2);

    // Валидируем, что loggingType существует в loggingTypesArray
    if (!loggingTypesArray.includes(loggingType)) {
        return {
            validation: { isValid: false },
            restArgs: messages
        };
    }

    // Валидируем, что processName существует в accessProcessArray
    if (!accessProcessArray.includes(processName)) {
        return {
            validation: { isValid: false },
            restArgs: messages
        };
    }

    // Выполняем основную валидацию
    const validation = validateLogging(loggingType, processName);

    return { validation, restArgs: messages };
}
