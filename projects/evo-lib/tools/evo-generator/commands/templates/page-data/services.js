// commands/templates/page-data/services.js

const getRequestServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {

}
`;

const getServerServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {

}
`;

const getParsedServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {

}
`;

const getFactoryServiceTemplate = (className) => `import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ${className} {

}
`;

const getDispatcherServiceTemplate = (className, componentName) => `import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ${className} {

}
`;

module.exports = {
    getRequestServiceTemplate,
    getServerServiceTemplate,
    getParsedServiceTemplate,
    getFactoryServiceTemplate,
    getDispatcherServiceTemplate
};
