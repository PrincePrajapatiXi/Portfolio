import { ArrowUpRight, Github, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Link } from "react-router-dom";

const projects = [
    {
        id: "1",
        title: "Army SMP",
        description:
            "A comprehensive Minecraft server store platform with rank purchasing, order management, and admin-powered analytics dashboard.",
        image: "/projects/project1.png",
        tags: ["React", "Node.js", "MongoDB", "Express", "Vite", "PWA"],
        link: "https://store.armymsmp.fun",
        github: "https://github.com/PrincePrajapatiXi/Army-SMP-2",
        featured: true
    },
    {
        id: "2",
        title: "Catchy Store",
        description:
            "A feature-rich e-commerce electronics store with product filtering, cart management, and a responsive PWA-optimized shopping experience.",
        image: "/projects/project2.png",
        tags: ["React", "Vite", "Context API", "PWA", "Tailwind"],
        link: "https://catchystore.vercel.app/",
        github: "https://github.com/PrincePrajapatiXi/E-commerce",
        featured: false
    },
];

export const Projects = () => {
    return (
        <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
            {/* Bg glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[100px] -z-10" />
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary font-medium tracking-wider uppercase text-sm"
                        >
                            Selected Works
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold mt-4"
                        >
                            Building digital products, <span className="text-muted-foreground font-serif italic font-normal">brands and experience.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
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
                            <Link to={`/case-study/${project.id}`} className="relative aspect-[16/10] rounded-3xl overflow-hidden glass hover:border-primary/50 transition-colors duration-500">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                                {/* Badge */}
                                {project.featured && (
                                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary/90 text-white text-xs font-bold backdrop-blur-md shadow-lg">
                                        FEATURED
                                    </div>
                                )}

                                {/* Hover Actions */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
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
                            </Link>

                            {/* Project Info */}
                            <div className="mt-6 space-y-4 px-2">
                                <div className="flex justify-between items-start gap-4">
                                    <Link to={`/case-study/${project.id}`}>
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                    </Link>
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
                                    <Link 
                                        to={`/case-study/${project.id}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                                    >
                                        View Case Study <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
