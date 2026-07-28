import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from "framer-motion";

// ─── Physics Springs ──────────────────────────────────────────────────────────
const DOT_SPRING = { stiffness: 1200, damping: 40, mass: 0.15 };       // Snappy inner dot
const RING_SPRING = { stiffness: 180, damping: 22, mass: 0.8 };        // Fluid outer ring  
const GLOW_SPRING = { stiffness: 100, damping: 20, mass: 1.2 };        // Lazy glow trail

// ─── Cursor States Config ─────────────────────────────────────────────────────
const STATES = {
  default: {
    dotSize: 8,
    ringSize: 40,
    dotBg: "var(--color-primary)",
    ringBorder: "1.5px solid rgba(32,178,166,0.5)",
    ringBg: "transparent",
    blend: "normal",
    ringScale: 1,
    dotScale: 1,
    label: null,
  },
  hover: {
    dotSize: 6,
    ringSize: 64,
    dotBg: "#fff",
    ringBorder: "2px solid rgba(32,178,166,0.7)",
    ringBg: "rgba(32,178,166,0.08)",
    blend: "normal",
    ringScale: 1,
    dotScale: 1,
    label: null,
  },
  text: {
    dotSize: 3,
    ringSize: 2,
    dotBg: "var(--color-primary)",
    ringBorder: "none",
    ringBg: "transparent",
    blend: "normal",
    ringScale: 1,
    dotScale: 1,
    label: null,
  },
  image: {
    dotSize: 0,
    ringSize: 90,
    dotBg: "transparent",
    ringBorder: "1.5px solid rgba(32,178,166,0.4)",
    ringBg: "rgba(32,178,166,0.06)",
    blend: "normal",
    ringScale: 1,
    dotScale: 0,
    label: "View",
  },
  drag: {
    dotSize: 6,
    ringSize: 50,
    dotBg: "var(--color-primary)",
    ringBorder: "2px solid rgba(32,178,166,0.6)",
    ringBg: "rgba(32,178,166,0.15)",
    blend: "normal",
    ringScale: 0.9,
    dotScale: 0.8,
    label: null,
  },
  hidden: {
    dotSize: 0,
    ringSize: 0,
    dotBg: "transparent",
    ringBorder: "none",
    ringBg: "transparent",
    blend: "normal",
    ringScale: 0,
    dotScale: 0,
    label: null,
  },
};

