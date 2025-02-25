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
