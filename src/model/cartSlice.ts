import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from './storetypes';
import { OrderCoffeeRes, OrderItem } from '../types/coffetypes';
import axios from 'axios';
import { BASE_URL } from '../api/CoffeeApi';

export const cartSlice: StateCreator<
  CartActions & CartState & ListActions & ListState,
  [['zustand/devtools', never], ['zustand/persist', unknown]], // middleware
  [['zustand/devtools', never], ['zustand/persist', unknown]], // middleware
  CartActions & CartState
> = (set, get) => ({
  cart: undefined,
  address: undefined,
  clearCart: () => set({ cart: undefined }),
  setAddress: (address) => {
    set({ address });
  },
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
});
