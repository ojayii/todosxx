import styles from './App.module.css';
import Todo from './Todo';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/scrollbar';
import SlideNextButton from './SlideNextButton';
import SlidePreviousButton from './SlidePreviousButton';

function App() {

  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [bgToggle, setBgToggle] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [orderBySearch, setOrderBySearch] = useState(false);
  const [swipeStatus, setSwipeStatus] = useState('true');
  const [isNewUser, setIsNewUser] = useState(null);
  const [pendingTodosCount, setPendingTodosCount] = useState(0);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);

  const handleFocus = (event) => {
    setIsFocused(true);
    if (event.target) {
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    // event.target.style.minHeight = ""
    event.target.style.height = "";
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    setCompletedTodos(storedCompletedTodos);
    setFilteredTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    applySearchFilter();
  }, [todos, searchValue, completedTodos]);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = { id: Date.now(), text: newTodoText };
      setTodos([newTodo, ...todos]);
      setNewTodoText('');
    }
  };

  const handleNewTodoTextChange = (event) => {
    setNewTodoText(event.target.value);

    if (event.target) {
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  const handleTodoTextChange = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleCompletedTodoTextChange = (id, newText) => {
    setCompletedTodos((prevTodos) =>
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

  const handleCheckboxUnchange = (id) => {
    const updatedCompletedTodos = completedTodos.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setCompletedTodos(updatedCompletedTodos);
  };


  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    const updatedCompletedTodos = todos.filter((todo) => todo.id == id);
    setCompletedTodos([...updatedCompletedTodos, ...completedTodos]);
  };

  const handleUnRemoveTodo = (id) => {
    const updatedCompletedTodos = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(updatedCompletedTodos)
    const updatedTodos = completedTodos.filter((todo) => todo.id == id);
    setTodos([...updatedTodos, ...todos]);
  };

  useEffect(() => {
    const timeoutIds = [];
    completedTodos.forEach((todo) => {
      if (!todo.isChecked) {
        const timeoutId = setTimeout(() => {
          handleUnRemoveTodo(todo.id);
        }, 1500);
        timeoutIds.push(timeoutId);
      }
    });
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [completedTodos]);

  const handleDeleteTodo = (e) => {
    if (window.confirm('Permantly delete todo item?')) {
      const updatedCompletedTodos = completedTodos.filter((todo) => todo.id != e.target.parentElement.id);
      setCompletedTodos(updatedCompletedTodos)
    } 
  };

  useEffect(() => {
    const timeoutIds = [];
    todos.forEach((todo) => {
      if (todo.isChecked) {
        const timeoutId = setTimeout(() => {
          handleRemoveTodo(todo.id);
        }, 1500);
        timeoutIds.push(timeoutId);
      }
    });
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [todos]);

  useEffect(() => {
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setBgToggle(isDarkModePreferred);
  }, []);

  useEffect(() => {
    localStorage.setItem('bgToggle', JSON.stringify(bgToggle));
  }, [bgToggle]);

  useEffect(() => {
    const storedBgToggle = JSON.parse(localStorage.getItem('bgToggle'));
    if (storedBgToggle !== null) {
      setBgToggle(storedBgToggle);
    }
  }, []);

  const handleBgToggle = (e) => {
    setBgToggle((prevBgToggle) => !prevBgToggle);
  }

  useEffect(() => {
    const isNewUser = !JSON.parse(localStorage.getItem('isNewUser')) || false;
    if (isNewUser) {
      localStorage.setItem('isNewUser', JSON.stringify(true));
      const todoOne = { id: Date.now(), text: 'Welcome to ToDos' };
      // const todoTwo = { id: Date.now() + 1, text: newTodoText };
      setTodos([todoOne, ...todos]);
    }
    setIsNewUser(isNewUser);
  }, [])

  useEffect(() => {
    setPendingTodosCount(0)
    todos.forEach(() => {
      setPendingTodosCount(count => count + 1)
    })
  }, [todos])

  useEffect(() => {
    setCompletedTodosCount(0)
    completedTodos.forEach(() => {
      setCompletedTodosCount(count => count + 1)
    })
  }, [completedTodos])

  return (
    <div className={styles.App} style={{ backgroundColor: bgToggle && 'black'}}>
      {/* {bgToggle && <Background />} */}
      <header>
        <div className={styles.headerTop}>
          <h1 style={{ color: bgToggle ? "#DEDEDE" : "black" }}>ToDos</h1>
          <label className={styles.switch}>
            <input type="checkbox" onChange={handleBgToggle} checked={bgToggle && 'true'} />
            <span className={styles.slider} />
            <img src='images/brightness.png' className={styles.lightImg} />
            <img src='images/dark.png' className={styles.darkImg} />
          </label>
        </div>
        <form onSubmit={handleSearchSubmit} noValidate>
          <label htmlFor="search">Search todos</label>
          <input style={{ backgroundColor: bgToggle && '#101010', color: bgToggle && '#DEDEDE' }} id="search" type="text" placeholder="Search ToDos" value={searchValue} onChange={handleSearchChange} />
          <button type="submit" style={{ filter: bgToggle && 'invert(1)' }}>
            <img src="images/search.png" />
          </button>
          {orderBySearch && <button className={styles.exitsearch} style={{ color: bgToggle && '#DEDEDE' }} type="button" onClick={handleExitSearch}>Cancel</button>}
        </form>
      </header>
      <main>
        <p className={styles.status} 
           style={{ color: bgToggle ? "#DEDEDE" : "#8B97A3", backgroundColor: bgToggle === true && 'black' }}>
          <span style={{color: swipeStatus === 'true' && '#2196F3', borderBottom: swipeStatus === 'true' && '3px solid #2196F3'}}>Pending 
            {pendingTodosCount !== 0 && <span style={{backgroundColor: swipeStatus === 'true'? '#2196F3': bgToggle? '#DEDEDE': '#8B97A3', color: bgToggle && 'black'}} className={styles.todoCount}>{pendingTodosCount}</span>} 
          </span>
          <span style={{color: swipeStatus === 'false' && '#2196F3', borderBottom: swipeStatus === 'false' && '3px solid #2196F3'}}>Completed 
            {completedTodosCount !== 0 && <span style={{backgroundColor: swipeStatus === 'false'? '#2196F3': bgToggle? '#DEDEDE': '#8B97A3', color: bgToggle && 'black'}} className={styles.todoCount}>{completedTodosCount}</span>}
          </span>
        </p>
        <Swiper
          // modules={[Scrollbar]}
          // scrollbar={{ draggable: true }}
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={() => setSwipeStatus(swipeStatus === 'true'? 'false': 'true')}
        >
          <SwiperSlide>  
            <SlideNextButton swipeStatus={swipeStatus}/>
            <div className={styles.pending}>
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
                  style={{ color: bgToggle && '#DEDEDE' }}
                />
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <SlidePreviousButton swipeStatus={swipeStatus}/>
            <div className={styles.completed}>
              {completedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  isChecked={todo.isChecked || false}
                  onTextChange={handleCompletedTodoTextChange}
                  onCheckboxChange={handleCheckboxUnchange}
                  onRemoveTodo={handleUnRemoveTodo}
                  bgToggle={bgToggle}
                  setHover={true}
                  // is_Disabled={true}
                  style={{ textDecoration: 'line-through', color: bgToggle && '#DEDEDE' }}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
            </div>
          </SwiperSlide>
        </Swiper>

      </main>
      <footer style={{ backgroundColor: bgToggle && '#0D0D0D', boxShadow: bgToggle && 'none' }}>
        <textarea
          ref={textareaRef}
          placeholder="Add todo..."
          value={newTodoText}
          onChange={handleNewTodoTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            transition: "height 0.3s ease-in-out",
            color: bgToggle && '#DEDEDE'
          }}
        />
        <button onClick={handleAddTodo} style={{ filter: bgToggle && 'invert(1)' }}>
          <img src="images/plus.png" />
        </button>
      </footer>
    </div>
  );
}

export default App;