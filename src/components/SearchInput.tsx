import { Input } from 'antd';
import { getCoffeeList, setParams, useCoffeeStore } from '../model/coffeStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useUrlParamsStore } from '../types/helpers/useUrlStorage';

function SearchInput() {
  const [params] = useCoffeeStore(useShallow((state) => [state.params]));
  useEffect(() => {
    getCoffeeList(params);
  }, []);

  useUrlParamsStore(params, setParams);

  return (
    <Input
      placeholder='Search'
      value={params.text}
      onChange={(e) => setParams({ text: e.target.value })} // передаем новый text в наш store useCoffeeStore
    />
  );
}

export default SearchInput;
