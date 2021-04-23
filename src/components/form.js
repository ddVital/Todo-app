import React, { useState } from 'react';

const Form = ({ inputText, setInputText, priority, setPriority, todos, setTodos, status, setStatus }) => {

  const [id, setId] = useState(Math.floor(Math.random() * 10000));
  const [open, setOpen] = useState(false);

  const inputTextHandler = (e) => setInputText(e.target.value);

  const generateNewId = () => setId(Math.floor(Math.random() * 10000));

  const getCurrentTime = () => {
    const date = new Date();
    const createdDate = date.toUTCString();
    return createdDate;
  }

  const submitTodoHandler = (e) => {
    generateNewId();

    e.preventDefault();
    if (inputText.length <= 0) {
      alert("Please write something to add...");
    } else if (inputText.length > 25) {
      alert("Max length is 25");
    } else {
      setTodos([
        ...todos, {
          task: inputText,
          priority: priority,
          completed: false,
          createdDate: getCurrentTime(),
          id: id.toString()},
      ]);
    }
    setInputText("");
  }

  const statusHandler = (option) => setStatus(option);

  const deleteAll = () => setTodos([]);

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

  const closeDropdown = () => setOpen(!open);

  const select = (option) => {
    closeDropdown();
    statusHandler(option);
  }

  return (
    <div>
      <form className="form">
        <div className="form__box">
          <button type="submit" className="submit-bnt" onClick={submitTodoHandler} >
            <i className="fas fa-plus"></i>
          </button>
          <button className={`form__priority ${priority}`} onClick={changeColor}></button>
          <input type="text" className="form__input" placeholder="Add task" value={inputText} onChange={inputTextHandler} />
        </div>
      </form>

      <section className="filter-section">
        <button className="delete-all" onClick={deleteAll}>Delete all tasks</button>

        <div className={`select`}>
          <header className="select__header" onClick={() => setOpen(!open)}>
            <p className="select__title">{ status }</p>
            <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </header>

          {
            open
            ?
            <ul className="select__options">
              <li className="select__option" onClick={() => select("all")}>
                All
              </li>
              <li className="select__option" onClick={() => select("completed")}>
                Completed
              </li>
              <li className="select__option" onClick={() => select("uncompleted")}>
                Uncompleted
              </li>
            </ul>
            :
            ''
          }
        </div>
      </section>
    </div>
  );
}

export default Form;