import { useEffect, useState } from 'react';
import './App.css';

// importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("low");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // RUN ONLY ONCE WHEN THE APP STARTS
  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const search = (task) => {
    setFilteredTodos(todos.filter(todo => todo.task.includes(task)));  
  }
  
  const updateSearch = e => {
    setSearchQuery(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    search(searchQuery);
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null ) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }  
  }
  
  return (
    <div className="App">
      <header className="header">
        <h1>Todo App</h1>

        <section className="search">
          <form onSubmit={getSearch}>
            <div className="search-box">
              <input type="text" placeholder="Search" className="" value={searchQuery} onChange={updateSearch} />
              <button type='submit' className="search__btn">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </section>

      </header>

      <section>
        <Form
          todos={todos}
          setTodos={setTodos}
          priority={priority}
          setPriority={setPriority}
          inputText={inputText}
          setInputText={setInputText}
          status={status}
          setStatus={setStatus} />
      </section>

      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        saveLocalTodos={saveLocalTodos}
        priority={priority}
        setPriority={setPriority}/>
    </div>
  );
}

export default App;