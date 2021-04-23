import React, { useState } from 'react';

// components
import Edit from './Edit';

const Todo = ({ setTodos, todos, todo }) => {
  
  const [edit, setEdit] = useState(false); // change the content for the edit input
  const [open, setOpen] = useState(false); // open the todo options (delete, edit, complete...)
  const [priority, setPriority] = useState(todo.priority); // priority color

  const closeOpen = () => setOpen(!open);

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id ))
    closeOpen();
  }

  const completeHandler = () => {
    setTodos(todos.map((item) => {
      if (item.id === todo.id) return {...item, completed: !item.completed}

      return item;
    }));

    closeOpen();
  }

  const ShowPopup = () => {
    const popups = document.querySelectorAll('.show');

    for (let index = 0; index < popups.length; index++) {
      const ele = popups[index];  
      ele.className = "options hide";
    }

    setOpen(!open);
  }

  // show the edit component
  const editTodo = () => {
    setEdit(true);
    closeOpen();
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
            <button aria-label="task options" className="task-options" onClick={ShowPopup}>
              <i className="fas fa-ellipsis-v"></i>
            </button>

          {
            open
            ?
              <div className={`options ${open ? 'show' : 'hide'}`}>
                <button aria-label="Complete task" className="options__item" onClick={completeHandler}>
                  <i className={`fas ${todo.completed ? "fa-times" : "fa-check"}`}></i> {todo.completed ? 'Uncomplete' : "Complete task"}
                </button>
                <button aria-label="Edit task" className="options__item" onClick={editTodo}>
                  <i className="fas fa-pen"></i> Edit task
                </button>
                <button aria-label="Delete task" className="options__item" onClick={deleteHandler}>
                  <i className="fas fa-trash"></i> Delete task
                </button>
              </div>
            :
            ''
          }
        </div>
      }
    </div>    
  );
}

export default Todo;