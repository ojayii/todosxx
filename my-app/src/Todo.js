import styles from './Todo.module.css'
import React, { useState, useRef, useEffect } from 'react';

const Todo = ({ id, text, isChecked, onTextChange, onCheckboxChange, onRemoveTodo, bgToggle, style, setHover, is_Disabled, handleDeleteTodo }) => {
    const textareaRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [heightValue, setHeightValue] = useState('');
    const [test, setTest] = useState(null)

    const handleFocus = (event) => {
        setIsFocused(true);

        // setHeightValue(event.target.style.height);

        event.target.style.height = `${textareaRef.current.scrollHeight}px`

        if (textareaRef.current) {
            // textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleBlur = (event) => {
        setIsFocused(false);

        event.target.style.minHeight = ""
        event.target.style.height = ""
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTextChange = (event) => {
        onTextChange && onTextChange(id, event.target.value);
        // event.target.style.maxHeight = `${event.target.scrollHeight}px`
        event.target.style.height = `${event.target.scrollHeight}px`
    };

    // const handleTextChange = (event) => {
    //     const handler = setTimeout(() => {
    //         onTextChange && onTextChange(id, event.target.value);
    //         event.target.style.height = `${event.target.scrollHeight}px`
    //         setTest(event)
    //     }, 3000)
    //     return () => clearTimeout(handler)
    // };

    // useEffect(() => {
    //     // This is just a placeholder for demonstration, you need to replace it with your actual logic
    //     // const todoId = 1; // Replace this with the actual ID of the todo item
    //     handleTextChange();
    //   }, [test]);

    // useEffect(() => {
    //     const timeoutIds = [];
    //     completedTodos.forEach((todo) => {
    //         if (!todo.isChecked) {
    //             const timeoutId = setTimeout(() => {
    //                 handleUnRemoveTodo(todo.id);
    //             }, 1500);
    //             timeoutIds.push(timeoutId);
    //         }
    //     });
    //     return () => {
    //         timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    //     };
    // }, [completedTodos]);

    const handleCheckboxChange = () => {
        onCheckboxChange(id);
    };

    const handleRemove = () => {
        onRemoveTodo(id);
    };

    return (
        <div
            className={`${styles.todoBox} ${isFocused ? styles.focused : ''}`}
            style={{ backgroundColor: bgToggle && '#101010', color: bgToggle && '#DEDEDE' }}
            id={`${id}`}
        >
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            < textarea
                ref={textareaRef}
                cols=""
                // onChange = { handleChange }
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.custominput}
                style={style}
                placeholder="Tap on todo item..."
                value={text}
                onChange={handleTextChange}
                disabled={is_Disabled}
                autoComplete='off'
                autoCapitalize='off'
                autoCorrect='off'
                spellCheck='off'
                name='content'
            />
            {handleDeleteTodo && <button className={styles.deleteTodo} onClick={handleDeleteTodo}></button>}
        </div >
    )
}

export default Todo;