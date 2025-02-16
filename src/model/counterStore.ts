import { create, StateCreator } from 'zustand';

/*
	create — основная функция из zustand, которая создает хранилище (store).
	StateCreator — это тип для функции, создающей slice (кусок состояния).
*/

// Определение типа состояния
type CounterState = {
  counter: number; // Описываем CounterState — объект с одним числовым полем counter
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
  changeByAmound: (value: number) => void;
};

// Создание slice (части состояния)
// Это функция, которая определяет начальное состояние: counter: 0 — начальное значение счетчика.
const counterSlice: StateCreator<CounterState & CounterActions> = (
  set,
  get
) => ({
  counter: 0,
  decrement() {
    const { counter } = get(); // получаем с помощью get() значение counter из состояния
    // set((state) => ({ ...state, counter: counter - 1 }));
    // но если не нужно менять весь state
    set({ counter: counter - 1 });
  },
  increment() {
    const { counter } = get();
    set({ counter: counter + 1 });
  },
  changeByAmound(value) {
    const { counter } = get();
    set({ counter: counter + value });
  },
});

// Создание хранилища Zustand
export const useCounterStore = create<CounterState & CounterActions>(
  counterSlice
);

// create<CounterState>(counterSlice) создает Zustand-хук, который можно использовать в компонентах React

export const changeByAmound = (value: number) => useCounterStore.getState().changeByAmound(value);
export const getCounter = () => useCounterStore.getState().counter;
