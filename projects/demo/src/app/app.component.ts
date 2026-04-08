import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
    title = 'demo';

    public ngOnInit(): void {
        setTimeout(() => { evo.theme.l.send({name: 'white'}); }, 5000);
        console.log('-----------------------evo', evo);
        // evo.debug.logAll.accessType = false;
        evo.log.color('red', 'logAll', 'common', 'Красное сообщение');
        evo.log.warn('logAll', 'common', '1. Тестовое сообщение');
        // evo.debug.logAwaitTryCatch.accessType = false;
        evo.log.warn('awaitTryCatch', 'common', '2. Тестовое сообщение');

    }

}
