import React from 'react';
// importing components
import Todo from './Todo';

const TodoList = ({ todos, setTodos }) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <Todo 
            key={todo.id}
            setTodos={setTodos}
            todos={todos}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;