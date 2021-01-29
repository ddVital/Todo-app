import React from 'react';

const Edit = ({ todo, setEdit, setEditInput, editInput, todos }) => {

  const inputTextHandler = (e) => {
    setEditInput(e.target.value);
  }

  const saveInput = () => {
    todo.task = editInput;
    
    setEdit(false);
  }
  
  return (
    <div>
      <input type="text" value={editInput} onChange={inputTextHandler} autoFocus />
      <button onClick={saveInput}>
        <i className="fas fa-save"></i>
      </button>
    </div>    
  );
}

export default Edit;