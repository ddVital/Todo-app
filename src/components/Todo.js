import React from 'react';

const Todo = ({ todos, todo, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id ))
  }

  const completeHandler = () => {
    setTodos(todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        };
      }
      return item;
    })
    );
  }

  return (
    <div className="todo" >
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{ todo.task }</li>
      <p>{todo.createdDate}</p>
      <button className="complete-bnt" onClick={completeHandler}>
        <i className="fas fa-check"></i>
      </button>
      <button className="edit-bnt">
        <i className="fas fa-pen"></i>
      </button>
      <button className="trash-bnt" onClick={deleteHandler}>
        <i className="fas fa-trash"></i>
      </button>
    </div>    
  );
}

export default Todo;