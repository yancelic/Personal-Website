import { useState, useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export default function DecryptedText({
  text = "",
  speed = 40,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(() => text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [solvedIndex, setSolvedIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const next = [...prev];
        for (let j = i; j < totalChars; j++) {
          next[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        return next;
      });

      i++;
      setSolvedIndex(i);

      if (i >= totalChars) {
        clearInterval(interval);
        setDisplayed(text.split(""));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className} style={{ fontFamily: "var(--font-serif)", ...style }}>
      {displayed.map((char, index) => (
        <span
          key={index}
          style={{ color: index < solvedIndex ? "inherit" : "rgba(200,132,58,0.5)" }}
        >
          {index < solvedIndex ? text[index] : char}
        </span>
      ))}
    </span>
  );
}