// ─── Text cursor (blinking line) ──────────────────────────────────────────────
const TextCursorLine = () => (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 1 }}
    exit={{ scaleY: 0, opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="absolute"
    style={{
      width: "2px",
      height: "24px",
      background: "var(--color-primary)",
      borderRadius: "1px",
      boxShadow: "0 0 8px rgba(32,178,166,0.6), 0 0 20px rgba(32,178,166,0.2)",
    }}
  >
    <motion.div
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full"
      style={{ background: "var(--color-primary)" }}
    />
  </motion.div>
);

// ─── Click Burst Particles ────────────────────────────────────────────────────
const ClickBurst = ({ x, y }) => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * Math.PI * 2 + Math.random() * 0.5,
    dist: 25 + Math.random() * 35,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.05,
  }));

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9996]" style={{ left: x, top: y }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: "var(--color-primary)",
            boxShadow: "0 0 6px rgba(32,178,166,0.8)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.5, delay: p.delay, ease: "easeOut" }}
        />
      ))}
      {/* Shockwave ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          border: "1px solid rgba(32,178,166,0.5)",
          boxShadow: "0 0 10px rgba(32,178,166,0.2)",
        }}
        initial={{ width: 0, height: 0, opacity: 0.8, x: 0, y: 0 }}
        animate={{ width: 70, height: 70, opacity: 0, x: -35, y: -35 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};

// ─── Main Custom Cursor ───────────────────────────────────────────────────────
export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState("default");
  const [isPressed, setIsPressed] = useState(false);
  const [clickBursts, setClickBursts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const stateRef = useRef("default");

  // Mobile detection
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth <= 1024 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        !window.matchMedia("(pointer: fine)").matches
      : false
  );

  // Motion values – raw mouse position
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  // Springs for each layer
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);
  const glowX = useSpring(mouseX, GLOW_SPRING);
  const glowY = useSpring(mouseY, GLOW_SPRING);

  // Velocity for ring morphing
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);

  // Velocity-based ring stretch
  const scaleX = useTransform(velX, [-3000, 0, 3000], [1.35, 1, 1.35]);
  const scaleY = useTransform(velY, [-3000, 0, 3000], [1.35, 1, 1.35]);
  const smoothScaleX = useSpring(scaleX, { stiffness: 300, damping: 25 });
  const smoothScaleY = useSpring(scaleY, { stiffness: 300, damping: 25 });

  // Velocity-based rotation for ring
  const rotation = useTransform(
    [velX, velY],
    ([vx, vy]) => Math.atan2(vy, vx) * (180 / Math.PI)
  );
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 20 });

  // Detect cursor state from DOM element
  const detectState = useCallback((target) => {
    if (!target) return "default";

    // Interactive elements
    const interactive = target.closest("button, a, [role='button'], input[type='submit'], label[for], .cursor-pointer, [data-cursor='pointer']");
    if (interactive) return "hover";

    // Input/textarea elements
    const inputEl = target.closest("input, textarea, [contenteditable='true'], [data-cursor='text']");
    if (inputEl) return "text";

    // Images
    if (target.tagName === "IMG" || target.closest("figure, picture, [data-cursor='image']")) return "image";

    // Text content
    const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI", "BLOCKQUOTE", "LABEL"];
    if (textTags.includes(target.tagName) && target.textContent.trim().length > 0) return "text";

    // Draggable
    if (target.closest("[draggable='true'], [data-cursor='drag']")) return "drag";

    return "default";
  }, []);

  // Mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 1024 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        !window.matchMedia("(pointer: fine)").matches
      );
    };

    window.addEventListener("resize", checkMobile);
    window.addEventListener("touchstart", () => setIsMobile(true), { once: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Main event listeners
  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.cursor = "";
      return;
    }

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const target = document.elementFromPoint(x, y);

      // Magnetic effect — softer and more accurate
      const interactive = target?.closest("button, a, [role='button']");
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(x - cx, y - cy);
        const maxDist = Math.max(rect.width, rect.height) * 0.6;

        if (dist < maxDist) {
          // Smooth magnetic pull — intensity based on proximity
          const strength = 1 - dist / maxDist;
          const pullX = x + (cx - x) * strength * 0.35;
          const pullY = y + (cy - y) * strength * 0.35;
          mouseX.set(pullX);
          mouseY.set(pullY);
        } else {
          mouseX.set(x);
          mouseY.set(y);
        }
      } else {
        mouseX.set(x);
        mouseY.set(y);
      }

      const newState = detectState(target);
      if (newState !== stateRef.current) {
        stateRef.current = newState;
        setCursorState(newState);
      }
    };

    const handleDown = (e) => {
      setIsPressed(true);

      // Add click burst
      const id = Date.now();
      setClickBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setClickBursts((prev) => prev.filter((b) => b.id !== id)), 600);
    };

    const handleUp = () => setIsPressed(false);

    const handleLeave = () => {
      setIsVisible(false);
      setCursorState("hidden");
    };

    const handleEnter = () => {
      setIsVisible(true);
      setCursorState("default");
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    // Also hide cursor on all interactive elements
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.documentElement.style.cursor = "";
      const el = document.getElementById("custom-cursor-hide");
      if (el) el.remove();
    };
  }, [mouseX, mouseY, detectState, isMobile]);

  const s = STATES[cursorState] || STATES.default;

  if (isMobile) return null;

  return (
    <div id="custom-cursor-container" className="hidden lg:block">
      {/* ── Layer 1: Ambient Glow Trail ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: cursorState === "hover" ? 100 : cursorState === "image" ? 120 : 60,
            height: cursorState === "hover" ? 100 : cursorState === "image" ? 120 : 60,
            opacity: isVisible ? (cursorState === "text" ? 0 : 0.25) : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{
            background: "radial-gradient(circle, rgba(32,178,166,0.35) 0%, rgba(32,178,166,0.08) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Outer Ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX: cursorState === "text" ? 1 : smoothScaleX,
          scaleY: cursorState === "text" ? 1 : smoothScaleY,
          rotate: cursorState === "text" ? 0 : smoothRotation,
        }}
        animate={{
          width: s.ringSize,
          height: cursorState === "text" ? 28 : s.ringSize,
          background: s.ringBg,
          border: s.ringBorder,
          borderRadius: cursorState === "text" ? "2px" : "50%",
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.85 : s.ringScale,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
      >
        {/* Label for image state */}
        <AnimatePresence mode="wait">
          {s.label && (
            <motion.span
              key="cursor-label"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              {s.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Text cursor line */}
        <AnimatePresence>
          {cursorState === "text" && <TextCursorLine />}
        </AnimatePresence>
      </motion.div>

      {/* ── Layer 3: Inner Dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPressed ? s.dotSize * 0.6 : s.dotSize,
          height: isPressed ? s.dotSize * 0.6 : s.dotSize,
          background: s.dotBg,
          opacity: isVisible ? s.dotScale : 0,
          boxShadow: cursorState === "hover"
            ? "0 0 12px rgba(32,178,166,0.6), 0 0 30px rgba(32,178,166,0.2)"
            : cursorState === "default"
            ? "0 0 8px rgba(32,178,166,0.4)"
            : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* ── Click Burst Particles ── */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <ClickBurst key={burst.id} x={burst.x} y={burst.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};
