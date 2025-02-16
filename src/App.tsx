import './App.css';
import { addTen } from './helpers/addTen';
import { useCounterStore } from './model/counterStore'; // кастомный Zustand-хук из файла ./model/counterStore

function App() {
  // const counter = useCounterStore((state) => state.counter);
  const { counter, increment, decrement } = useCounterStore(); // Вытаскиваем counter из Zustand-хранилища
  return (
    <div className='wrapper'>
      <div>
        <button onClick={increment}>+</button>
        <span>{counter}</span>
        <button onClick={decrement}>-</button>
        <button onClick={addTen}>add10</button>
      </div>
    </div>
  );
}

export default App;
