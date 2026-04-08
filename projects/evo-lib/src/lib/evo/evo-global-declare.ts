import {TEvo} from './evo.interface';

declare global {
  interface Window {
    evo: TEvo;
  }
  const evo: TEvo;
}

// Экспорт по умолчанию, чтобы файл считался модулем
// (иначе TypeScript не разрешает объявления в `declare global`)
export {};
