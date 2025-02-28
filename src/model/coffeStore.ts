import { create, StateCreator } from 'zustand';
import {
  CoffeeType,
  getCoffeeListReqParams,
  OrderCoffeeReq,
  OrderCoffeeRes,
  OrderItem,
} from '../types/coffetypes';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

/*
  Этот код использует Zustand — легковесную библиотеку для управления состоянием в React-приложениях. 
  Кроме того, он применяет Axios для выполнения HTTP-запросов к API.
*/

/*
  create и StateCreator из zustand — функции для создания хранилища состояния.
  CoffeeType из ../types/coffetypes — импортируемый тип данных, описывающий структуру объекта кофе.
  devtools из zustand/middleware — middleware для интеграции с Redux DevTools, позволяющей отслеживать изменения состояния.
  axios — HTTP-клиент для запросов к API.
*/

/*
  controller — это экземпляр AbortController, который позволяет отменять HTTP-запросы.
*/

const BASE_URL = 'https://purpleschool.ru/coffee-api';

// Определение типа состояния

type CoffeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController; // объект, который позволяет обрывать один или несколько HTTP-запросов
  cart?: OrderItem[]; // массив объектов OrderItem
  address?: string; // адрес доставки
};

type CoffeeActions = {
  //  функция для загрузки списка кофе из API
  getCoffeeList: (params?: getCoffeeListReqParams) => void;
  addToCart: (item: CoffeeType) => void;
  clearCart: () => void;
  orderCoffee: (params: OrderCoffeeReq) => void;
  setAddress: (address: string) => void;
};

// StateCreator в Zustand — это функция, которая определяет хранилище, его начальное состояние и методы для его изменения
// Функция coffeeSlice — это StateCreator, которая
/*
  Инициализирует coffeeList со значением undefined
  Определяет метод getCoffeeList, который
    Делаем GET-запрос к BASE_URL с помощью axios.
    Полученные данные сохраняются в coffeeList с помощью set().
*/
const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [['zustand/devtools', never], ['zustand/persist', unknown]] // middleware
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  cart: undefined,
  address: undefined,
  addToCart: (item) => {
    const { cart } = get();
    const { id, name, subTitle } = item; // нам нужны только id, name и subTitle
    const preparedItem: OrderItem = {
      id,
      name: `${name} ${subTitle}`,
      size: 'L',
      quantity: 1,
    };
    set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
  },
  clearCart: () => set({ cart: undefined }),
  orderCoffee: async () => {
    const { cart, address, clearCart } = get();
    try {
      const { data } = await axios.post<OrderCoffeeRes>(`${BASE_URL}/order`, {
        address,
        orderItems: cart,
      });
      if (data.success) {
        alert(data.message);
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  },
  setAddress: (address) => {
    set({ address });
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

// Создание и экспорт Zustand-хранилища:
// create() — создаёт Zustand-хранилище с состоянием (CoffeState) и действиями (CoffeeActions)
// devtools(coffeeSlice) — подключает middleware devtools, позволяющую отслеживать изменения состояния в Redux DevTools
// В результате создания хранилища мы получаем React хук useCoffeeStore, который используем для реактивного отображения изменений данных в компонентах.
export const useCoffeeStore = create<CoffeState & CoffeeActions>()(
  devtools(
    persist(coffeeSlice, {
      name: 'coffeeStore', // coffeeStore - имя хранилища в localStorage
      partialize: (state) => ({ cart: state.cart, address: state.address }), // сохраняем только cart
    }),
    {
      name: 'coffeeStore', // coffeeStore - имя хранилища в devtools
    }
  )
);

// Что делает StateCreator?
/*
  Принимает set — функцию, которая обновляет состояние.
  Возвращает объект с состоянием (coffeeList) и методами (getCoffeeList).
*/

// Что означает [['zustand/devtools']]
// Это middleware, подключающая Redux DevTools для отладки.

// экспортируем getCoffeeList
/*
В этом коде:
  - Экспортируем функцию getCoffeeList — она будет доступна для использования в других модулях.
  - Функция getCoffeeList принимает необязательный параметр params — если переданы параметры, они будут использоваться в запросе.
  - Вызываем getCoffeeList из useCoffeeStore.getState() — это указывает на то, что мы используем Zustand (библиотеку для управления состоянием в React).
  - useCoffeeStore.getState() получает текущее состояние стора, а затем вызывается метод getCoffeeList, который, загружает список кофе.
Фактически, этот код позволяет удобно вызывать метод getCoffeeList из стора Zustand без необходимости вручную использовать useCoffeeStore.
Функция getCoffeeList не вызывается автоматически при загрузке модуля. Она просто экспортируется, чтобы её можно было вызвать вручную в любом месте кода.
*/
export const getCoffeeList = (params?: getCoffeeListReqParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
