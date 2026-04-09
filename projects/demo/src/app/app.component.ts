import { Component, OnInit } from '@angular/core';
import {exchangeNameEnum} from 'evo-lib';
import {RestService} from './service/rest.service';


/**
 * AppComponent - компонент для дебага библиотеки 'evo-lib'
 *
 * !!! Если непонятки с использованием библиотеки 'evo-lib' - например evo или exchangeNameEnum
 *
 * Удалить node_modules и переустановить
 */

/*
Remove-Item -Path node_modules -Recurse -Force
npm install
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'demo';

    public constructor(
        public rest: RestService,
    ) {}

    public async ngOnInit(): Promise<void> {

        // evo.debug.logAll.accessType = false;

        setTimeout(() => {
                evo.theme.l.send({name: 'white'});

                evo.exchange.l.send(
                    {
                        from: 'AppComponent',
                        to: ['ChildComponentComponent'],
                        source: {
                            name: exchangeNameEnum.RunAction,
                            data: {
                                name: 'exchChangeText',
                                arguments: ['Текст из родительского компонента переданный через систему exchange!!!'],
                            }
                        }
                    }
                );

            },
            3000);
        // console.log('-----------------------evo!!!', evo);

        evo.log.color('red', 'logAll', 'common', 'Красное сообщение');

        evo.debug.awaitTryCatch.accessType = false;
        const params = { search: { search: [] }, size: 200 };
        const res = await evo.awaitTryCatch.getResult(this.rest.search('catalogueRegions', params));
    }

}
