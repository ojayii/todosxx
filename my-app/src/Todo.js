import styles from './Todo.module.css'
import React, { useState, useRef, useEffect } from 'react';

const Todo = ({ id, text, isChecked, onTextChange, onCheckboxChange, onRemoveTodo, bgToggle, style, setHover, is_Disabled, handleDeleteTodo }) => {
    
    const textareaRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(text);

    const handleFocus = (event) => {
        setIsFocused(true);
        event.target.style.height = `${textareaRef.current.scrollHeight}px`
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleBlur = (event) => {
        setIsFocused(false);
        onTextChange && onTextChange(id, inputValue);
        event.target.style.minHeight = ""
        event.target.style.height = ""
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
        event.target.style.height = `${event.target.scrollHeight}px`
    }; 

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
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.custominput}
                style={style}
                placeholder="Tap on todo item..."
                value={inputValue}
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