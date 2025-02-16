import { getCounter, changeByAmound } from '../model/counterStore';

export const addTen = () => {
  const counter = getCounter(); // получим значение счетчика
  if (counter < 0) {
    changeByAmound(-10);
  } else {
    changeByAmound(10);
  }
};
