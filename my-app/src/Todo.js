import styles from "./Todo.module.css"
import React, { useState, useRef } from 'react';

const Todo = ({ id, text, isChecked, onTextChange, onCheckboxChange, onRemoveTodo }) => {
    const textareaRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [heightValue, setHeightValue] = useState('');

    const handleFocus = (event) => {
        setIsFocused(true);

        // setHeightValue(event.target.style.height);

        event.target.style.minHeight = `${textareaRef.current.scrollHeight}px`
        
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleBlur = (event) => {
        setIsFocused(false);

        event.target.style.minHeight = ""
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleDrag = (event) => {
        
    };

    const handleTextareaResize = (event) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.transition = 'height 0.3s ease-in-out';
            
        }
    };

    const handleTextChange = (event) => {
        onTextChange(id, event.target.value);
      };
    
      const handleCheckboxChange = () => {
        onCheckboxChange(id);
      };
    
      const handleRemove = () => {
        onRemoveTodo(id);
      };

    // console.log(heightValue)

    return (
        <div className={`${styles.todoBox} ${isFocused ? styles.focused : ''}`}>
    {/* <input type="text-area" placeholder="Tap on..."/> */ }
            < textarea
                ref={textareaRef}
                // rows= {isFocused? "": "1"}
                cols=""
                // wrap="hard"
                // value={inputValue}
                // onChange = { handleChange }
                onFocus = { handleFocus }
                onBlur = { handleBlur }
                onInput={handleTextareaResize}
                // onClick = { handleDrag }
                className = {styles.custominput}
                style={{
                    height: isFocused ? 'auto' : '',
                    transition: "height 0.3s ease-in-out"
                    // overflow: 'hidden',
                    // textOverflow: 'ellipsis',
                    // width: '100%',
                    // whiteSpace: isFocused ? 'normal' : 'nowrap',
                }}
                placeholder = "Tap on..."
                value={text}
                onChange={handleTextChange}
            />
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </div >
    )
}

export default Todo;