import { ToDoList } from "./components/Videojuegos"
import TodoForm from "./components/TodoForm";
import { useState } from "react"

const initialTodos = [

  {
    id: 2,
    title: "Fornite",
    description: "¿tiltearte? Obvio",
  },
];

export const Videojuego = () => {

  const [todos, setTodos] = useState(initialTodos);
  const [todoEdit, setTodoEdit] = useState(null);

  const todoDelete = (todoId) => {
    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }

    const changedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(changedTodos);
  };


  const todoAdd = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false,
    };
    const changedTodos = [newTodo, ...todos];
    setTodos(changedTodos);
  };

  const todoUpdate = (todoEdit) => {
    const changedTodos = todos.map((todo) =>
      todo.id === todoEdit.id ? todoEdit : todo
    );
    setTodos(changedTodos);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {/* LLAMAR COMPONENTES */}
          <TodoForm
            todoAdd={todoAdd}
            todoEdit={todoEdit}
            todoUpdate={todoUpdate}
            setTodoEdit={setTodoEdit}
          />
        </div>
        <div className="col-6">
          <ToDoList
            todos={todos}
            todoDelete={todoDelete}
            setTodoEdit={setTodoEdit}
          />
        </div>
      </div>
    </div>
  )
}