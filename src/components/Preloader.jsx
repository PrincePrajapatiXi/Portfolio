import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Ease in-out
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  const letterVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const name = "PRINCE";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          {/* Background subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

          {/* Logo Text */}
          <div className="relative z-10 flex items-center gap-0 mb-8">
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
              className="text-4xl md:text-6xl font-bold text-primary"
            >
              .
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 w-48 md:w-64">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-xs text-muted-foreground mt-3 font-mono tracking-widest"
            >
              {progress}%
            </motion.p>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
