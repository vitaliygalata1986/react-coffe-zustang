import { Button, Card, Rate, Tag, Input } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCoffeeStore } from './model/coffeStore'; // Подключаем Zustand-хранилище, которое было создано в файле coffeStore.ts.
import { useSearchStore } from './model/searchStore';

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

  const {
    getCoffeeList,
    coffeeList,
    addToCart,
    cart,
    clearCart,
    orderCoffee,
    setAddress,
    address,
  } = useCoffeeStore();

  const { text, setText } = useSearchStore();

  /*
  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setText(text);
  };
  */

  useEffect(() => {
    getCoffeeList({ text });
  }, []);

  return (
    <div className='wrapper'>
      <Input
        placeholder='Search'
        value={text}
        onChange={(e) => setText(e.target.value)} // передаем новый text в наш store useCoffeeStore
      />
      <div style={{ display: 'flex' }}>
        <div className='cardsContainer'>
          {coffeeList &&
            coffeeList.map((coffee) => (
              <Card
                key={coffee.id}
                cover={<img alt={coffee.name} src={coffee.image} />}
                actions={[
                  <Button
                    onClick={() => addToCart(coffee)}
                    icon={<ShoppingCartOutlined />}
                  >
                    {coffee.price}
                  </Button>,
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
        <aside className='cart'>
          <h1>Заказ</h1>
          {cart && cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
              <Input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder='Введите адрес доставки'
              />
              <Button onClick={orderCoffee} type='primary' disabled={!address}>
                Сделать заказ
              </Button>
              <Button onClick={clearCart}>Очистить корзину</Button>
            </>
          ) : (
            <span>Добавьте напитки</span>
          )}
        </aside>
      </div>
    </div>
  );
}

// disabled allowHalf - рейтинги нельзя изменять и показывать целочисленные рейтинги
export default App;
