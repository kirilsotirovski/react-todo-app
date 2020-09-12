import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {

  // state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

    // use effect
    // run once when app starts
    useEffect(() => {
      let gradients = ['roseanna', 'sexy-blue', 'purple-love', 'kashmir', 'endless-river'];
      const addBg = () => {
        const gradient = gradients[Math.floor(Math.random() * gradients.length)];
        document.body.classList.add(gradient);
      }
      const getLocalTodos = () => {
        if(localStorage.getItem("todos") === null) {
          localStorage.setItem("todos", JSON.stringify([]));
        } else {
          let todoLocal = JSON.parse(localStorage.getItem("todos"));
          setTodos(todoLocal);
        }
      }
      getLocalTodos();
      addBg();
    }, []);

    useEffect(() => {
      const filterHandler = () => {
        switch(status) {
          case 'completed':
            setFilteredTodos(todos.filter(el => el.completed === true));
            break;
          case 'uncompleted':
            setFilteredTodos(todos.filter(el => el.completed === false));
            break;
          default:
            setFilteredTodos(todos);
            break;
        }
      }
      const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);

  // functions








  return (
    <div className="App">
      <header>
        <h1>Kiril's ToDo App</h1>
      </header>
      <Form todos={todos}  setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} filteredTodos={filteredTodos}/>
      <TodoList inputText={inputText} todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
