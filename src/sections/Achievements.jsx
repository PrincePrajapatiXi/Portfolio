import { motion } from "framer-motion";
import { Award, Trophy, BookOpen, Zap, ExternalLink } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "12+ Projects Built",
    description: "Completed over 12 full-stack and frontend projects from scratch, including e-commerce stores and gaming platforms.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: BookOpen,
    title: "Self-Taught Developer",
    description: "Learned web development entirely through self-study, online resources, and building real-world projects.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Full-Stack Capable",
    description: "Proficient in both frontend (React, Next.js) and backend (Node.js, Express, MongoDB) development.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "Modern Tech Stack",
    description: "Building with cutting-edge tools: React 19, Tailwind CSS v4, Vite, Framer Motion, and TypeScript.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const certifications = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2025",
    link: "#",
  },
  {
    title: "JavaScript Algorithms & DS",
    issuer: "freeCodeCamp",
    year: "2025",
    link: "#",
  },
  {
    title: "Frontend Development",
    issuer: "Self-Directed Learning",
    year: "2024 — Present",
    link: null,
  },
  {
    title: "Full-Stack Development",
    issuer: "Self-Directed Learning",
    year: "2025 — Present",
    link: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Achievements = () => {
  return (
    <section id="achievements" className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3"
          >
            Milestones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight"
          >
            Achievements &{" "}
            <span className="text-muted-foreground font-serif italic font-normal">Certifications</span>
          </motion.h2>
        </div>

        {/* Achievement Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-strong p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5 group hover:bg-white/[0.03] transition-colors text-center md:text-left"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${item.bgColor} flex items-center justify-center mb-3 md:mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Learning & Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
                {cert.link && cert.link !== "#" && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 ml-2">
                    <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
