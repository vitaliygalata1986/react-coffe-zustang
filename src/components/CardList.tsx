import { useShallow } from 'zustand/shallow';
import { useCoffeeStore } from '../model/coffeStore';
import CoffeeCard from './CoffeeCard';


function CardList() {
  const [coffeeList] = useCoffeeStore(
    useShallow((state) => [state.coffeeList])
  );
  return (
    <div className='cardsContainer'>
      {coffeeList &&
        coffeeList.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
    </div>
  );
}

export default CardList;
