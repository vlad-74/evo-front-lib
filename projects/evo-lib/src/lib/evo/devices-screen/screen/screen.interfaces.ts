import {BrowserEnum, OperatingSystemEnum, OrientationScreenEnum, ScreenEnum} from './screen.enum';
import {TNullable} from '../../evo.interface';


/** Тип экрана. */
export type TScreen = ScreenEnum.Desktop | ScreenEnum.Tablet | ScreenEnum.Phone;

/** Тип ориентации экрана. */
export type TOrientation = OrientationScreenEnum.Horizontal | OrientationScreenEnum.Vertical;

/** Интерфейс для информации об экране. */
export interface IScreenInfo {
    devices: {}; // полученный от пользователя конфиг об устройствах
    screen: {
        type: TNullable<TScreen>; // Тип экрана
        orientation: TNullable<TOrientation>; // Ориентация экрана
        options: {
            operatingSystem: TNullable<OperatingSystemEnum>;
            browser: TNullable<BrowserEnum>;
            pixelRatio: TNullable<number>; // сколько физических пикселей используется для отрисовки одного логического пикселя на экране
            proportions: {
                width: TNullable<number>; // Ширина экрана
                height: TNullable<number>; // Высота экрана
                innerWidth: TNullable<number>; // Внутренняя ширина экрана
                innerHeight: TNullable<number>; // Внутренняя высота экрана
            };
            maxSize: TNullable<number>; // Максимальная ширина экрана
        }
    };
}
