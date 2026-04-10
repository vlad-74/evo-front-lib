// commands/templates/page-data/services.js

const getRequestServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {
    run(options: any): any {
        return null;
    }
}`;

const getServerServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {
    async run(requestData, serverConfig = null): Promise<any> {
        return { data: null };
    }
}`;

const getParsedServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {
    run(serverData, parserConfig = null): any {
        return serverData;
    }
}`;

const getFactoryServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {
    constructor(item: any) {
        Object.assign(this, item);
    }
}`;

const getDispatcherServiceTemplate = (className, componentName) => `import { Injectable } from '@angular/core';

import { evo } from "@evo-page/evo/evo.worker";
import { GetDataTypeEnum } from "@evo-page/evo/core/_workers/_data/enums/get-data-type.enum";

@Injectable({
    providedIn: 'root'
})
export class ${className} {
    start(extendsClassName): void {
        const request = { functionName: 'getSearchParams', params: null };

        evo.data$.fetchAndSend(
            extendsClassName,
            'pageList',
            GetDataTypeEnum.New,
            request,
            { functionName: 'serverList' },
            { functionName: 'parsedList' }
        ).then(_ => {});
    }
}`;

module.exports = {
    getRequestServiceTemplate,
    getServerServiceTemplate,
    getParsedServiceTemplate,
    getFactoryServiceTemplate,
    getDispatcherServiceTemplate
};
