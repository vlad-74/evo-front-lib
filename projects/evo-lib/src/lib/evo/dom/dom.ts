import {DomVariablesWorker, IDomVariablesWorker} from './dom-variables.worker';
import {DomClassWorker, IDomClassWorker} from './dom-class.worker';
import {DomStyleWorker, IDomStyleWorker} from './dom-style.worker';
import { IDomElementWorker } from './element.interface';
import {DomElementWorker} from './dom-element.worker';

export interface IDom {
    class: IDomClassWorker;
    element: IDomElementWorker;
    style: IDomStyleWorker;
    var: IDomVariablesWorker;
}

export class Dom implements IDom {
    public class: IDomClassWorker;
    public element: IDomElementWorker;
    public style: IDomStyleWorker;
    public var: IDomVariablesWorker;

    public constructor() {
        this.var = new DomVariablesWorker(document);
        this.element = new DomElementWorker(document);
        this.class = new DomClassWorker(document);
        this.style = new DomStyleWorker(document);
    }
}
