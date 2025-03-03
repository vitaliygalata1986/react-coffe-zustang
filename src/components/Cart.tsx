import React from 'react';
import { useCoffeeStore } from '../model/coffeStore';
import { Button, Input } from 'antd';

function Cart() {
      const {
        cart,
        clearCart,
        orderCoffee,
        setAddress,
        address
      } = useCoffeeStore();
  return (
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
  );
}

export default Cart;
