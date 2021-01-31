import React, { useState } from 'react';

// components
import Edit from './Edit';

const Todo = ({ todos, todo, setTodos }) => {

  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.task ? todo.task : ''); // the edited content

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

  // show the edit component
  const editTodo = () => {
    setEdit(true); 
  }

  return (
    <div className="todo" >
      <div className= {`task ${edit ? 'edit-container' : 'info'}`}>

        {
          edit
          ?
          <Edit todo={todo} setEdit={setEdit} editInput={editInput} setEditInput={setEditInput}/>
          :
          <p className={`task ${todo.completed ? "completed" : ""}`}>{ todo.task }</p>
        }
        <p className="created-date">{todo.createdDate}</p>

      </div>
      {
        edit
        ?
        ''
        :
        <div className="task-options">
          <button className="complete-bnt" onClick={completeHandler}>
            <i className="fas fa-check"></i>
          </button>
          <button className="edit-bnt" onClick={editTodo}>
            <i className="fas fa-pen"></i>
          </button>
          <button className="trash-bnt" onClick={deleteHandler}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      }
    </div>    
  );
}

export default Todo;