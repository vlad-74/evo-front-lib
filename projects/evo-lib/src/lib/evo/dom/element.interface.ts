import {TAllEvents, TSelector, TTypeAppend} from './dom.interface';


export interface IDomElementWorker {
    /**
     * Простое создание элемента DOM
     * @param tagName - Название тега
     * @param className - Класс элемента (опционально)
     * @returns Созданный элемент
     */
    createElement(tagName: string, className?: string): HTMLElement;

    /**
     * Создает новый HTML элемент и добавляет его в DOM
     * @param parentElement - Родительский элемент
     * @param newElement - Название тега нового элемента
     * @param typeAppend - Тип добавления элемента
     * @param strInnerHTML - HTML содержимое нового элемента (опционально)
     * @param dataId - Идентификатор для атрибута data-id (опционально)
     * @param eventName - Тип события
     * @param fn - Функция обработки события (опционально)
     */
    elementCreate(
        parentElement: HTMLElement,
        newElement: string,
        typeAppend: TTypeAppend,
        strInnerHTML: string,
        dataId: number | string,
        eventName: TAllEvents,
        fn: any
    ): void;

    /**
     * Добавляет HTML элемент в DOM
     * @param parentElement - Родительский элемент, в который будет добавлен новый элемент
     * @param typeAppend - Тип добавления элемента
     * @param dataId - Идентификатор для атрибута data-id
     * @param eventName - Тип события для добавления слушателя
     * @param fn - Функция-обработчик события
     * @param el$ - Добавляемый DOM элемент
     */
    elementAdd(
        parentElement: HTMLElement,
        typeAppend: TTypeAppend,
        dataId: number | string,
        eventName: TAllEvents,
        fn: ((event: Event, ...args: any[]) => void) | null,
        el$: HTMLElement
    ): void;

    /**
     * Удаляет HTML элемент из DOM
     * @param parentElement - Родительский элемент
     * @param el$ - Удаляемый элемент
     */
    elementRemove(parentElement: HTMLElement, el$: HTMLElement): void;

    /**
     * Получает HTML элемент с повторными попытками при отсутствии в DOM
     * @param identifier - Селектор или идентификатор элемента
     * @param selector - Тип селектора (querySelector или querySelectorAll)
     * @param node - Корневой узел для поиска
     * @param time - Задержка между попытками в миллисекундах
     * @param max - Максимальное количество попыток
     * @returns Промис с найденным элементом
     */
    elementGet(
        identifier: string,
        selector: TSelector,
        node: Document | HTMLElement | null,
        time: number,
        max: number
    ): Promise<HTMLElement>;

    /**
     * Выполняет поиск элементов по data-атрибуту
     * @param elementToSelect - Название data-атрибута (например, 'data-id')
     * @param dataValue - Значение атрибута (опционально)
     * @returns Массив найденных элементов
     */
    getElementByDataAttribute(elementToSelect: string, dataValue: string | null): HTMLElement[];

    /**
     * Возвращает размеры элемента и его положение относительно viewport
     * @param element - Целевой DOM элемент
     * @returns Объект DOMRect с координатами и размерами
     */
    getCoordinates(element: HTMLElement): DOMRect;

    /**
     * Возвращает родительский элемент для указанного элемента
     * @param el - DOM элемент или NodeList
     * @returns Родительский элемент или null
     */
    elementGetParent(el: Element | NodeList): Node & ParentNode | null;  // ← Добавлен | null

    /**
     * Возвращает все соседние элементы независимо от их положения
     * @param el - Исходный DOM элемент
     * @returns Массив соседних элементов
     */
    elementsGetSiblingAll(el: Element | NodeList): Element[];

    /**
     * Возвращает все следующие соседние элементы (nextElementSibling)
     * @param el - Исходный DOM элемент
     * @returns Массив следующих соседних элементов
     */
    elementGetSiblingNext(el: Element | NodeList): Element[];

    /**
     * Возвращает все предыдущие соседние элементы (previousSibling)
     * @param el - Исходный DOM элемент
     * @returns Массив предыдущих соседних элементов
     */
    elementGetSiblingPrevious(el: Element | NodeList | Node): Element[];

    /**
     * Возвращает все дочерние элементы указанного элемента
     * @param el - Родительский DOM элемент
     * @returns Массив дочерних элементов
     */
    elementGetChildren(el: Element): Element[];
}
