import { useState } from 'react';
import './App.css';

// importing components
import Form from './components/form';
import TodoList from './components/todoList';

function App() {
  const [inputText, setInputText] = useState();
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        {inputText}
      </header>
      <Form todos={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList />
    </div>
  );
}

export default App;
