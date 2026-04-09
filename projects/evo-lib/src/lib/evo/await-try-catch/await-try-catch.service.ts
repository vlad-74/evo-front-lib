export interface IAwaitTryCatchService {
    getResult<T = any>(promise: Promise<T>, errorMessage?: string): Promise<T | false>;
}

export class AwaitTryCatchService implements IAwaitTryCatchService {

    private _tryCatchErrorInfo(e: unknown): void {
        if (e instanceof TypeError) {
            console.error('Ошибка типа: ' + e.message);
        } else if (e instanceof ReferenceError) {
            console.error('Ошибка ссылки: ' + e.message);
        } else if (e instanceof Error) {
            console.error('Ошибка: ' + e.message);
        } else {
            console.error('Неизвестная ошибка:', e);
        }
    }

    public async getResult<T = any>(
        promise: Promise<T>,
        errorMessage: string = 'Ошибка при выполнении Promise'
    ): Promise<T | false> {
        try {
            const result = await promise;

            // Обработка Response отдельно - fetch() возвращает не готовые данные, а объект Response
            if (result instanceof Response) {
                return this.handleResponse(result) as Promise<T | false>;
            }

            evo.log.colorWarn('green', 'awaitTryCatch', 'common', 'Результат getResult - ', result);

            return result;
        } catch (error) {
            console.error(errorMessage);
            this._tryCatchErrorInfo(error);

            return false;
        }
    }

    private async handleResponse(response: Response): Promise<any | false> {
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

            evo.log.warn('awaitTryCatch', 'common', 'Результат handleResponse - ', data);

            return data;
        } catch (parseError) {
            console.error('Ошибка парсинга ответа:', parseError);

            return false;
        }
    }
}
