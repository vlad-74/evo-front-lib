# EvoLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

---

### <span style="color:red">При использовании импортов внутри библиотеки не указывать from 'evo-lib'. Например - import {IExchangeSource} from 'evo-lib';</span>

---

### <span style="color:yellow">В ngAfterViewInit стартового компонента при необходимости реализуйте задание максимальной ширины страницы плюс создание динамических классов и переменных</span>

```angular2html
public ngAfterViewInit(): void {
    /** Задаем максимальную ширину страицы для экрана */
    evo.dynamicWidth.maxPageWidth.send$({maxPageWidth: this.maxPageWidth, wrapperRef: this.wrapperRef});
    
    /** Задаем динамические переменнные */
    evo.dom.var.varsMaxWidthActivePage(this.wrapperRef, this.maxPageWidth, evo.dom.var.addItemToCssRootBaseWidths());
    
    /** Задаем динамические классы */
    evo.dom.class.addClassMarginPadding(this.wrapperRef, evo.dom.var.addItemToCssRootBaseWidths());
        
}
```
---

### <span style="color:yellow">В ngOnDestroy стартового компонента реализуйте evo.destroy(). Это необходимо для реализации "отписок в библиотеке evo". Плюс удаление всех динамических классов и переменных</span>

```angular2html
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        evo.dom.var.deleteRootVariables(this.wrapperRef);
        evo.dom.class.deleteClassMarginPadding();

        evo.destroy(); // !!! Обязательно при выходе "из использования evo"
    }
```
---

## <span style="color:yellow">1. Install in WebStorm EVO snippets (implemented on Windows)</span>

<span style="color:green"> node ./node_modules/evo-lib/tools/install-snippets.js</span>

Restart WebStorm after installation

---

## <span style="color:yellow">2. Create EVO Pages & Components (implemented on Windows)</span>

До установки библиотеки (разработчик режим разработки):
<span style="color:green">npm run evo page-data -- --name user-car --style scss --path projects/demo/src/app/</span>

---

После установки библиотеки (пользователь установивший библиотеку):
<span style="color:green">npx evo-generator page-data -- --name user-car --style scss --path src/app</span>



| Команда | Описание                                                         |
|---------|------------------------------------------------------------------|
| `component-exchange` | Компонент с NgExchangeSubscribeComponent                         |
| `page-data` | Страница с устройствами + 5 сервисов для получения данных (List) |
| `page-detail` | Страница с устройствами (Detailing - открывается из List)            |


| Параметр | Обязательность | По умолчанию | Пример |
|----------|----------------|--------------|--------|
| `--name` | Да | - | `--name user-card` |
| `--style` | Нет | `scss` | `--style less` |
| `--path` | Нет | текущая папка | `--path src/app` |

---


## Code scaffolding

Run `ng generate component component-name --project evo-lib` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project evo-lib`.
> Note: Don't forget to add `--project evo-lib` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build evo-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build evo-lib`, go to the dist folder `cd dist/evo-lib` and run `npm publish`.

## Running unit tests

Run `ng test evo-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
