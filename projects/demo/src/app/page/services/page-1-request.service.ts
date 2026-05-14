import { Injectable } from '@angular/core';

import { IParams } from '../../service/interface/params.interface';

@Injectable({
    providedIn: 'root'
})
export class Page1RequestService {
    public start(): IParams {
        return { search: { search: [] }, size: 200 };
    }
}
