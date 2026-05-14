import { Injectable } from '@angular/core';

import {GetDataTypeEnum} from '../../../../../evo-lib/src/lib/evo/data/data.interface';


@Injectable({
    providedIn: 'root'
})
export class Page5DispatcherService {
    public start(extendsClassName: string): any {
        evo.data.facade.send$({
            for: extendsClassName,
            returnType: GetDataTypeEnum.New,
            dataOperation: 'pageList',
            request: { functionName: 'start', args: [] },
            server: { functionName: 'start', args: [] },
            parsed: { functionName: 'start', args: [] },
            factory: { functionName: 'start', args: [] },
        });
    }
}
