import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export const Magnetic = ({ children, padding = 50, intensity = 0.4 }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull radius mapping
    if (Math.abs(distanceX) < width / 2 + padding && Math.abs(distanceY) < height / 2 + padding) {
      x.set(distanceX * intensity);
      y.set(distanceY * intensity);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block" // Ensure it wraps tightly around the child
    >
      {children}
    </motion.div>
  );
};
