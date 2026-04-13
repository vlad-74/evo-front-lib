import { Component, OnInit } from '@angular/core';
import {exchangeNameEnum} from 'evo-lib';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'evo-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
    title = 'demo';

    public constructor(
        public rest: RestService,
    ) {}

    public async ngOnInit(): Promise<void> {

        setTimeout(() => {
                evo.theme.send$({name: 'white'}, 'AppComponent');

                evo.exchange.send$(
                    {
                        from: 'AppComponent',
                        to: ['ChildComponent'],
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
                        to: ['ChildComponent'],
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
