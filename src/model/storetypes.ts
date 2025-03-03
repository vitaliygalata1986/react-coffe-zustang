import { CoffeeType, getCoffeeListReqParams, OrderCoffeeReq, OrderItem } from '../types/coffetypes';


export type ListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController; // объект, который позволяет обрывать один или несколько HTTP-запросов
  params: getCoffeeListReqParams;
};

export type ListActions = {
  //  функция для загрузки списка кофе из API
  getCoffeeList: (params?: getCoffeeListReqParams) => void;
  setParams: (params?: getCoffeeListReqParams) => void;
};


export type CartState = {
  cart?: OrderItem[]; // массив объектов OrderItem
  address?: string; // адрес доставки
};

export type CartActions = {
  setAddress: (address: string) => void;
  clearCart: () => void;
  orderCoffee: (params: OrderCoffeeReq) => void;
  addToCart: (item: CoffeeType) => void;
};
