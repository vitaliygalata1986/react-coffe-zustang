import { Card, Checkbox, Input } from 'antd';
import './App.css';
//import { addTen } from './helpers/addTen';
//import { useCounterStore } from './model/counterStore'; // кастомный Zustand-хук из файла ./model/counterStore
import { useTodoStore } from './model/toDoStore';
import { useState } from 'react';

function App() {
  // const counter = useCounterStore((state) => state.counter);
  //const { counter, increment, decrement } = useCounterStore(); // Вытаскиваем counter из Zustand-хранилища
  const { addTodo, changeIsComplete, todos } = useTodoStore();
  const [value, setValue] = useState<string>('');
  return (
    <div className='wrapper'>
      <div>
        {/* <button onClick={increment}>+</button>
        <span>{counter}</span>
        <button onClick={decrement}>-</button>
        <button onClick={addTen}>add10</button> */}
        <Input
          style={{ width: 300 }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo(value!);
              setValue('');
            }
          }}
        />
        {todos.map((todo, index) => (
          <Card className='card'>
            <Checkbox
              checked={todo.isComplete}
              onChange={() => changeIsComplete(index)}
            />
            <span>{todo.title}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
