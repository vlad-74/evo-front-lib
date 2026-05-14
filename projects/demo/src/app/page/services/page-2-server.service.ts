import { Injectable } from '@angular/core';

import { RestService } from '../../service/rest.service';
import { IParams } from '../../service/interface/params.interface';

@Injectable({
    providedIn: 'root'
})
export class Page2ServerService {

    public constructor(
        public rest: RestService,
    ) {}

    public async start(params: IParams): Promise<any> {
        return await evo.awaitTryCatch.send(this.rest.search('catalogueRegions', params), 'AppComponent');
    }
}
