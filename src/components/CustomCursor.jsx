import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from "framer-motion";
import { Eye, ExternalLink, MousePointer2, Move, ArrowUpRight } from "lucide-react";

// ─── Advanced Physics ────────────────────────────────────────────────────────
const FAST_SPRING = { stiffness: 800, damping: 35, mass: 0.2 };
const SLOW_SPRING = { stiffness: 120, damping: 24, mass: 1.2 };

const stateStyles = {
  default: {
    size: 40,
    opacity: 1,
    bg: "transparent",
    border: "1.5px solid var(--color-primary, #20b2a6)",
    icon: null,
    radius: "50%",
    blend: "normal",
  },
  hover: {
    size: 0, // Shrink to 0 when magnetic
    opacity: 1,
    bg: "rgba(32,178,166,0.15)",
    border: "1.5px solid var(--color-primary, #20b2a6)",
    icon: <ArrowUpRight className="w-5 h-5 text-primary" />,
    radius: "50%",
    blend: "normal",
  },
  text: {
    size: 4,
    opacity: 1,
    bg: "var(--color-primary, #20b2a6)",
    border: "none",
    icon: null,
    radius: "2px",
    blend: "difference", // Flips color on text
  },
  image: {
    size: 80,
    opacity: 1,
    bg: "rgba(32,178,166,0.1)",
    border: "1.5px solid var(--color-primary, #20b2a6)",
    icon: <Eye className="w-6 h-6 text-primary outline-1" />,
    radius: "50%",
    blend: "normal",
  },
  drag: {
    size: 50,
    opacity: 1,
    bg: "rgba(32,178,166,0.3)",
    border: "2px solid var(--color-primary, #20b2a6)",
    icon: <Move className="w-5 h-5 text-primary" />,
    radius: "50%",
    blend: "normal",
  },
  hidden: {
    size: 0,
    opacity: 0,
    bg: "transparent",
    border: "none",
    icon: null,
    radius: "50%",
    blend: "normal",
  },
};

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState("default");
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magneticElement, setMagneticElement] = useState(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? (
      window.innerWidth <= 1024 || 
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      !window.matchMedia("(pointer: fine)").matches
    ) : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 1024 || 
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        !window.matchMedia("(pointer: fine)").matches
      );
    };

    window.addEventListener("resize", checkMobile);
    window.addEventListener("touchstart", () => setIsMobile(true), { once: true });
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Velocity for stretching effect
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);
  const skewX = useTransform(velX, [-3000, 3000], [-30, 30]);
  const skewY = useTransform(velY, [-3000, 3000], [-30, 30]);

  // Smoothed position
  const curX = useSpring(mouseX, FAST_SPRING);
  const curY = useSpring(mouseY, FAST_SPRING);

  // Trail layers
  const tX = useSpring(mouseX, SLOW_SPRING);
  const tY = useSpring(mouseY, SLOW_SPRING);

  const detectState = useCallback((target) => {
    if (!target) return "default";
    const interactive = target.closest("button, a, [role='button']");
    if (interactive) return "hover";
    if (target.tagName === "IMG" || target.closest("figure")) return "image";
    if (target.tagName === "P" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3" || target.tagName === "SPAN" || target.tagName === "LI") return "text";
    return "default";
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.cursor = ""; 
      return;
    }

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      const target = document.elementFromPoint(x, y);
      const interactive = target?.closest("button, a, [role='button']");
      
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(x - centerX, y - centerY);
        if (dist < 80) {
          mouseX.set(centerX);
          mouseY.set(centerY);
          setIsMagnetic(true);
          setMagneticElement(interactive);
          setCursorState("hover");
          return;
        }
      }

      mouseX.set(x);
      mouseY.set(y);
      setIsMagnetic(false);
      setMagneticElement(null);
      setCursorState(detectState(target));
    };

    const handleDown = () => setCursorState("drag");
    const handleUp = () => setCursorState("default");
    const handleLeave = () => setCursorState("hidden");

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY, detectState, isMobile]);

  const s = stateStyles[cursorState] || stateStyles.default;

  if (isMobile) return null;

  return (
    <div id="custom-cursor-container" className="hidden lg:block">
      {/* Magnetic Element Highlight */}
      {isMagnetic && magneticElement && (
        <motion.div
           layoutId="magnetic-glow"
           className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full bg-primary/10 border border-primary/30 hidden md:block"
           initial={false}
           animate={{
              x: magneticElement.getBoundingClientRect().left,
              y: magneticElement.getBoundingClientRect().top,
              width: magneticElement.getBoundingClientRect().width,
              height: magneticElement.getBoundingClientRect().height,
              borderRadius: window.getComputedStyle(magneticElement).borderRadius,
           }}
           transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      {/* Trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/20 pointer-events-none z-[9998] hidden md:block"
        style={{ x: tX, y: tY, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
      />

      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center hidden md:flex"
        style={{
          x: curX,
          y: curY,
          translateX: "-50%",
          translateY: "-50%",
          skewX,
          skewY,
          mixBlendMode: s.blend,
        }}
        animate={{
          width: s.size,
          height: s.size,
          background: s.bg,
          border: s.border,
          borderRadius: s.radius,
          opacity: s.opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5
        }}
      >
        <AnimatePresence mode="wait">
          {s.icon && (
            <motion.div
              key={cursorState}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {s.icon}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ClickRipple curX={curX} curY={curY} isMobile={isMobile} />
    </div>
  );
};

const ClickRipple = ({ curX, curY, isMobile }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (isMobile) return;

    const onDown = () => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: curX.get(), y: curY.get() }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [curX, curY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996] hidden md:block"
          style={{
            left: r.x,
            top: r.y,
            translateX: "-50%",
            translateY: "-50%",
            border: "1px solid var(--color-primary, #20b2a6)",
            mixBlendMode: "difference",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </>
  );
};
