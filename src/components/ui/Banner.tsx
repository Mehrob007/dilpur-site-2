"use client";
import React, { useEffect, useRef, useState } from "react";
import bannerImage1 from "../../../public/images/Property1.png";
import bannerImage2 from "../../../public/images/Property2.png";
import bannerImage3 from "../../../public/images/Property3.png";
import Image from "next/image";
import { BannerImage } from "@/types/banner";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const images: BannerImage[] = [
    { src: bannerImage1, title: "ЛЕТНЯЯ \n КОЛЛЕКЦИЯ", subTitle: "Лето 2025" },
    {
      src: bannerImage2,
      title: "СКИДКА \n НА ВСЕ РУБАШКИ",
      subTitle: "Скидки до 40%",
    },
    {
      src: bannerImage3,
      title: "НОВОЕ \n ПОСТУПЛЕНИЕ",
      subTitle: "Скидка для первых \n 100 покупателей",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "transform 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <>
      {/* Skeleton — shows until first image loads */}
      {!loaded && <div className="banner-skeleton" />}

      {/* Real banner — hidden until loaded, then fades in */}
      <div
        className={`banner${loaded ? " banner-loaded" : ""}`}
        style={
          loaded
            ? {}
            : { position: "absolute", opacity: 0, pointerEvents: "none" }
        }
      >
        <div className="slider-container">
          <div className="slider-track" ref={slideRef}>
            {images.map((item, index) => (
              <div className="slide" key={index}>
                <Image
                  src={item.src}
                  alt={`Slide ${index + 1}`}
                  priority={index === 0}
                  onLoad={index === 0 ? () => setLoaded(true) : undefined}
                />
                <div className={`slide-content slide-index-${index}`}>
                  <main className="max-width">
                    <h1>{item.title}</h1>
                    <p>{item.subTitle}</p>
                  </main>
                </div>
              </div>
            ))}
          </div>
          <div className="navigate-slide">
            {images.map((_, i) => (
              <span
                key={i}
                className={currentIndex === i ? "active-nav-slide" : ""}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
