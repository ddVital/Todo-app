import React from 'react';

const Form = ({ setInputText }) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  const submitTodoHandler = (e) => {
    e.preventDefault();
  }

  return (
    <form>
      <input type="text" className="" onChange={inputTextHandler} />
      <button type="submit" className="" onClick={submitTodoHandler} >
        <i className="fas fa-plus-square"></i>
      </button>
      <div>
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;