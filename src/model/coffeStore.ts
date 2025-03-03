import { create } from 'zustand';
import { getCoffeeListReqParams } from '../types/coffetypes';
import { CartActions, CartState, ListActions, ListState } from './storetypes';
import { devtools, persist } from 'zustand/middleware';
import { listSlice } from './listSlice';
import { cartSlice } from './cartSlice';

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

// StateCreator в Zustand — это функция, которая определяет хранилище, его начальное состояние и методы для его изменения
// Функция coffeeSlice — это StateCreator, которая
/*
  Инициализирует coffeeList со значением undefined
  Определяет метод getCoffeeList, который
    Делаем GET-запрос к BASE_URL с помощью axios.
    Полученные данные сохраняются в coffeeList с помощью set().
*/

// Создание и экспорт Zustand-хранилища:
// create() — создаёт Zustand-хранилище с состоянием (CoffeState) и действиями (CoffeeActions)
// devtools(coffeeSlice) — подключает middleware devtools, позволяющую отслеживать изменения состояния в Redux DevTools
// В результате создания хранилища мы получаем React хук useCoffeeStore, который используем для реактивного отображения изменений данных в компонентах.
export const useCoffeeStore = create<
  CartActions & CartState & ListActions & ListState
>()(
  devtools(
    persist((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) }), {
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
