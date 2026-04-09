export interface IAwaitTryCatchService {
    getResult<T = any>(promise: Promise<T>, from?: string,  errorMessage?: string): Promise<T | false>;
}

export class AwaitTryCatchService implements IAwaitTryCatchService {

    private _tryCatchErrorInfo(e: unknown): void {
        if (e instanceof TypeError) {
            evo.log.colorWarn('red', 'awaitTryCatch', 'common', 'Ошибка типа: ', e.message);
        } else if (e instanceof ReferenceError) {
            evo.log.colorWarn('red', 'awaitTryCatch', 'common', 'Ошибка ссылки: ', e.message);
        } else if (e instanceof Error) {
            evo.log.colorWarn('red', 'awaitTryCatch', 'common', 'Ошибка: ', e.message);
        } else {
            evo.log.colorWarn('red', 'awaitTryCatch', 'common', 'Неизвестная ошибка:', e);
        }
    }

    public async getResult<T = any>(
        promise: Promise<T>,
        from: string = 'Не указано',
        errorMessage: string = 'Ошибка при выполнении Promise'
    ): Promise<T | false> {
        try {
            const result = await promise;

            // Обработка Response отдельно - fetch() возвращает не готовые данные, а объект Response
            if (result instanceof Response) {
                return this.handleResponse(result, from) as Promise<T | false>;
            }

            evo.log.colorWarn('cyan',
                'awaitTryCatch',
                'common',
                'Результат выполнения getResult (из ' + from + '/AwaitTryCatchService)',
                result
            );

            return result;
        } catch (error) {
            evo.log.colorWarn('red',
                'awaitTryCatch',
                'common',
                'Результат выполнения getResult (из ' + from + '/AwaitTryCatchService)',
                errorMessage
            );
            this._tryCatchErrorInfo(error);

            return false;
        }
    }

    private async handleResponse(response: Response, from: string ): Promise<any | false> {
        try {
            if (!response.ok) {
                console.error(`HTTP Error: ${response.status} ${response.statusText}`);

                return false;
            }
            const data = await response.json();
            // Чтобы получить данные, нужно вызвать один из методов:
            /*
            const data = await response.json();    // для JSON ответа
            const text = await response.text();    // для текста
            const blob = await response.blob();    // для файлов/изображений
            const formData = await response.formData(); // для form-data
            */

            evo.log.colorWarn('cyan',
                'awaitTryCatch',
                'common',
                'Результат выполнения getResult (из ' + from + '/AwaitTryCatchService)',
                data
            );

            return data;
        } catch (parseError) {
            evo.log.colorWarn('red', 'awaitTryCatch', 'common', 'Ошибка парсинга ответа: ', parseError);

            return false;
        }
    }
}
