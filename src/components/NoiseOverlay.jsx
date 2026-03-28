import { motion } from "framer-motion";

export const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] opacity-[0.035] overflow-hidden">
      <motion.div
        animate={{
          x: ["0%", "-5%", "5%", "-8%", "2%", "-5%", "0%"],
          y: ["0%", "5%", "-5%", "3%", "-4%", "5%", "0%"],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"
      />
    </div>
  );
};
