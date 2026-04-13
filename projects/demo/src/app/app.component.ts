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
  selector: 'evo-root',
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

        // evo.log.disableLogAll(); // только logAll + common

        setTimeout(() => {
                evo.theme.send$({name: 'white'}, 'AppComponent');

                evo.exchange.send$(
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
                    , 'AppComponent'
                );

            },
            3000);

        setTimeout(() => {
                evo.theme.send$({name: 'white'}, 'AppComponent');

                evo.exchange.send$(
                    {
                        from: 'AppComponent',
                        to: ['ChildComponentComponent'],
                        source: {
                            name: exchangeNameEnum.ChangeProperty,
                            data: {
                                name: 'txt',
                                value: '!!!',
                            }
                        }
                    },
                    'AppComponent'
                );

            },
            5000);
        // console.log('-----------------------evo!!!', evo);

        // evo.debug.awaitTryCatch.accessType = false;
        // evo.log.enableLogAll(); // все логируется
        const params = { search: { search: [] }, size: 200 };
        await evo.awaitTryCatch.send(this.rest.search('catalogueRegions', params), 'AppComponent');
    }

}
