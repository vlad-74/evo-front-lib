import {ILighthouse} from '../_lighthouse/_lighthouse.interface';
import {FacadeWorker} from './data.worker';
import {FacadeLighthouse} from './facade/facade.lighthouse';
import {StorageDataLighthouse} from './storage-data.lighthouse';
import {TNullable} from '../evo.interface';
import {IDataFacadeResult} from './data.interface';


export interface IData {
    facade: ILighthouse<any>;
    facadeWorker: FacadeWorker;
    services: TNullable<IServices>;
    storageData: ILighthouse<IDataFacadeResult>;
}

export interface IServices {
    request: any;
    server: any;
    parsed: any;
    factory: any;
}

export class Data implements IData {
    public facade: ILighthouse<any>;
    public facadeWorker: FacadeWorker;
    public services: TNullable<IServices>;
    public storageData: ILighthouse<any>;

    public constructor() {
        this.facade = new FacadeLighthouse();

        // !!! В setupSubscriptions подписка на facade -> запускает facadeWorker.execute ->
        // использование services из NgFacadeSubscribeComponent -> получение и обрабортка данных -> и emit данных в storageData
        // -> использование обработанных данных из storageData через подписку в NgFacadeSubscribeComponent
        this.facadeWorker = new FacadeWorker();

        this.services = null;
        this.storageData = new StorageDataLighthouse();
    }
}
