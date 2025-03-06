import './App.css';
import Cart from './components/Cart';
import SearchInput from './components/SearchInput';
import CardList from './components/CardList';
import CategoryPicker from './components/CategoryPicker';

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
  // const { text, setText } = useSearchStore();

  /*
  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setText(text);
  };
  */

  return (
    <div className='wrapper'>
      <CategoryPicker />
      <SearchInput />
      <div style={{ display: 'flex' }}>
        <CardList />
        <Cart />
      </div>
    </div>
  );
}

// disabled allowHalf - рейтинги нельзя изменять и показывать целочисленные рейтинги
export default App;
