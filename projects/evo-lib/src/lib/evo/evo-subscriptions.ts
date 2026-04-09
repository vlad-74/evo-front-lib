import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {TEvo} from './evo.interface';


export function setupSubscriptions(evo: TEvo, libraryDestroy$: Subject<void>): void {
    const { devicesScreen, log } = evo;
    const { devices, screen } = devicesScreen;

    const subscribe = <T>(source$: Observable<T | null>, handler: (value: T) => void) =>
        source$.pipe(
            takeUntil(libraryDestroy$),
            filter((v): v is T => v !== null)
        ).subscribe(handler);

    // Подписка на изменения devices
    subscribe(devices.l.lighthouse$, (config) => {
        log.colorWarn('green', 'devices', 'common', 'Подписка на devices - ', config);

        // На основе config через screen.s.getScreen(config) получаем (и тут же сендим) информацию об экране
        screen.l.send(screen.s.getScreen(config));
    });

    // Подписка на изменения screen
    subscribe(screen.l.lighthouse$, (config) => {
        log.colorWarn('green', 'screen', 'common', 'Подписка на screen - ', config);
    });
}
