import { clearCart, orderCoffee, setAddress, useCoffeeStore } from '../model/coffeStore';
import { Button, Input } from 'antd';
import { useShallow } from 'zustand/shallow';

function Cart() {
  const [cart, address] = useCoffeeStore(
    useShallow((state) => [state.cart, state.address])
  );
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
