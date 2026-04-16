import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {DataWorker} from './data.worker';
import {FacadeLighthouse} from './facade/facade.lighthouse';
import {StorageDataLighthouse} from './storage-data.lighthouse';
import {TNullable} from '../evo.interface';


export interface IData {
    facade: ILighthouse<any>;
    storageData: ILighthouse<any>;
    services: TNullable<IServices>;
    dataWorker: DataWorker;
}

export interface IServices {
    request: any;
    server: any;
    parsed: any;
    factory: any;
}

export class Data implements IData {
    public facade: ILighthouse<any>;
    public storageData: ILighthouse<any>;
    public services: TNullable<IServices>;
    public dataWorker: DataWorker;

    public constructor() {
        this.facade = new FacadeLighthouse();
        this.storageData = new StorageDataLighthouse();
        this.services = null;
        this.dataWorker = new DataWorker();
    }
}
