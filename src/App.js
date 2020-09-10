import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = 'skdfjsdfjskdhfsdyfsdjfnvjfjfjfnjjnjjkkk';

const App = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  };

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const handleClearAllTodos = () => {
    const newTodos = [];
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <div className="form-group ml-5 mr-5 mb-5 mt-5">
        <div className="form-control mb-3 bg-dark text-white text-center"> React Todo App </div>
        <div className="form-control mb-5 bg-info text-white text-center"> {todos.filter(todo => !todo.completed).length} Left Todo </div>

        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input className="form-control mb-2" ref={todoNameRef} type="text" placeholder="Add Todo Item Here" />
        <button className='btn-primary btn-block mb-5' onClick={handleAddTodo}> Add Todo </button>
        <button className='btn-warning btn-block mb-5' onClick={handleClearTodos}> Clear Completed Todos </button>

        <button className='btn-danger btn-block mb-5' onClick={handleClearAllTodos}> Clear All Todos </button>
      </div>
    </div>
  );
};

export default App;
