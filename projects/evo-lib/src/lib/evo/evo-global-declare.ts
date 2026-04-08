import {TEvo} from './evo.interface';

/**
 * в D:\PROJECTS\evo-front-lib\tsconfig.json
 *
 * "paths": { "evo-lib": [ "projects/evo-lib/src/public-api.ts" ] },
 *
 * помогло в одновременном обновлении в библиотеке и в приложении DEMO
 */


declare global {
  interface Window {
    evo: TEvo;
  }
  const evo: TEvo;
}

// Экспорт по умолчанию, чтобы файл считался модулем
// (иначе TypeScript не разрешает объявления в `declare global`)
export {};
