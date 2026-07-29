import { useEffect, useRef, useState } from "react";

export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) observer.disconnect();
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold ?? 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.once, options.threshold]);

  return isInView;
}
