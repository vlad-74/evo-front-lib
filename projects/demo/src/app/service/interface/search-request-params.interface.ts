import { RestServiceSearchRequestCriteria } from './search-request-criteria.interface';

export interface RestServiceSearchRequestParams {
    /**
     * Поисковый запрос.
     */
    search?: {
        /**
         * Минимум должен быть пустой массив `[]`.
         */
        search?: RestServiceSearchRequestCriteria[],

        /**
         * Строка для полнотекстового поиска.
         */
        textSearch?: string;
    };

    /**
     * Индекс запрашиваемой страницы.
     *
     * Обычно заполняется в паре с `size`.
     */
    page?: number;

    /**
     * Кол-во возвращаемых на странице записей.
     */
    size?: number;

    /**
     * Наименование используемой проекции.
     *
     * Должно соответствовать данным коллекции projections.
     */
    prj?: string;

    /**
     * Сортировка значений.
     *
     * Ex. `dateLastModification,DESC`.
     */
    sort?: string;

    [field: string]: any;
}
