import { React } from 'react';
import { useSwiper } from 'swiper/react';
import styles from './App.module.css';

export default function SlideNextButton({swipeStatus}) {
  const swiper = useSwiper();

  return (
    <button 
      onClick={() => swiper.slideNext()}
      className={`${styles.swipeBtns} ${styles.completedBtn}`}
      style={{color: swipeStatus === 'false' && '#2196F3'}}
    ></button>
  );
}