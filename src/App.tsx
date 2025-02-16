import './App.css';
import { useCounterStore } from './model/counterStore'; // кастомный Zustand-хук из файла ./model/counterStore

function App() {
  // const counter = useCounterStore((state) => state.counter);
  const { counter, increment, decrement } = useCounterStore(); // Вытаскиваем counter из Zustand-хранилища
  return (
    <>
      <button onClick={increment}>+</button>
      <span>{counter}</span>
      <button onClick={decrement}>-</button>
    </>
  );
}

export default App;
