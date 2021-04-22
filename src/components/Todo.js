import React, { useState } from 'react';

// components
import Edit from './Edit';

const Todo = ({ todos, filteredTodos, todo, setTodos }) => {
  
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.task ? todo.task : ''); // the edited content
  const [openPopup, setOpenPopup] = useState(false);
  const [priority, setPriority] = useState(todo.priority);

  const closeOptions = () => setOpenPopup(!openPopup);

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id ))
    closeOptions();
  }

  const completeHandler = () => {
    setTodos(todos.map((item) => {
      if (item.id === todo.id) return {...item, completed: !item.completed}

      return item;
    }));

    closeOptions();
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
    closeOptions();
  }
  
  const changeColor = (e) => {
    e.preventDefault();
  
    const eleClass = e.target.className;

    switch (true) {
      case eleClass.includes('low'):
        setPriority('medium');
        break;
    
      case eleClass.includes('medium'):
        setPriority('high');
        break;

      case eleClass.includes('high'):
        setPriority('low');
        break;
      default:
        break;
    }
  }

  return (
    <div className={`todo ${todo.completed ? "completed-todo" : ""}`}>
      <div className='task info'>
        <span className={`priority ${todo.completed ? "completed" : priority }`} onClick={edit ? changeColor : ''} onTouchStart={edit ? changeColor : ''}></span>
        {
          edit
          ?
          <p className='task'>
              <Edit 
              todo={todo}
              setEdit={setEdit}
              editInput={editInput}
              setEditInput={setEditInput}
              priority={priority}/>
            </p>
          :
            <p className='task'>
            <span className="created-date" title={todo.createdDate}>{todo.createdDate.substring(0, 7)}</span> { todo.task }</p>
        }
      </div>
      {
        edit
        ?
        ''
        :
        <div className="right">
            <button className="task-options" onClick={ShowPopup}>
              <i className="fas fa-ellipsis-v"></i>
            </button>

          {
            openPopup
            ?
            <OptionsPopup
            openPopup={openPopup}
            deleteHandler={deleteHandler}
            editTodo={editTodo}
            completeHandler={completeHandler}
            todo={todo}/>
            :
            ''
          }
        </div>
      }
    </div>    
  );
}

function OptionsPopup({ openPopup, deleteHandler, editTodo, todo, completeHandler }) {
  return (
    <div className={`options ${openPopup ? 'show' : 'hide'}`}>
      <button className="options__item" onClick={completeHandler}>
        <i className={`fas ${todo.completed ? "fa-times" : "fa-check"}`}></i> {todo.completed ? 'Uncomplete' : "Complete task"}
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