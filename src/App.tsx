import { Button, Input } from 'antd';
import './App.css';
import { useEffect } from 'react';
import { useCoffeeStore } from './model/coffeStore'; // Подключаем Zustand-хранилище, которое было создано в файле coffeStore.ts.
import { useUrlParamsStore } from './types/helpers/useUrlStorage';
import CoffeeCard from './components/CoffeeCard';
import Cart from './components/Cart';

function App() {
  // Вызываем useCoffeeStore(), что даёт нам доступ к
  // getCoffeeList — функции загрузки списка кофе
  // coffeeList — массиву данных о кофе

  /*
   Итог:
    - При загрузке страницы компонент App вызывает getCoffeeList(), чтобы получить список кофе.
    - Когда coffeeList обновляется, компонент перерисовывается, показывая новые данные.
    - Всё это работает реактивно, без необходимости вручную обновлять состояние.
    - Zustand заменяет useState и useReducer, делая код чище и удобнее.
  */

  const { getCoffeeList, coffeeList, params, setParams } = useCoffeeStore();

  // const { text, setText } = useSearchStore();

  /*
  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setText(text);
  };
  */

  useEffect(() => {
    getCoffeeList(params);
  }, []);

  useUrlParamsStore(params, setParams);

  return (
    <div className='wrapper'>
      <Input
        placeholder='Search'
        value={params.text}
        onChange={(e) => setParams({ text: e.target.value })} // передаем новый text в наш store useCoffeeStore
      />
      <div style={{ display: 'flex' }}>
        <div className='cardsContainer'>
          {coffeeList &&
            coffeeList.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
        </div>
        <Cart />
      </div>
    </div>
  );
}

// disabled allowHalf - рейтинги нельзя изменять и показывать целочисленные рейтинги
export default App;
