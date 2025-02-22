import { create, StateCreator } from 'zustand';
import { CoffeeType } from '../types/coffetypes';
import { devtools } from 'zustand/middleware';
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

const BASE_URL = 'https://purpleschool.ru/coffee-api';

// Определение типа состояния

type CoffeState = {
  coffeeList?: CoffeeType[];
};

type CoffeeActions = {
  //  функция для загрузки списка кофе из API
  getCoffeeList: () => void;
};

// StateCreator в Zustand — это функция, которая определяет хранилище, его начальное состояние и методы для его изменения
// Функция coffeeSlice — это StateCreator, которая
/*
  Инициализирует coffeeList со значением undefined
  Определяет метод getCoffeeList, который
    Делаем GET-запрос к BASE_URL с помощью axios.
    Полученные данные сохраняются в coffeeList с помощью set().
*/
const coffeeSlice: StateCreator<CoffeeState & CoffeeActions,[['zustand/devtools']]> = (set) => ({
  coffeeList: undefined,
  getCoffeeList: async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      set({ coffeeList: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
});

// Создание и экспорт Zustand-хранилища:
// create() — создаёт Zustand-хранилище с состоянием (CoffeState) и действиями (CoffeeActions)
// devtools(coffeeSlice) — подключает middleware devtools, позволяющую отслеживать изменения состояния в Redux DevTools
// В результате создания хранилища мы получаем React хук useCoffeeStore, который используем для реактивного отображения изменений данных в компонентах.
export const useCoffeeStore = create<CoffeState & CoffeeActions>()(
  devtools(coffeeSlice)
);

// Что делает StateCreator?
/*
  Принимает set — функцию, которая обновляет состояние.
  Возвращает объект с состоянием (coffeeList) и методами (getCoffeeList).
*/

// Что означает [['zustand/devtools']]
// Это middleware, подключающая Redux DevTools для отладки.
