import {IFacade} from './facade/facade.lighthouse';

export class DataWorker {
    public run(config: IFacade): void {
        console.log(config, config);
        evo.data.storageData.send$({});
    }
}
