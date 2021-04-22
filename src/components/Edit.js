import React from 'react';

const Edit = ({ todo, setEdit, editInput, setEditInput, priority }) => {

  const inputTextHandler = (e) => {
    setEditInput(e.target.value);
  }
  
  const UpdateTodo = () => {
    var todos = JSON.parse(localStorage.getItem('todos'))

    // if the user let the input empty it won't update the task
    if (editInput.length > 0) { 
      todo.task = editInput;
      todo.priority = priority;

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