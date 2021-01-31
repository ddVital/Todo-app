import React from 'react';

const Edit = ({ todo, setEdit, setEditInput, editInput }) => {

  const inputTextHandler = (e) => {
    setEditInput(e.target.value);
  }
  
  const saveInput = () => {
    var todos = JSON.parse(localStorage.getItem('todos'))    
    todo.task = editInput;

    todos.map((item, index) => {
      if (item.id === todo.id) {
        todos[index].task = editInput;
        localStorage.setItem('todos',JSON.stringify(todos));
      }
    });
    setEdit(false);
  }
  
  return (
    <form className="edit-todo">
      <input type="text" className="edit" value={editInput} onChange={inputTextHandler} autoFocus />
      <button onClick={saveInput} className="save-bnt">
        <i className="fas fa-save"></i>
      </button>
    </form>    
  );
}

export default Edit;