import { RestServiceSearchRequestCriteriaOperator } from './search-request-criteria-operator.type';

export interface RestServiceSearchRequestCriteria {
    field?: string;
    operator?: RestServiceSearchRequestCriteriaOperator | string;
    value?: any;
    orSubConditions?: RestServiceSearchRequestCriteria[];
    andSubConditions?: RestServiceSearchRequestCriteria[];
    [field: string]: any;
}
