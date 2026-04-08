
/** ValidationsWorker - Участвует в процессах валидации */
export class CheckEvoWorker {
    //region Методы компонентов

    /**
     * Во всех компонентах где есть
     * NgExchangeSubscribeComponent
     * нужно инициализировать private static readonly extendsClassName и передавать в конструктор
     * - extendsClassName должен соответствовать наименованию класса наследника.
     *
     * @param self - NgDataSubscribeComponent или NgExchangeSubscribeComponent - передается в this
     *
     * @throws {Error} Если extendsClassName не инициализирован.
     */
    public checkLogClassName(self: any): void {
        const errorText = 'extendsClassName не инициализирован или не соответствует имени класса наследника';

        if (!self.extendsClassName || self.extendsClassName !== self.constructor.name) {
            evo.log.info(`1 ---this.extendsClassName - ` + self.extendsClassName);
            evo.log.info('2 ---this.constructor.name ' + self.constructor.name);

            throw new Error(errorText);
        }
    }

    /**
     * Во всех компонентах где есть
     * NgDataSubscribeComponent или NgExchangeSubscribeComponent
     * нужно в ngOnDestroy отписываться от всех подписок
     *
     * Проверяет, реализован ли метод ngOnDestroy в компоненте и вызывает ли он super.onDestroy().
     * @param self - NgDataSubscribeComponent или NgExchangeSubscribeComponent - передается в this
     *
     * @throws {Error} Если метод ngOnDestroy не реализован или не вызывает super.onDestroy().
     */
    public checkLogNgOnDestroy(self: any): void {
        const prototype = Object.getPrototypeOf(self);
        const destroy = prototype.ngOnDestroy;

        const textDestroy = 'Нужно добавить к классу implements OnDestroy и указать в ngOnDestroy - super.ngOnDestroy()';
        const textSuper = 'В методе ngOnDestroy нужно указать - super.ngOnDestroy()';

        if (!destroy || !String(destroy).includes('super.ngOnDestroy()')) {
            const errorText = !destroy ? textDestroy : textSuper;

            evo.log.info('checkLogNgOnDestroy - ' + self);
            throw new Error(errorText);
        }
    }
    //endregion
}
