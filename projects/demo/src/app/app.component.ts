import { Component, OnInit } from '@angular/core';
import {exchangeNameEnum} from 'evo-lib';

/**
 * AppComponent - компонент для дебага библиотеки 'evo-lib'
 *
 * !!! Если непонятки с использованием библиотеки 'evo-lib' - например evo или exchangeNameEnum
 *
 * Удалить node_modules и переустановить
 * Remove-Item -Path node_modules -Recurse -Force npm install
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
    title = 'demo';

    public ngOnInit(): void {
        evo.exchange.l.send(
            {
                from: 'AppComponent',
                to: ['EvoRootLighthousesComponent'],
                source: {
                    name: exchangeNameEnum.ChangeProperty,
                    data: {
                        name: 'exchIsShowLoader',
                        value: null,
                    }
                }
            }
        );
        setTimeout(() => { evo.theme.l.send({name: 'white'}); }, 5000);
        console.log('-----------------------evo!!!', evo);
        // evo.debug.logAll.accessType = false;
        evo.log.color('red', 'logAll', 'common', 'Красное сообщение');
        evo.log.warn('logAll', 'common', '1. Тестовое сообщение');
        // evo.debug.logAwaitTryCatch.accessType = false;
        evo.log.warn('awaitTryCatch', 'common', '2. Тестовое сообщение');

    }

}
