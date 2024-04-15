import styles from "./Background.module.css"

import React, { useState, useEffect } from 'react';

const Background = () => {
  const [colors, setColors] = useState([]);

  // console.log(window.screen.height)

  let vwidth = window.screen.width
  let vheight = window.screen.height
  let av = Math.floor((0.018/100) * (vwidth * vheight))

  // useEffect(() => {
  //   const intervalId = setTimeout(() => {
  //     const newColors = Array.from({ length: av }, () => (Math.random() + 0.3));
  //     // Replae 1 with Math.random()
  //     setColors(newColors);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // });

  return (
    <div className={styles.boxcontainer}>
      {/* {colors.map((color, index) => (
        <div key={index} className={styles.box} style={{ opacity: color }}></div>
      ))} */}
    </div>
  );
};

export default Background;

