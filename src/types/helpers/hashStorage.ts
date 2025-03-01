import { StateStorage } from 'zustand/middleware';

export const hashStorage: StateStorage = {
  getItem: (key): string => {
    // получаем хранилище

    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    return JSON.parse(storedValue);

    /*
    const value = sessionStorage.getItem(key);
    return JSON.parse(String(value));
    */
    // String(value) - это делается для предотвращения ошибки, если value === null.
    // String(null) вернет "null", что безопасно передавать в JSON.parse().
  },
  setItem: (key, newValue): void => {
    // устанавливаем хранилище

    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();

    // sessionStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: (key): void => {
    // удаляем хранилище

    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();

    // sessionStorage.removeItem(key);
  },
};

/*
  Этот код определяет пользовательское хранилище состояния для Zustand 
  с использованием хэша URL как места хранения данных
  hashStorage – Кастомное хранилище Zustand, использующее хэш URL
*/

/*
  getItem(key): Читает значение из хэша URL (например, #search=...) и парсит его как JSON.
  setItem(key, newValue): Устанавливает переданное значение в хэш URL.
  removeItem(key): Удаляет ключ из хэша.
*/

/*
  Хэш URL (location.hash) используется как аналог локального хранилища. Например:
  setItem('search', { query: "zustand" }) → location.hash = "#search={\"query\":\"zustand\"}"
  getItem('search') вернет { query: "zustand" }
*/

/*
  Использование хэша полезно, потому что:
  Данные не исчезают при перезагрузке страницы.
  Можно передавать состояние в ссылках (например, делиться фильтрами поиска).
*/
