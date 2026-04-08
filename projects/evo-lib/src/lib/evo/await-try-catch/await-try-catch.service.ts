export interface IAwaitTryCatchWorker {
    /**
     * Выполняет Promise и возвращает результат или обрабатывает ошибку.
     * @param promise - Promise<any> - Promise для выполнения.
     * @param errorMessage - string - Сообщение об ошибке (по умолчанию 'Ошибка при выполнении Promise').
     *
     * @returns  - Результат выполнения Promise или false в случае ошибки. - Promise<any>
     */
    getResult(promise: Promise<any>, errorMessage?: string): Promise<any>;
}

/**
 * Сервис для обработки Promise с использованием try-catch.
 */
export class AwaitTryCatchService implements IAwaitTryCatchWorker {

/**
 * Обработка разных типов ошибок.
 * @param e - Ошибка из try-catch.
 */
    private _tryCatchErrorInfo(e: Error): void {
        if (e instanceof TypeError) {
            console.error('Ошибка типа: ' + e.message);
        } else if (e instanceof ReferenceError) {
            console.error('Ошибка ссылки: ' + e.message);
        } else {
            console.error('Другая ошибка: ' + e.message);
        }
    }

    public async getResult(promise: Promise<any>, errorMessage: string = 'Ошибка при выполнении Promise'): Promise<any> {
        const [data, error] = await this._tryCatchForAwait(promise);

        if (error) {
            console.error(errorMessage);
            this._tryCatchErrorInfo(error);

            return false;
        }

        let result = data;
        if (data instanceof Response) {
            try {
                if (data.ok) {
                    result = await data.json(); // или data.text() для текстовых ответов
                } else {
                    console.error(`HTTP Error: ${data.status} ${data.statusText}`);
                    return false;
                }
            } catch (parseError) {
                console.error('Ошибка парсинга ответа:', parseError);
                return false;
            }
        }

        evo.log.warn('awaitTryCatch', 'common', 'Результат - ', result);

        return data;
    }

/**
 * Вспомогательная функция для обработки Promise с try-catch.
 * @param promise - Promise для выполнения. - Promise<any>
 *
 * @returns Массив, где первый элемент - результат, второй - ошибка. - Promise<any[]>
 */
    private async _tryCatchForAwait(promise: Promise<any>): Promise<any[]> {
        try {
            const data = await promise;

            return [data, null];
        } catch (error) {
            return [null, error];
        }
    }
}
