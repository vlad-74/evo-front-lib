// Основной тип, описывающий объект `evo`, который будет доступен в глобальном `window.evo`
import {TLoggingAccessType} from './logging/debugger';
import {TEvoLog} from './logging/logger.interface';
import {IDevicesScreen} from './devices-screen/devices-screen';
import {IEvoTheme} from './theme/theme';

export type TNullable<T> = T | null;

export type TEvo = {
  // Полная очистка всех подписок и ресурсов
  destroy: () => void;

  // Строка с подсказкой — например, список доступных команд или справка по API
  help: string;

  // Инструменты отладки (например, включение/выключение логов)
  debug: TLoggingAccessType;

  // Система логирования
  log: TEvoLog;

  // Управление экранами устройств
  devicesScreen: IDevicesScreen;

  // Тема интерфейса (цвета, стили и т.д.)
  theme: IEvoTheme;
};
