import { motion } from "framer-motion";

export const SkeletonLoader = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-white/5 rounded-2xl ${className}`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ))}
    </>
  );
};

export const ProjectSkeleton = () => (
  <div className="space-y-4">
    <SkeletonLoader className="w-full aspect-video rounded-[2.5rem]" />
    <div className="space-y-2">
      <SkeletonLoader className="w-3/4 h-8" />
      <SkeletonLoader className="w-full h-4" />
      <SkeletonLoader className="w-1/2 h-4" />
    </div>
  </div>
);
