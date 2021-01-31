import React, { useEffect, useState } from 'react';

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {

  const [id, setId] = useState(0);

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  // increase the id count
  const idProvider = () => {
    setId(Math.floor(Math.random() * 10000));
  }

  const getCurrentTime = () => {
    const date = new Date();
    const createdDate = date.toUTCString();
    return createdDate;
  }

  const submitTodoHandler = (e) => {
    idProvider()

    e.preventDefault();
    if (inputText.length <= 0) {
      alert("Please write something to add...");
    } else if (inputText.length > 50) {
      alert("Max length is 50");
    } else {
      setTodos([
        ...todos, {task: inputText, completed: false, createdDate: getCurrentTime() , id: id.toString()},
      ]);
    }
    setInputText("");
  }

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  return (
    <form className="todo-form">
      <input type="text" className="task-input" placeholder="Add task" value={inputText} onChange={inputTextHandler} />
      <button type="submit" className="submit-bnt" onClick={submitTodoHandler} >
        <i className="fas fa-plus-circle"></i>
      </button>

      <div className="filter">
        <select name="todos" className="filter-todo" onChange={statusHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;