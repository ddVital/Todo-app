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

  useEffect(() => {
    getLocalTodos(); // get todos from local storange
  }, [])

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

	useEffect(() => {
    search();
  }, [searchQuery]);

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null ) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }  
  }

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

  const search = () => {
    if (searchQuery == '') setFilteredTodos(todos);
    else setFilteredTodos(todos.filter(todo => todo.task.toLowerCase().includes(searchQuery.toLowerCase())));
  }
  
  return (
    <div className="App">
      <header className="header">
        <a href="/" className="logo">Todo App </a>

        <section className="search">
					<form>
						<div className="search-box">
							<input type="search" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoComplete="off" maxLength="25" />
							<button type='submit' className="search__btn" onClick={(e) => e.preventDefault()}>
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
        todos={todos}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
        setTodos={setTodos}
				status={status}
        search={searchQuery}/>
    </div>
  );
}

function Search({ searchQuery, setSearchQuery, setFilteredTodos, todos }) {
  useEffect(() => {
    search();
  }, [searchQuery]);

  const search = () => {
    if (searchQuery == '') setFilteredTodos(todos)
    else setFilteredTodos(todos.filter(todo => todo.task.includes(searchQuery)));
  }

  return (
    <section className="search">
      <form>
        <div className="search-box">
          <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoComplete="off" maxLength="25" />
          <button type='submit' className="search__btn" onClick={(e) => e.preventDefault()}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </section>
  );
}

export default App;