import {IFacade} from './facade/facade.lighthouse';
import {IDataFacadeResult} from './data.interface';

export class FacadeWorker {
    public execute(config: IFacade): void {
        console.log(config, config);
        evo.data.storageData.send$({} as IDataFacadeResult);

        // evo.data.services.request = services.request;
        // evo.data.services.server = services.server;
        // evo.data.services.parsed = services.parsed;
        // evo.data.services.factory = services.factory;
    }
}
