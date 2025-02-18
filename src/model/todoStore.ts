import { create, StateCreator } from 'zustand';

export type TodoType = {
  title: number;
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

const todoSlice: StateCreator<TodoState & TodoActions> = (set, get) => ({
  todos: [],
  addTodo(value: string) {
    const { todos } = get(); // получаем все todo
    // создаем новый массив todo
    set({ todos: [...todos, { title: value, isComplete: false }] });
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
    set({ todos: newTodos });
  },
});

export const useTodoStore = create<TodoState & TodoActions>(todoSlice);
