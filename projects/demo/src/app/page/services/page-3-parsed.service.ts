import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class Page3ParsedService {
    public start(serverResult: any): any {
        return serverResult;
    }
}
