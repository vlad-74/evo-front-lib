import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Page4FactoryService {
    public start(parsedResult: any): any {
        return parsedResult.content.map((item: any) => ({
            id: item._id,
            code: item.code,
            name: item.name
        }));
    }
}
