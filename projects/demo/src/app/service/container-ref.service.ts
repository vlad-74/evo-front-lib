// container-ref.service.ts
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContainerRefService {
    private containerListRef: ViewContainerRef | null = null;
    private containerDetailRef: ViewContainerRef | null = null;
    private containerModalRef: ViewContainerRef | null = null;

    public setContainerList(ref: ViewContainerRef): void  {
        this.containerListRef = ref;
    }

    public getContainerList(): ViewContainerRef | null {
        return this.containerListRef;
    }

    public setContainerDetail(ref: ViewContainerRef): void {
        this.containerDetailRef = ref;
    }

    public getContainerDetail(): ViewContainerRef | null {
        return this.containerDetailRef;
    }

    public setContainerModal(ref: ViewContainerRef): void  {
        this.containerModalRef = ref;
    }

    public getContainerModal(): ViewContainerRef | null {
        return this.containerModalRef;
    }
}
