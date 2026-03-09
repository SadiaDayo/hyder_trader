import React, { useEffect, useRef, useState } from "react";
import "../styles/WhatsAppFloat.css";

const WhatsAppFloat = () => {
  const phone = "923001234567"; // ✅ put client number (no +)
  const message = encodeURIComponent(
    "Assalamualaikum! I need help regarding products/prices. Please guide me."
  );
  const waLink = `https://wa.me/${phone}?text=${message}`;

  // ✅ auto-hide on scroll down
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      // hide when scrolling down, show when scrolling up
      if (current > lastScrollY.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className={`wa-float ${hidden ? "wa-hidden" : ""}`}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <div className="wa-tooltip">
        <span className="wa-dot"></span>
        Online • Chat on WhatsApp
      </div>

      <i className="bi bi-whatsapp"></i>
      <span className="wa-pulse"></span>
    </a>
  );
};

export default WhatsAppFloat;