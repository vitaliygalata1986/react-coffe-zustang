import { Button } from 'antd';
import { CoffeeCategoryEnum } from '../types/coffetypes';
import { setParams, useCoffeeStore } from '../model/coffeStore';
import { useShallow } from 'zustand/shallow';

function CategoryPicker() {
  const [params] = useCoffeeStore(useShallow((state) => [state.params]));
  return (
    <div>
      {Object.keys(CoffeeCategoryEnum).map((key) => (
        <Button
          danger={params.type === key}
          onClick={() =>
            setParams({
              type: CoffeeCategoryEnum[key as keyof typeof CoffeeCategoryEnum],
            })
          }
          key={key}
        >
          {key}
        </Button>
      ))}
    </div>
  );
}

export default CategoryPicker;

/*
    Object.keys(CoffeeCategoryEnum) получает массив строковых ключей из CoffeeCategoryEnum, т.е. ['cappucino', 'latte', 'macchiato', 'americano'].
    key as keyof typeof CoffeeCategoryEnum приводит key к типу ключей CoffeeCategoryEnum.
*/
