import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// ─── Cursor States ────────────────────────────────────────────────────────────
const SPRING_CONFIG = { stiffness: 600, damping: 32, mass: 0.4 };
const TRAIL_SPRING  = { stiffness: 160, damping: 22, mass: 0.8 };

const stateStyles = {
  default: {
    outerSize: 36,
    outerOpacity: 1,
    outerBg: "transparent",
    outerBorder: "2px solid var(--color-primary, #20b2a6)",
    innerSize: 6,
    label: null,
    rotate: 0,
    outerBorderRadius: "50%",
  },
  hover: {
    outerSize: 52,
    outerOpacity: 1,
    outerBg: "rgba(32,178,166,0.12)",
    outerBorder: "1.5px solid var(--color-primary, #20b2a6)",
    innerSize: 0,
    label: null,
    rotate: 0,
    outerBorderRadius: "50%",
  },
  text: {
    outerSize: 3,
    outerOpacity: 0.9,
    outerBg: "var(--color-primary, #20b2a6)",
    outerBorder: "none",
    innerSize: 0,
    label: null,
    rotate: 0,
    outerBorderRadius: "2px",
  },
  image: {
    outerSize: 72,
    outerOpacity: 1,
    outerBg: "rgba(32,178,166,0.08)",
    outerBorder: "1.5px dashed var(--color-primary, #20b2a6)",
    innerSize: 0,
    label: "VIEW",
    rotate: 45,
    outerBorderRadius: "50%",
  },
  drag: {
    outerSize: 44,
    outerOpacity: 1,
    outerBg: "rgba(32,178,166,0.2)",
    outerBorder: "2px solid var(--color-primary, #20b2a6)",
    innerSize: 4,
    label: null,
    rotate: 0,
    outerBorderRadius: "50%",
  },
  hidden: {
    outerSize: 0,
    outerOpacity: 0,
    outerBg: "transparent",
    outerBorder: "none",
    innerSize: 0,
    label: null,
    rotate: 0,
    outerBorderRadius: "50%",
  },
};

// ─── Trail Particle ───────────────────────────────────────────────────────────
const TrailDot = ({ x, y, size, opacity }) => (
  <motion.div
    className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
    style={{
      x,
      y,
      translateX: "-50%",
      translateY: "-50%",
      width: size,
      height: size,
      background: "var(--color-primary, #20b2a6)",
      opacity,
    }}
  />
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState("default");
  const [labelText, setLabelText] = useState(null);
  const stateRef = useRef("default");

  // Primary cursor (fast)
  const curX = useSpring(0, SPRING_CONFIG);
  const curY = useSpring(0, SPRING_CONFIG);

  // Trail layer 1 (medium)
  const t1X = useSpring(0, TRAIL_SPRING);
  const t1Y = useSpring(0, TRAIL_SPRING);

  // Trail layer 2 (slow)
  const t2X = useSpring(0, { stiffness: 90, damping: 18, mass: 1 });
  const t2Y = useSpring(0, { stiffness: 90, damping: 18, mass: 1 });

  // Inner dot (instant)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const detectState = useCallback((target) => {
    if (!target) return "default";

    const isInteractive =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a") ||
      target.getAttribute("role") === "button" ||
      target.closest("[role='button']") ||
      target.dataset.cursor === "hover";

    const isText =
      target.tagName === "P" ||
      target.tagName === "H1" ||
      target.tagName === "H2" ||
      target.tagName === "H3" ||
      target.tagName === "H4" ||
      target.tagName === "SPAN" ||
      target.tagName === "LI" ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.dataset.cursor === "text";

    const isImage =
      target.tagName === "IMG" ||
      target.tagName === "FIGURE" ||
      target.tagName === "VIDEO" ||
      target.closest("figure") ||
      target.dataset.cursor === "image";

    if (isInteractive) return "hover";
    if (isImage)       return "image";
    if (isText)        return "text";
    return "default";
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      curX.set(e.clientX);
      curY.set(e.clientY);
      t1X.set(e.clientX);
      t1Y.set(e.clientY);
      t2X.set(e.clientX);
      t2Y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onOver = (e) => {
      const next = detectState(e.target);
      if (next !== stateRef.current) {
        stateRef.current = next;
        setCursorState(next);
        setLabelText(stateStyles[next].label);
      }
    };

    const onDown = () => {
      stateRef.current = "drag";
      setCursorState("drag");
    };

    const onUp = () => {
      const next = detectState(document.elementFromPoint(curX.get(), curY.get()));
      stateRef.current = next;
      setCursorState(next);
    };

    const onLeave = () => setCursorState("hidden");
    const onEnter = () => setCursorState(stateRef.current);

    window.addEventListener("mousemove",   onMove,  { passive: true });
    window.addEventListener("mouseover",   onOver,  { passive: true });
    window.addEventListener("mousedown",   onDown);
    window.addEventListener("mouseup",     onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove",   onMove);
      window.removeEventListener("mouseover",   onOver);
      window.removeEventListener("mousedown",   onDown);
      window.removeEventListener("mouseup",     onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
    };
  }, [curX, curY, t1X, t1Y, t2X, t2Y, dotX, dotY, detectState]);

  const s = stateStyles[cursorState];

  return (
    <>
      <TrailDot x={t2X} y={t2Y} size={5} opacity={0.18} />
      <TrailDot x={t1X} y={t1Y} size={7} opacity={0.28} />

      {s.innerSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: s.innerSize,
            height: s.innerSize,
            borderRadius: "50%",
            background: "var(--color-primary, #20b2a6)",
          }}
        />
      )}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center select-none hidden md:block"
        style={{
          x: curX,
          y: curY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:        s.outerSize,
          height:       s.outerSize,
          opacity:      s.outerOpacity,
          background:   s.outerBg,
          border:       s.outerBorder,
          borderRadius: s.outerBorderRadius,
          rotate:       s.rotate,
        }}
        transition={{
          width:        { type: "spring", stiffness: 300, damping: 24 },
          height:       { type: "spring", stiffness: 300, damping: 24 },
          opacity:      { duration: 0.15 },
          background:   { duration: 0.2 },
          rotate:       { type: "spring", stiffness: 200, damping: 20 },
        }}
      >
        {labelText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-bold tracking-widest text-primary pointer-events-none select-none"
            style={{
              rotate: -45,
            }}
          >
            {labelText}
          </motion.span>
        )}
      </motion.div>

      <ClickRipple curX={curX} curY={curY} />
    </>
  );
};

const ClickRipple = ({ curX, curY }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const onDown = () => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: curX.get(), y: curY.get() }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [curX, curY]);

  return (
    <>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
          style={{
            left: r.x,
            top: r.y,
            translateX: "-50%",
            translateY: "-50%",
            border: "1.5px solid var(--color-primary, #20b2a6)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </>
  );
};
