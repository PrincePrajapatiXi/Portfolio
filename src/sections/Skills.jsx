import { motion } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiMongodb, SiExpress, SiFramer, SiVite, SiPostman, SiCloudinary, SiNextdotjs, SiTypescript
} from "react-icons/si";

const skillCards = [
  {
    title: "Core Frontend",
    description: "Building modern, reactive web interfaces.",
    icon: FaReact,
    skills: [
      { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
    ],
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent",
    variant: "large"
  },
  {
    title: "Styling & Motion",
    description: "Creating fluid, beautiful user experiences.",
    icon: SiFramer,
    skills: [
      { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Framer", icon: SiFramer, color: "text-[#0055FF]" },
    ],
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-tr from-purple-500/10 to-transparent",
  },
  {
    title: "Backend Core",
    description: "Scalable server-side logic & APIs.",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
      { name: "Express", icon: SiExpress, color: "text-white/80" },
    ],
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-bl from-green-500/10 to-transparent",
  },
  {
    title: "Database",
    description: "Managing data with precision.",
    icon: SiMongodb,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Firebase", icon: FaDatabase, color: "text-[#FFCA28]" },
    ],
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-r from-orange-500/10 to-transparent",
  },
  {
    title: "Tools & Ecosystem",
    description: "The fuel behind the development process.",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
      { name: "Vite", icon: SiVite, color: "text-[#646CFF]" },
      { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-[#3448C5]" },
    ],
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-t from-blue-500/10 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase mb-4"
        >
          My Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-center tracking-tight"
        >
          Tech <span className="text-muted-foreground font-serif italic font-normal">Stack</span>
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {skillCards.map((card, idx) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            className={`glass-strong p-8 rounded-[2.5rem] relative overflow-hidden group flex flex-col hover:bg-white/[0.03] transition-colors border-white/5 break-inside-avoid ${card.className.replace(/md:col-span-\d|md:row-span-\d/g, "")}`}
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

            <div className="relative z-10 flex flex-wrap gap-3 mt-4">
              {card.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/skill relative"
                >
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover/skill:bg-primary/10 group-hover/skill:border-primary/20 transition-all duration-300">
                    <skill.icon className={`text-xl ${skill.color} filter drop-shadow-[0_0_8px_rgba(32,178,166,0.3)]`} />
                  </div>
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-500" />
          </motion.div>
        ))}

        {/* Small Stat Card */}
        <motion.div
          variants={itemVariants}
          className="glass-strong p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent flex flex-col items-center justify-center text-center border-primary/20 relative group break-inside-avoid"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-primary text-xl font-bold">12</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Projects Built</h4>
          <p className="text-xs text-muted-foreground">Always building...</p>
        </motion.div>
      </motion.div>
    </section>
  );
};
