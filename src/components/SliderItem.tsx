import React, { useEffect, useRef, useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./SliderItem.css";

const SliderItem = () => {
  const [current, setCurrent] = useState(0);
  const arrLength = SliderData?.length;
  const timeoutRef: any = useRef(null);
  const delay: any = 2500;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    if (current === arrLength - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current === 0) {
      setCurrent(arrLength - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrent((index: any) => (index === arrLength - 1 ? 0 : index + 1)),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [current]);

  if (!Array?.isArray(SliderData) || arrLength <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="arrow-left" onClick={prevSlide} />
      <FaArrowAltCircleRight className="arrow-right" onClick={nextSlide} />
      {SliderData?.map((slide: any, index: any) => (
        <div
          className={index === current ? `slide active` : "slide"}
          key={index}
        >
          {current == index && (
            <img src={slide?.image} alt="image" className="image" />
          )}
        </div>
      ))}
    </section>
  );
};

export default SliderItem;
