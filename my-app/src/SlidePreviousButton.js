import { React } from "react";
import { useSwiper } from "swiper/react";
import styles from "./App.module.css";

export default function SlidePreviousButton({ swipeStatus }) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className={`${styles.swipeBtns} ${styles.pendingBtn}`}
      style={{ color: swipeStatus === "true" && "#2196F3" }}></button>
  );
}
