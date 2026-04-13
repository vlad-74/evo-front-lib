import { ComponentFactoryResolver } from '@angular/core';

// tslint:disable-next-line:variable-name
let _cfr: ComponentFactoryResolver | null = null;

export function setComponentFactoryResolver(cfr: ComponentFactoryResolver): void {
    if (!_cfr) { _cfr = cfr; }
}

export function getComponentFactoryResolver(): ComponentFactoryResolver | null {
    return _cfr; // ← НЕ выбрасываем ошибку, а возвращаем null
}
