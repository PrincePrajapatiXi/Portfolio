import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    Github,
    Download,
    Instagram,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const skills = [
    "React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JavaScript", "TypeScript", "Vite", "Git", "Framer Motion"
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Bg */}
            <div className="absolute inset-0">
                <img
                    src="/hero-bg.jpg"
                    alt="Hero image"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                        animate={{
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 pt-20 md:pt-32 pb-20 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col lg:flex-row gap-12 items-center"
                >
                    {/* Left Column */}
                    <div className="flex-1 space-y-8">
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                Available for new opportunities
                            </span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                                Design <span className="text-primary glow-text">Driven</span>
                                <br />
                                Development.
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                                I'm <span className="text-white font-semibold">Prince</span>, a Full-Stack Developer 
                                obsessed with building exceptional digital experiences that merge form and function.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                            <Button href="#contact" className="h-14 px-8 text-lg group">
                                Let's Talk <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <AnimatedBorderButton href="/resume.pdf" target="_blank" className="h-14 px-8">
                                <Download className="mr-2 w-5 h-5" /> Download CV
                            </AnimatedBorderButton>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Connect</span>
                            <div className="w-12 h-[1px] bg-border" />
                            <div className="flex gap-4">
                                {[{ icon: Github, href: "https://github.com/PrincePrajapatiXi" },
                                { icon: Instagram, href: "https://www.instagram.com/prince_developer_/" }].map((social, idx) => (
                                    <a key={idx} href={social.href} className="p-3 rounded-2xl glass hover:bg-primary/10 hover:text-primary transition-all duration-300">
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Profile */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex-1 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[400px]">
                            {/* Decorative Blobs */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-highlight/10 rounded-full blur-[100px] animate-pulse delay-700" />
                            
                            <div className="relative glass p-2 rounded-[2.5rem] overflow-hidden group">
                                <img 
                                    src="/profile-photo.jpg" 
                                    alt="Prince" 
                                    className="w-full aspect-[4/5] object-cover rounded-[2rem] grayscale-[50%] group-hover:grayscale-0 transition-all duration-700" 
                                />
                                
                                {/* Overlay Badges */}
                                <div className="absolute bottom-6 right-6 glass p-4 rounded-3xl shadow-2xl animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="font-bold text-sm">Full-Stack Dev</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Tech Marquee */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-32 pt-12 border-t border-border/50"
                >
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {skills.map((skill, idx) => (
                            <span key={idx} className="text-xl md:text-2xl font-bold tracking-tighter uppercase whitespace-nowrap">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/50">Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};