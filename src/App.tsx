import { Button, Card, Rate, Tag, Input } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCoffeeStore } from './model/coffeStore'; // Подключаем Zustand-хранилище, которое было создано в файле coffeStore.ts.

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

  const { getCoffeeList, coffeeList } = useCoffeeStore();
  const [text, setText] = useState<string | undefined>('');

  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setText(text);
  };

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className='wrapper'>
      <Input
        placeholder='Search'
        value={text}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className='cardsContainer'>
        {coffeeList &&
          coffeeList.map((coffee) => (
            <Card
              key={coffee.id}
              cover={<img alt={coffee.image} src={coffee.name} />}
              actions={[
                <Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>,
              ]}
            >
              <Card.Meta title={coffee.name} description={coffee.subTitle} />
              <Tag color='purple' style={{ marginTop: 12 }}>
                {coffee.type}
              </Tag>
              <Rate
                defaultValue={coffee.rating}
                disabled
                allowHalf
                style={{ marginTop: 12 }}
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

// disabled allowHalf - рейтинги нельзя изменять и показывать целочисленные рейтинги
export default App;
