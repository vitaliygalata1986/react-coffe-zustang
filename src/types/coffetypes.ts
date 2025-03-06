export enum CoffeeCategoryEnum {
  cappuccino = 'cappuccino',
  latte = 'latte',
  macchiato = 'macchiato',
  americano = 'americano',
}

export type CoffeeType = {
  id: number;
  name: string;
  price: number;
  subTitle: string;
  type: string;
  image: string;
  rating: number;
};

export type getCoffeeListReqParams = {
  text?: string;
  type?: CoffeeCategoryEnum; //  необязательное поле, которое может содержать одно из значений CoffeeCategoryEnum (например, 'latte' или 'americano')
};

export type OrderItem = {
  id: number;
  name: string;
  size: 'L';
  quantity: number;
};

export type OrderCoffeeReq = {
  address: string;
  orderItems: OrderItem[];
};

export type OrderCoffeeRes = {
  message: string;
  success: boolean;
};

/*
  Здесь определен перечисляемый тип (enum) CoffeeCategoryEnum, который содержит различные категории кофе. 
  Например, если обратиться к CoffeeCategoryEnum.latte, мы получим строку 'latte'.
*/
