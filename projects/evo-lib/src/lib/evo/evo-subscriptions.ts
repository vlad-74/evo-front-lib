import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {TEvo} from './evo.interface';
import {IFacade} from './data/facade.lighthouse';
import {IDevices} from './devices-screen/devices/devices';


export function setupSubscriptions(evo: TEvo, libraryDestroy$: Subject<void>): void {
    const { devicesScreen, log, data } = evo;

    const { devices, screen, screenService } = devicesScreen;
    const { facade, dataWorker } = data;

    const subscribe = <T>(source$: Observable<T | null>, handler: (value: T) => void) =>
        source$.pipe(
            takeUntil(libraryDestroy$),
            filter((v): v is T => v !== null)
        ).subscribe(handler);

    // Подписка на изменения devices
    subscribe(devices.lighthouse$, (config) => {
        log.colorWarn(
            'green',
            'devices',
            'common',
            'Подписка (setupSubscriptions) на devices',
            config
        );

        // На основе config через screen.s.getScreen(config) получаем (и тут же сендим) информацию об экране
        screen.send$(screenService.getScreen(config), 'setupSubscriptions');
    });

    // Подписка на изменения screen
    subscribe(screen.lighthouse$, (config) => {
        log.colorWarn(
            'green',
            'screen',
            'common',
            'Подписка (setupSubscriptions) на screen',
            config
        );
    });

    // Подписка на изменения facade
    subscribe(facade.lighthouse$, (config: IFacade) => {
        log.colorWarn(
            'green',
            'facade',
            'common',
            'Подписка (setupSubscriptions) на facade',
            config
        );

        // Получаем данные при помощи evo.data.services
        dataWorker.run(config);
    });
}

export function initDevicesSizes(): void {
    const devices =  evo.devicesScreen.devices.lighthouse$.getValue();

    evo.devicesScreen.devices.send$(devices as IDevices, 'initDevicesSizes');
}
