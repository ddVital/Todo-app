import React, { useState } from 'react';

const Edit = ({ todo, setEdit, priority }) => {

  const [editInput, setEditInput] = useState(todo.task ? todo.task : ''); // the edited content

  const inputTextHandler = (e) => setEditInput(e.target.value); // update the input value
  
  const UpdateTodo = () => {
    let todos = JSON.parse(localStorage.getItem('todos'))

    // if the input is empty or greater than the max length it won't update the task
    if (editInput.length > 0 && editInput.length < 25) { 
      // set new values before refresh
      todo.task = editInput;
      todo.priority = priority; 

      // update the item in localstorange
      todos.map((item, index) => {
        if (item.id === todo.id) {
          todos[index].task = editInput;
          todos[index].priority = priority;
          return localStorage.setItem('todos', JSON.stringify(todos));
        }
      });
    }

    setEdit(false);
  }
  
  return (
    <form className="edit" onSubmit={UpdateTodo}>
      <div>
        <span className="created-date">{todo.createdDate.substring(0, 7)}</span>
        <input type="text" className="edit__input" value={editInput} onChange={inputTextHandler} autoFocus />
      </div>
      <button className="edit__btn">
        <i className="fas fa-save"></i>
      </button>
    </form>    
  );
}

export default Edit;