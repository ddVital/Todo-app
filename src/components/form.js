import React, { useState } from 'react';

const Form = ({ inputText, setInputText, priority, setPriority, todos, setTodos, status, setStatus }) => {

  const [id, setId] = useState(Math.floor(Math.random() * 10000));
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  // give id
  const idProvider = () => {
    const newId = Math.floor(Math.random() * 10000);

    setId(newId);
  }

  const getCurrentTime = () => {
    const date = new Date();
    const createdDate = date.toUTCString();
    return createdDate;
  }

  const submitTodoHandler = (e) => {
    idProvider();

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

  const statusHandler = (option) => {
    setStatus(option);
  }

  const deleteAll = () => {
    setTodos([])
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

        <DropdownSelect
        statusHandler={statusHandler}
        status={status}
        DropdownOpen={DropdownOpen}
        setDropdownOpen={setDropdownOpen}/>
      </section>
    </div>
  );
}

function DropdownSelect({ status, statusHandler, DropdownOpen, setDropdownOpen }) {
  const closeDropdown = () => setDropdownOpen(!DropdownOpen);

  const select = (option) => {
    closeDropdown()
    statusHandler(option);
  }

  return (
    <div className={`select`}>
      <header className="select__header" onClick={() => setDropdownOpen(!DropdownOpen)}>
        <p className="select__title">{ status }</p>
        <i className={`fas ${DropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </header>

      {
        DropdownOpen
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
  );
}

export default Form;