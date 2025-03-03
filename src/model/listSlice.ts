import { CartActions, CartState, ListActions, ListState } from './storetypes';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { BASE_URL } from '../api/CoffeeApi';

export const listSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [['zustand/devtools', never], ['zustand/persist', unknown]], // middleware
  [['zustand/devtools', never], ['zustand/persist', unknown]], // middleware
  ListActions & ListState
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  params: {
    text: undefined,
  },
  setParams: (newParams) => {
    const { getCoffeeList, params } = get();
    set({ params: { ...params, ...newParams } }, false, 'setParams');
    getCoffeeList(newParams);
  },
  getCoffeeList: async (params) => {
    const { controller } = get();
    // Перед новым запросом проверяется, есть ли активный controller
    if (controller) {
      // если есть контроллер, то обрываем его (это обрывает запрос с которым связан данный контроллер)
      // Если предыдущий запрос ещё не завершён, он прерывается.
      // Это предотвращает ситуации, когда пользователь быстро вводит текст в поиск и отправляется несколько запросов одновременно.
      controller.abort();
    }
    // Создаётся новый AbortController для нового запроса
    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController; // получаем с нового контроллера сигнал, будет связывать наш запрос с нашим стейтом
    // signal связывает этот контроллер с запросом

    try {
      // Axios использует signal для связи запроса с AbortController
      // Теперь этот HTTP-запрос можно отменить вызовом controller.abort()
      const { data } = await axios.get(BASE_URL, { params, signal });
      set({ coffeeList: data });
    } catch (error) {
      // Обрабатывается ошибка отмены запроса
      // Если запрос отменён, не выводится ошибка в консоль
      if (axios.isCancel(error)) {
        return; // Если запрос был отменён, просто выходим
      }
      console.log(error);
    }
  },
});
