/** Интерфейс для параметров запроса. */
export interface IParams {
    search: { search?: ISearch[] | any[] }; // Параметры поиска
    prj?: string; // Проект
    size?: number; // Размер
    sort?: string; // Сортировка
}

/** Интерфейс для параметров поиска. */
export interface ISearch {
    field: string; // Поле для поиска
    operator: string; // Оператор поиска
    value: boolean | string | string[]; // Значение для поиска
}

/** Тип для поиска. */
export type TMethod = 'search' | 'findAll';
