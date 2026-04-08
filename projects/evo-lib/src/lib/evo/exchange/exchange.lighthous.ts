/** Маяк для бмена функционалом (методы и свойства) между компонентами */
import {baseLighthouse} from '../_lighthouse/base-lighthouse';
import {IExchangeSource} from './exchange.interface';


/**
 * Отправка информации от сервисов и компонентов в NgExchangeSubscribeBaseComponent.
 *
 * @example
 * // Пример использования:
 * evo.exchange.l.send({name: 'white'}({
 *            from: 'UserSeEvoLoaderComponent',
 *            to: ['EvoRootLighthousesComponent'],
 *            source: {
 *                 name: exchangeNameEnum.ChangeProperty,
 *                 data: {
 *                     name: 'exchIsShowLoader',
 *                     value: this.takeLoader.length > 0,
 *                 }
 *            }
 *         });
 */


export class ExchangeLighthouse extends baseLighthouse<IExchangeSource>{

    public constructor() {
        super('exchange'); // Передаём тип для логирования и отладки
    }
}






