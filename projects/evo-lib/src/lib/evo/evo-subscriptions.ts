import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {TEvo} from './evo.interface';


export function setupSubscriptions(evo: TEvo, libraryDestroy$: Subject<void>): void {
    const { devicesScreen, log } = evo;
    const { devices, screen, screenService } = devicesScreen;

    const subscribe = <T>(source$: Observable<T | null>, handler: (value: T) => void) =>
        source$.pipe(
            takeUntil(libraryDestroy$),
            filter((v): v is T => v !== null)
        ).subscribe(handler);

    // Подписка на изменения devices
    subscribe(devices.lighthouse$, (config) => {
        log.colorWarn('green', 'devices', 'common', 'Подписка (setupSubscriptions) на devices', config);

        // На основе config через screen.s.getScreen(config) получаем (и тут же сендим) информацию об экране
        screen.send$(screenService.getScreen(config), 'setupSubscriptions');
    });

    // Подписка на изменения screen
    subscribe(screen.lighthouse$, (config) => {
        log.colorWarn('green', 'screen', 'common', 'Подписка (setupSubscriptions) на screen', config);
    });
}
