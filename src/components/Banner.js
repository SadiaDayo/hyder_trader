import React, { useEffect, useState } from "react";
import "../styles/Banner.css";

import slide1 from "../assets/banner.png";
import slide2 from "../assets/banner1.png";
import slide3 from "../assets/banner2.png";

const slides = [
  {
    image: slide1,
    title: "Power Your Life with Smart Energy",
    subtitle: "Solar • Inverters • Batteries",
  },
  {
    image: slide2,
    title: "Reliable Electronics for Every Home",
    subtitle: "Quality You Can Trust",
  },
  {
    image: slide3,
    title: "Energy Solutions Made Easy",
    subtitle: "Shop Premium Products Today",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  // Auto slide for main banner
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner-section">
    
      {/* Main Slider Banner */}
      <div className="slider">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a href="/shop" className="slider-btn">
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;