import { ArrowUpRight, Github, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const projects = [
    {
        id: "1",
        title: "Army SMP",
        description:
            "I built a complete Minecraft server store where players can buy ranks. It has an admin dashboard to track orders easily.",
        image: "/projects/project1.png",
        tags: ["React", "Node.js", "MongoDB", "Express", "Vite", "PWA"],
        link: "https://store.armysmp.fun",
        github: "https://github.com/PrincePrajapatiXi/Army-SMP-2",
        featured: true
    },
    {
        id: "2",
        title: "Catchy Store",
        description:
            "An e-commerce site for electronics. I learned a lot about adding carts, filtering products, and making it work like an app (PWA).",
        image: "/projects/project2.png",
        tags: ["React", "Vite", "Context API", "PWA", "Tailwind"],
        link: "https://catchystore.vercel.app/",
        github: "https://github.com/PrincePrajapatiXi/E-commerce",
        featured: false
    }
];

export const Projects = () => {
    return (
        <section id="projects" className="py-12 md:py-20 lg:py-32 relative overflow-hidden">
            {/* Bg glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary font-medium tracking-wider uppercase text-xs md:text-sm"
                        >
                            Stuff I've Built
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-4xl lg:text-6xl font-bold mt-2 md:mt-4"
                        >
                            Checkout some of my <span className="text-muted-foreground font-serif italic font-normal">favorite projects.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* ── MOBILE layout: single column, compact cards ── */}
                <div className="flex flex-col gap-5 md:hidden">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group glass rounded-2xl overflow-hidden border border-white/5"
                        >
                            {/* Image — compact height */}
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/8] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                                {/* Featured badge */}
                                {project.featured && (
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-bold backdrop-blur-md">
                                        FEATURED
                                    </div>
                                )}

                                {/* Action buttons on image */}
                                <div className="absolute bottom-3 right-3 flex gap-2">
                                    {project.link && (
                                        <motion.div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(project.link, "_blank");
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-8 h-8 rounded-xl glass-strong flex items-center justify-center text-white cursor-pointer"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </motion.div>
                                    )}
                                    <motion.div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(project.github, "_blank");
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-8 h-8 rounded-xl glass-strong flex items-center justify-center text-white cursor-pointer"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                    </motion.div>
                                </div>
                            </a>

                            {/* Info */}
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-start gap-2">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </a>
                                    <div className="flex flex-wrap gap-1 justify-end">
                                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[9px] font-medium text-primary/80 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20 whitespace-nowrap">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                                <a
                                    href={project.github} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary pt-1"
                                >
                                    View on GitHub <ArrowUpRight className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── DESKTOP layout: original 2-col grid ── */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col"
                        >
                            {/* Project Card */}
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative aspect-[16/10] rounded-3xl overflow-hidden glass hover:border-primary/50 transition-colors duration-500">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                                {project.featured && (
                                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary/90 text-white text-xs font-bold backdrop-blur-md shadow-lg">
                                        FEATURED
                                    </div>
                                )}

                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                                    {project.link && (
                                        <motion.div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(project.link, "_blank");
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center hover:bg-primary text-white transition-colors cursor-pointer"
                                        >
                                            <ExternalLink className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                    <motion.div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(project.github, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center hover:bg-primary text-white transition-colors cursor-pointer"
                                    >
                                        <Github className="w-6 h-6" />
                                    </motion.div>
                                </div>
                            </a>

                            {/* Project Info */}
                            <div className="mt-6 space-y-4 px-2">
                                <div className="flex justify-between items-start gap-4">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                    </a>
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[10px] md:text-xs font-medium text-primary/80 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="pt-2">
                                    <a
                                        href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                                    >
                                        View on GitHub <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};