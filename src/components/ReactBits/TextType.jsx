import { useEffect, useState, useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function TextType({
  text = "",
  speed = 45,
  cursor = true,
  className = "",
  style = {},
  onDone = null,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!isInView) return;
    idx.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
      {cursor && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "currentColor",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: done ? "none" : "blink 0.8s step-end infinite",
            opacity: done ? 0 : 1,
          }}
        />
      )}
    </span>
  );
}
