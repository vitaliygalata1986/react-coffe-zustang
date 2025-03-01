import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getCoffeeList } from './coffeStore';
import { createJSONStorage } from 'zustand/middleware';
import { hashStorage } from '../types/helpers/hashStorage';

interface ISearchState {
  text?: string;
}

interface ISearchActions {
  setText: (text: string) => void;
}

const searchSlice: StateCreator<
  ISearchState & ISearchActions,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown]
  ]
> = (set) => ({
  text: undefined,
  setText: (text) => set({ text }, false, 'setText'),
});

/*
    Вызов set({ text }, false, 'setSearchText') в zustand делает следующее:
        - Первый аргумент { text } – обновляет состояние, устанавливая новое значение text.
        - Второй аргумент false – отключает автоматическое слияние состояния. Если передать true, zustand выполнит глубокое слияние объектов состояния.
        - Третий аргумент 'setSearchText' – это "имя действия" для DevTools (zustand/devtools). Оно позволяет в инструментах разработчика видеть, какое именно изменение состояния произошло.
    Этот синтаксис используется, когда подключены плагины zustand/devtools или zustand/persist. Если бы эти плагины не использовались, можно было бы просто написать set({ text }).
*/

export const useSearchStore = create<ISearchActions & ISearchState>()(
  devtools(persist(searchSlice, { name: 'searchStore', storage: createJSONStorage(() => hashStorage) }), { name: 'searchStore' })
);

useSearchStore.subscribe((state, prevState) => {
  // прнимает state и предыдущее состояние, которые сразу типизированы под те типы, которые мы указали в StateCreator (тоесть ISearchActions & ISearchState)
  if (state.text !== prevState.text) {
    getCoffeeList({ text: state.text });
  }
});

/*
мы связали несколько store через функцию subscribe, которая срабатывает при изменении состояния.
*/

/*
  create<ISearchActions & ISearchState>()(...) – создаем Zustand-хранилище.
  persist(searchSlice, { storage: createJSONStorage(() => hashStorage) }) – добавляем механизм сохранения состояния в hashStorage (то есть в URL-хэш).
  Работает без localStorage или sessionStorage, но сохраняет данные при перезагрузке.
  devtools(...) – подключаем Redux DevTools для отладки.
*/

/*
  Когда состояние обновляется, оно автоматически сериализуется в JSON и сохраняется в hashStorage.
  При загрузке страницы состояние считывается из хэша URL.
  Это полезно для управления фильтрами поиска, табов или других параметров, которые хочется сохранять в URL.
  DevTools позволяет отлаживать изменения в браузере.
*/