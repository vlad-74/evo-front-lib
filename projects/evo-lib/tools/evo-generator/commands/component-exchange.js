// evo-front-lib\projects\evo-lib\tools\evo-generator\commands\component-exchange.js

const path = require('path');
const fs = require('fs');
const {
    toPascalCase,
    ensureDirectory,
    writeFile,
    generateComponentViaAngularCLI,
    findNgModule,
    updateNgModule,
    logSuccess,
    logError,
    logInfo,
    logWarning
} = require('../utils/helpers');
const { validateComponentName, validateStyleType } = require('../utils/validators');

// Шаблон TypeScript
const getTsTemplate = (componentName, styleType, className) => `
import { Input, Component, OnInit, OnDestroy } from '@angular/core';

import {NgExchangeSubscribeComponent} from 'evo-lib';

@Component({
    selector: 'evo-${componentName}',
    templateUrl: './${componentName}.component.html',
    styleUrls: ['./${componentName}.component.${styleType}']
})
export class ${className}Component extends NgExchangeSubscribeComponent implements OnInit, OnDestroy {
    private static readonly extendsClassName = '${className}Component';

    @Input() public viewDataFields: any = {};

    public constructor() {
        super(${className}Component.extendsClassName);
    }

    public ngOnInit(): void { }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
`;

// Шаблон HTML
const getHtmlTemplate = (componentName) => `<div class="${componentName}-container">
    <p>${componentName} works!</p>
    <p>NgExchangeSubscribeComponent - communication-center-for-components-and-services!!!</p>
</div>`;

// Шаблон стилей
const getStylesTemplate = () => `:host {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    overflow: hidden;
}`;

module.exports = async function(targetPath, scriptPath, options) {
    const { name: componentName, style: styleType, path: customPath } = options;

    try {
        // Валидация
        validateComponentName(componentName);
        validateStyleType(styleType);

        // Определяем путь создания
        const createPath = customPath ? path.join(targetPath, customPath) : targetPath;
        const componentFolder = path.join(createPath, componentName);
        const componentFile = path.join(componentFolder, `${componentName}.component.ts`);

        // Проверка на существование
        if (fs.existsSync(componentFile)) {
            logWarning(`Компонент ${componentName} уже существует`);
            return;
        }

        logInfo(`Создание компонента: ${componentName}`);

        // Создаем папку
        ensureDirectory(componentFolder);

        // Генерируем через Angular CLI
        const success = await generateComponentViaAngularCLI(componentName, componentFolder, styleType, true);

        if (!success) {
            throw new Error('Не удалось создать компонент через Angular CLI');
        }

        // Перезаписываем файлы своими шаблонами
        const className = toPascalCase(componentName);

        // TypeScript файл
        writeFile(componentFile, getTsTemplate(componentName, styleType, className));

        // HTML файл
        const htmlFile = path.join(componentFolder, `${componentName}.component.html`);
        writeFile(htmlFile, getHtmlTemplate(componentName));

        // Styles файл
        const stylesFile = path.join(componentFolder, `${componentName}.component.${styleType}`);
        writeFile(stylesFile, getStylesTemplate());

        logSuccess(`Компонент ${componentName} создан`);

        // Регистрация в модуле
        const modulePath = findNgModule(componentFolder);
        if (modulePath) {
            logInfo(`Регистрация в модуле: ${modulePath}`);
            updateNgModule(componentFile, modulePath);
        } else {
            logWarning('Модуль не найден для регистрации компонента');
        }

    } catch (error) {
        logError(error.message);
        throw error;
    }
};
