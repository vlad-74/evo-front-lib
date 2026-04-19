import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {exchangeNameEnum} from 'evo-lib';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'evo-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, AfterViewInit {
    @Input() test = '';
    @Output() closed = new EventEmitter<void>(); // Используем EventEmitter

    // public title: string | null = null;

    public toolbar!: string[];
    public txt!: string[];         // ← тоже

    public constructor(
        public rest: RestService,
    ) {}

    public async ngOnInit(): Promise<void> {

        setTimeout(() => {
                evo.theme.send$({name: 'white'}, 'ParentComponent');

                evo.exchange.send$(
                    {
                        from: 'ParentComponent',
                        to: ['ChildComponent'],
                        source: {
                            name: exchangeNameEnum.RunAction,
                            data: {
                                name: 'exchChangeText',
                                arguments: ['Текст из родительского компонента переданный через систему exchange!!!'],
                            }
                        }
                    }
                    , 'ParentComponent'
                );

            },
            3000);

        setTimeout(() => {
                evo.theme.send$({name: 'white'}, 'ParentComponent');

                evo.exchange.send$(
                    {
                        from: 'ParentComponent',
                        to: ['ChildComponent'],
                        source: {
                            name: exchangeNameEnum.ChangeProperty,
                            data: {
                                name: 'txt',
                                value: '!!!',
                            }
                        }
                    },
                    'ParentComponent'
                );

            },
            5000);
        // console.log('-----------------------evo!!!', evo);

        // evo.debug.awaitTryCatch.accessType = false;
        // evo.log.enableLogAll(); // все логируется
        const params = { search: { search: [] }, size: 200 };
        await evo.awaitTryCatch.send(this.rest.search('catalogueRegions', params), 'AppComponent');
    }

    public ngAfterViewInit(): void {
        Promise.resolve().then(() => {
            this.toolbar = ['toolbar'];
            this.txt = ['txt'];
            // this.title = 'txt';

            this.closed.emit();
        });
    }

}
