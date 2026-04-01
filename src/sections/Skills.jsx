import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiMongodb, SiExpress, SiFramer, SiVite, SiPostman, SiCloudinary, SiNextdotjs, SiTypescript
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    description: "Building responsive and interactive user interfaces.",
    icon: FaReact,
    skills: [
      { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Framer Motion", icon: SiFramer, color: "text-[#0055FF]" },
    ],
    className: "bg-gradient-to-br from-primary/20 via-primary/5 to-transparent",
  },
  {
    title: "Backend",
    description: "Architecting robust and scalable server-side systems.",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
      { name: "Express.js", icon: SiExpress, color: "text-white/80" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Firebase", icon: FaDatabase, color: "text-[#FFCA28]" },
    ],
    className: "bg-gradient-to-tr from-green-500/10 to-transparent",
  },
  {
    title: "Tools",
    description: "Ecosystem and utilities that enhance my workflow.",
    icon: FaGitAlt,
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
      { name: "Vite", icon: SiVite, color: "text-[#646CFF]" },
      { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-[#3448C5]" },
    ],
    className: "bg-gradient-to-t from-blue-500/10 to-transparent",
  },
];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-12 md:py-24 lg:py-32 px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center mb-10 md:mb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4"
        >
          What I Use
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white"
        >
          Tech <span className="text-muted-foreground font-serif italic font-normal">Stack</span>
        </motion.h2>

        {/* Freelance Availability Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="text-xs md:text-sm text-green-400 font-medium tracking-wide">Available for freelance — Apr 2026</span>
        </motion.div>
      </div>

      {/* Mobile: 1-col grid */}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {skillCategories.map((card) => (
            <div
              key={card.title}
              className={`glass-strong p-5 rounded-[1.5rem] relative overflow-hidden group flex flex-col hover:bg-white/[0.03] transition-colors border border-white/5 ${card.className}`}
            >
              {/* Top row */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors leading-tight">
                  {card.title}
                </h3>
                {card.icon && <card.icon className="text-xl text-white/10" />}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {card.description}
              </p>

              {/* Skill items with text */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {card.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <skill.icon className={`text-sm ${skill.color}`} />
                    <span className="text-[11px] font-medium text-white/90">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-20 h-20 bg-primary/5 rounded-full blur-[30px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: original masonry/columns layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="hidden md:block columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {skillCategories.map((card) => (
          <TiltCard
            key={card.title}
            className={`glass-strong p-8 rounded-[2.5rem] relative overflow-hidden group flex flex-col hover:bg-white/[0.03] transition-colors border border-white/5 break-inside-avoid ${card.className}`}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                {card.icon && <card.icon className="text-2xl text-white/10 group-hover:text-primary/40 transition-colors" />}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {card.description}
              </p>
            </div>

            {/* Skill items with text instead of tooltips */}
            <div className="relative z-10 flex flex-wrap gap-3 mt-4">
              {card.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                  <skill.icon className={`text-lg ${skill.color} filter drop-shadow-[0_0_8px_rgba(32,178,166,0.3)]`} />
                  <span className="text-sm font-medium text-white/90">{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-500" />
          </TiltCard>
        ))}
      </motion.div>

      {/* Active Stats Section */}
      <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Currently Building */}
        <div className="glass-strong p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-colors relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-sm md:text-base font-bold text-white mb-1">Currently building</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Modern Full-stack AI Applications</p>
            </div>
            <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary text-lg md:text-xl font-bold animate-pulse">⚡</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/10 rounded-full blur-[30px]" />
        </div>

        {/* Projects Built */}
        <div className="glass-strong p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-colors relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-sm md:text-base font-bold text-white mb-1">Projects Built</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Always exploring new tech</p>
            </div>
            <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary text-sm md:text-base font-bold">12+</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/10 rounded-full blur-[30px]" />
        </div>
      </div>
    </section>
  );
};