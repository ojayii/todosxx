import styles from './Todo.module.css'
import React, { useState, useRef } from 'react';

const Todo = ({ id, text, isChecked, onTextChange, onCheckboxChange, onRemoveTodo, bgToggle, style, setHover, is_Disabled, handleDeleteTodo }) => {
    const textareaRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [heightValue, setHeightValue] = useState('');

    const handleFocus = (event) => {
        setIsFocused(true);

        // setHeightValue(event.target.style.height);

        event.target.style.minHeight = `${textareaRef.current.scrollHeight}px`
        
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
        onTextChange(id, event.target.value);
        event.target.style.height = `${textareaRef.current.scrollHeight}px`
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
            style={{backgroundColor: bgToggle? "rgba(233, 222, 222, 0.7)": ""}}
            id={`${id}`}
        >
            < textarea
                ref={textareaRef}
                cols=""
                // onChange = { handleChange }
                onFocus = { handleFocus }
                onBlur = { handleBlur }
                onClick = {  handleFocus }
                onMouseLeave = {  handleBlur }
                className = {styles.custominput}
                style={style}
                placeholder = "Tap on todo item..."
                value={text}
                onChange={handleTextChange}
                disabled={is_Disabled}
                autoComplete='off'
                autoCapitalize='off'
                autoCorrect='off'
                spellCheck='off'
                name='content'
            />
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
            {handleDeleteTodo && <button className={styles.deleteTodo} onClick={handleDeleteTodo}></button>}
        </div >
    )
}

export default Todo;