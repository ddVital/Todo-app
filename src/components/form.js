import React from 'react';

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (inputText.length <= 0) {
      alert("Please write something to add...")
    } else if (inputText.length > 50) {
      alert("Max length is 50")
    } else {
      setTodos([
        ...todos, {task: inputText, completed: false, id: Math.random() * 1000}
      ]);
    }
    setInputText("");
  }

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  return (
    <form>
      <input type="text" placeholder="Add task" value={inputText} onChange={inputTextHandler} />
      <button type="submit" className="" onClick={submitTodoHandler} >
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
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