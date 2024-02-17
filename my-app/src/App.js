import styles from './App.module.css';
import Todo from "./Todo"
import Background from "./Background"
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const submit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    console.log('Submitted value:', inputValue);
  }

  const textareaRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const [bgToggle, setBgToggle] = useState("");

  const handleFocus = (event) => {
    setIsFocused(true);

    // setHeightValue(event.target.style.height);

    event.target.style.minHeight = `${textareaRef.current.scrollHeight}px`

    if (event.target) {
      // event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  const handleBlur = (event) => {
    setIsFocused(false);

    event.target.style.minHeight = ""
  };

  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [orderBySearch, setOrderBySearch] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
    setFilteredTodos(storedTodos);
  }, []);

  console.log(bgToggle)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    applySearchFilter();
  }, [todos, searchValue]);

  

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = { id: Date.now(), text: newTodoText };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const handleNewTodoTextChange = (event) => {
    setNewTodoText(event.target.value);

    if (event.target) {
      // event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
      event.target.style.transition = 'height 0.3s ease-in-out';
      // console.log(`${event.target.scrollHeight}px`)

      // console.log(event.target)
    }
  };

  const handleTodoTextChange = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setOrderBySearch(true);
  };

  const handleExitSearch = () => {
    setSearchValue('');
    setOrderBySearch(false);
  };

  const applySearchFilter = () => {
    const filtered = todos.filter((todo) => todo.text.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredTodos(filtered);
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const timeoutIds = [];
    todos.forEach((todo) => {
      if (todo.isChecked) {
        const timeoutId = setTimeout(() => {
          handleRemoveTodo(todo.id);
        }, 3000);
        timeoutIds.push(timeoutId);
      }
    });

    return () => {
      // Clear all timeouts if the component unmounts
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [todos]);

  

  const handleBgToggle = (e) => {
    setBgToggle(e.target.checked)
    console.log(bgToggle)
    localStorage.setItem('bgToggle', JSON.stringify(bgToggle));
    console.log(JSON.parse(localStorage.getItem('bgToggle')))
  }

  useEffect(() => {
    const localBgToggle = JSON.parse(localStorage.getItem('bgToggle')) || bgToggle;
    console.log(localBgToggle)
    // setBgToggle(localBgToggle);
    console.log(bgToggle)
  })

  // useEffect(() => {
  //   localStorage.setItem('bgToggle', JSON.stringify(bgToggle));
    
  // });

  return (
    <div className={styles.App}>
      {bgToggle && <Background />}
      <header>
        <div className={styles.headerTop}>
          <h1 style={{ color: bgToggle ? "white" : "black" }}>ToDos</h1>
          <label className={styles.switch}>
            <input type="checkbox" onInput={handleBgToggle} />
            <span className={styles.slider} />
          </label>
        </div>
        <form onSubmit={handleSearchSubmit} noValidate>
          <label htmlFor="search">Search todos</label>
          <input style={{backgroundColor: bgToggle? "rgba(233, 222, 222, 0.322)": ""}} id="search" type="text" placeholder="Search ToDos" value={searchValue} onChange={handleSearchChange} />
          <button type="submit" >
            <img src="images/search.png" />
          </button>
          {orderBySearch && <button className={styles.exitsearch} type="button" onClick={handleExitSearch}>Cancel</button>}
        </form>
      </header>
      <main>
        {/* <Todo
          onTextChange={handleTodoTextChange}
          onCheckboxChange={handleCheckboxChange}
          onRemoveTodo={handleRemoveTodo}
        /> */}
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isChecked={todo.isChecked || false}
            onTextChange={handleTodoTextChange}
            onCheckboxChange={handleCheckboxChange}
            onRemoveTodo={handleRemoveTodo}
            bgToggle={bgToggle}
          />
        ))}
      </main>
      <footer style={{backgroundColor: bgToggle? "rgba(233, 222, 222, 0.322)": ""}}>
        <textarea
          ref={textareaRef}
          placeholder="Add todo..."
          value={newTodoText}
          onChange={handleNewTodoTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            height: isFocused ? 'auto' : '',
            transition: "height 0.3s ease-in-out"
          }}
        />
        <button onClick={handleAddTodo}>
          <img src="images/plus.png" />
        </button>
      </footer>
    </div>
  );
}

export default App;
