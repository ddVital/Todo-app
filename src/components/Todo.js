import React, { useState } from 'react';

// components
import Edit from './Edit';

const Todo = ({ todos, todo, setTodos }) => {
  
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.task ? todo.task : ''); // the edited content
  const [openPopup, setOpenPopup] = useState(false);

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

  const ShowPopup = () => {
    const popups = document.querySelectorAll('.show');

    for (let index = 0; index < popups.length; index++) {
      const ele = popups[index];  
      ele.className = "options hide";
    }

    setOpenPopup(!openPopup);
  }

  // show the edit component
  const editTodo = () => {
    setEdit(true); 
  }

  return (
    <div className={`todo ${todo.priority} ${todo.completed ? "completed" : ""}`}>
      <div className='task info'>
        {
          edit
          ?
            <Edit 
            todo={todo}
            setEdit={setEdit}
            editInput={editInput}
            setEditInput={setEditInput}/>      
          :
            <p className={`task ${todo.completed ? "completed" : ""}`}>
            <span className="created-date" title={todo.createdDate}>{todo.createdDate.substring(0, 7)}</span> { todo.task }</p>
        }
      </div>
      {
        edit
        ?
        ''
        :
        <div className="right">
          <i className="fas fa-ellipsis-v task-options" onClick={ShowPopup} onTouchStart={ShowPopup}></i>

          {
            openPopup
            ?
            <OptionsPopup 
            openPopup={openPopup}
            deleteHandler={deleteHandler}
            editTodo={editTodo}
            completeHandler={completeHandler} />
            :
            ''
          }
        </div>
      }
    </div>    
  );
}

function OptionsPopup({ openPopup, deleteHandler, editTodo, completeHandler }) {
  return (
    <div className={`options ${openPopup ? 'show' : 'hide'}`}>
      <button className="options__item" onClick={completeHandler}>
        <i className="fas fa-check"></i> completed
      </button>
      <button className="options__item" onClick={editTodo}>
        <i className="fas fa-pen"></i> Edit task
      </button>
      <button className="options__item" onClick={deleteHandler}>
        <i className="fas fa-trash"></i> Delete task
      </button>
    </div>
  );
}

export default Todo;