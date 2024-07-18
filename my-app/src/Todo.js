import styles from "./Todo.module.css";
import React, { useState, useRef, useEffect, memo } from "react";

const Todo = ({
  id,
  text,
  isChecked,
  onTextChange,
  onCheckboxChange,
  onRemoveTodo,
  bgToggle,
  style,
  setHover,
  is_Disabled,
  handleDeleteTodo,
  dateELText,
}) => {
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [dateEL, setDateEl] = useState(dateELText);

  const handleFocus = (event) => {
    setIsFocused(true);
    event.target.style.height = `${textareaRef.current.scrollHeight}px`;
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    event.target.parentElement.style.outline= '2px solid #2196F3';
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    onTextChange && onTextChange(id, inputValue, dateEL);
    event.target.style.minHeight = "";
    event.target.style.height = "";
    event.target.parentElement.style.outline= '';
  };

  const handleTextChange = (event) => {
    setInputValue(event.target.value);
    event.target.style.height = `${event.target.scrollHeight}px`;
    setDateEl(Date());
  };

  const handleCheckboxChange = () => {
    onCheckboxChange(id);
  };

  const handleRemove = () => {
    onRemoveTodo(id);
  };

  return (
    <div
      className={`${styles.todoBox} ${isFocused ? styles.focused : ""}`}
      style={{
        backgroundColor: bgToggle && "#101010",
        color: bgToggle && "#DEDEDE",
      }}
      // onClick={(e) => e.target.secondChild.focused = true}
      id={`${id}`}>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
        title={isChecked? 'Mark item as pending': 'Mark item as completed'}
      />
      <textarea
        ref={textareaRef}
        cols=''
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.custominput}
        style={style}
        placeholder='Tap on todo item...'
        value={inputValue}
        onChange={handleTextChange}
        disabled={is_Disabled}
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        spellCheck='off'
        name='content'
      />
      {handleDeleteTodo && (
        <button
          className={styles.deleteTodo}
          onClick={handleDeleteTodo}
          title="Permantly delete completed todo item"/>
      )}
      <span className={styles.dateEl}>{dateELText.slice(0, 24)}</span>
    </div>
  );
};

export default memo(Todo);
