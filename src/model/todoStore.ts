import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

/*
  Импортировали middleware devtools из zustand/middleware.
  Это позволяет нам подключить инструмент разработчика Redux DevTools, чтобы отслеживать изменения состояния.
*/

export type TodoType = {
  title: string;
  isComplete: boolean;
};

type TodoState = {
  todos: TodoType[];
};

type TodoActions = {
  addTodo: (value: string) => void;
  changeIsComplete: (index: number) => void;
};

/*
    addTodo(value: string) {
        const { todos } = get();
        set({ todos: [...todos, { title: value, isComplete: false }] });
    }
    * Получает текущее состояние todos.
    * Создает новый массив с добавленным todo (title и isComplete: false)
    * set обновляет todos в состоянии.
*/

/*
   changeIsComplete(index: number) {
        const { todos } = get();
        const newTodos: TodoType[] = [
        ...todos.slice(0, index),
        { ...todos[index], isComplete: !todos[index].isComplete },
        ...todos.slice(index + 1),
    ];
    set({ todos: newTodos });
    }
    * Получает текущее состояние todos.
    * Создает новый массив newTodos
        - todos.slice(0, index) — берет все элементы до index (не включая его).
        - { ...todos[index], isComplete: !todos[index].isComplete } — изменяет флаг isComplete у выбранного todo.
        - todos.slice(index + 1) — берет все элементы после index.
    * set({ todos: newTodos }) обновляет состояние.
*/

/*
    Пример
    todos = [
        { title: "Buy milk", isComplete: false },
        { title: "Do homework", isComplete: false },
        { title: "Go to gym", isComplete: false }
    ];
    // Если вызвать changeIsComplete(1), то:
    newTodos = [
        { title: "Buy milk", isComplete: false },
        { title: "Do homework", isComplete: true }, // изменили
        { title: "Go to gym", isComplete: false }
    ];
*/
// [['zustand/devtools']] - название middleware
// never - не нужно передавать никаких аргументов (для этого middleware)

/*
  Здесь [['zustand/devtools', never]] указывает, что todoSlice использует middleware devtools,
   и он не требует дополнительных аргументов (поэтому never).
*/

const todoSlice: StateCreator<
  TodoState & TodoActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  todos: [],
  addTodo(value: string) {
    const { todos } = get(); // получаем все todo
    // создаем новый массив todo
    // false - второй аргумент для предотвращения рендеринга состояния
    // третий параметр - название нашего action для отображения в Redux DevTools
    set(
      { todos: [...todos, { title: value, isComplete: false }] },
      false,
      `add Todo ${value}`
    );
  },
  changeIsComplete(index: number) {
    const { todos } = get();
    // создадим новый массив todo
    // который будет содержать все todo, кроме того, что мы меняем
    // и добавим в него новый todo
    // в конце идут все остальные todo
    const newTodos: TodoType[] = [
      ...todos.slice(0, index),
      { ...todos[index], isComplete: !todos[index].isComplete },
      ...todos.slice(index + 1),
    ];
    set(
      { todos: newTodos },
      false,
      `changeIsComplete ${todos[index].title} to ${newTodos[index].isComplete}`
    );
  },
});

// devtools(todoSlice) оборачивает todoSlice, позволяя видеть его в Redux DevTools.
export const useTodoStore = create<TodoState & TodoActions>()(
  devtools(todoSlice)
);
