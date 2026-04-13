/** Маяк для бмена функционалом (методы и свойства) между компонентами */
import {BaseLighthouse} from '../_lighthouse/base-lighthouse';
import {IExchangeSource} from './exchange.interface';


/**
 * Отправка информации от сервисов и компонентов в NgExchangeSubscribeBaseComponent.
 *
 * @example
 * // Пример использования:
 * evo.exchange.send$({name: 'white'}({
 *            from: 'UserSeEvoLoaderComponent',
 *            to: ['EvoRootLighthousesComponent'],
 *            source: {
 *                 name: exchangeNameEnum.ChangeProperty,
 *                        data: {
 *                             name: 'exchChangeText',
 *                             arguments: ['Текст из родительского компонента переданный через систему exchange!!!'],
 *                         }
 *            }
 *         });
 */


export class ExchangeLighthouse extends BaseLighthouse<IExchangeSource>{

    public constructor() {
        super('exchange'); // Передаём тип для логирования и отладки
    }
}






