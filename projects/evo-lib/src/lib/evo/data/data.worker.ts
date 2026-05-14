import { IFacade } from './facade/facade.lighthouse';
import { IDataFacadeResult } from './data.interface';

export class FacadeWorker {
    public async execute(config: IFacade): Promise<void> {
        // Проверяем наличие необходимых зависимостей один раз
        const hasServices = evo?.data?.services;

        if (!hasServices) {  return; }

        const {
            request: requestService,
            server: serverService,
            parsed: parsedService,
            factory: factoryService,
        } = hasServices;

        // Формируем params для request запроса
        const requestResult = config?.request?.functionName && requestService
            ? requestService[config?.request?.functionName](...config?.request.args)
            : null;

        evo.log.colorWarn('gray',
            'facade',
            'common',
            `1. Результат преобразования фильтров = `, requestResult
        );

        // Выполняем server запрос, если есть результат request и все зависимости
        const requestArgs = config?.server?.args?.length ? config.server?.args : [requestResult];

        const serverResult = config.server?.functionName && serverService
            ? await serverService[config.server.functionName](...requestArgs)
            : null;

        evo.log.colorWarn('gray',
            'facade',
            'common',
            `2. Результат запроса к БД = `, serverResult
        );


        const serverArgs = config?.parsed?.args?.length ? config.parsed?.args : [serverResult];
        const parsedResult = config.parsed?.functionName && parsedService
            ? parsedService[config.parsed.functionName](...serverArgs)
            : null;

        evo.log.colorWarn('gray',
            'facade',
            'common',
            `3. Результат парсина данных полученныз из БД = `, parsedResult
        );

        const factoryArgs = config?.factory?.args?.length ? config.factory?.args : [parsedResult];
        const factoryResult = config.factory?.functionName && factoryService
            ? factoryService[config.factory.functionName](...factoryArgs)
            : null;

        evo.log.colorWarn('gray',
            'facade',
            'common',
            `4. Результат фабрики распарсенных данных = `, factoryResult
        );

        const result = {
            for: config.for,
            dataOperation: config.dataOperation,
            result: factoryResult,
            returnType: config.returnType,
        };

        // Отправляем результат (можно расширить, если нужно передать serverResult)
        evo.data.storageData.send$(result as IDataFacadeResult, 'FacadeWorker');
    }
}
