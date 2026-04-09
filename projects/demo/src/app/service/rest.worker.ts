import {RestService} from './rest.service';
import {IParams, TMethod} from './interface/params.interface';

export interface IRestWorker {
    restService: RestService;

    executeSearch(collection: string, params: IParams): Promise<any>;

    /**
     * Выполняет поиск всех элементов в указанной коллекции с заданными параметрами.
     * @param collection - Название коллекции для поиска.
     * @param params - Параметры поиска.
     * @returns - Результат поиска - результат или null.
     */
    executeFindAll(collection: string, params: IParams): Promise<any>;
}


/** RestWorker - Участвует в процессах получения данных с сервера  */
export class RestWorker implements IRestWorker {

    public constructor(
        public restService: RestService,
    ) {
    }

    //region Публичные методы

    public async executeSearch(collection: string, params: IParams): Promise<any> {
        return await this._getData(collection, params, 'search');
    }

    /**
     * Выполняет поиск всех элементов в указанной коллекции с заданными параметрами.
     * @param collection - Название коллекции для поиска.
     * @param params - Параметры поиска.
     * @returns - Результат поиска - результат или null.
     */
    public async executeFindAll(collection: string, params: IParams): Promise<any> {
        return await this._getData(collection, params, 'findAll');
    }

    /**
     * Возвращает результат поиска.
     * @param collection - Название коллекции для поиска.
     * @param params - Параметры поиска.
     * @param method - Метод поиска.
     * @returns  - Результат поиска - результат или null.
     */

    private async _getData(collection: string, params: IParams, method: TMethod ): Promise<any> {
        return await evo.awaitTryCatch.getResult(this.restService[method](collection, params));
    }

    //endregion
}
