import React from 'react';
// importing components
import Todo from './Todo';

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="todos-container">
      {todos.map(todo => (
        <Todo 
          key={todo.id}
          setTodos={setTodos}
          todos={todos}
          todo={todo}
        />
      ))}
    </div>
  );
}

export default TodoList;