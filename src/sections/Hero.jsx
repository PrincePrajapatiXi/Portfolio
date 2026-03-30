import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Github, Instagram, ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useRef } from "react";

const skills = [
    "React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JavaScript", "TypeScript", "Vite", "Git", "Framer Motion"
];

export const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax & Fade Effects
    const yBg = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <section ref={containerRef} id="home" className="relative min-h-screen lg:min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Parallax Layer */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Spline 3D Object - Abstract Morphing Sphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.25] blur-[15px] scale-110">
                    <spline-viewer url="https://prod.spline.design/Is7NfV87X21N0OOf/scene.splinecode" />
                </div>

                <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px]" />
            </motion.div>

            {/* Content Layer */}
            <motion.div
                style={{ opacity, scale, y: yText }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="grid grid-cols-[55%_45%] lg:grid-cols-2 gap-4 lg:gap-16 items-center">
                    
                    {/* Text Column */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3 lg:space-y-8 col-span-1"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 glass-reflection transform scale-90 origin-left lg:scale-100">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">Available</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
                            <h1 className="text-3xl md:text-8xl font-bold tracking-tight leading-[1.05]">
                                Building <span className="text-primary italic font-serif font-normal text-glow-strong">Awesome</span>
                                <br />
                                Websites<span className="text-primary">.</span>
                            </h1>
                            <p className="text-xs md:text-xl text-muted-foreground max-w-[200px] lg:max-w-lg leading-relaxed">
                                Hey! I'm <span className="text-foreground font-bold">Prince</span>. I'm an 18-year-old student in 12th grade who loves coding and building
                                <span className="text-foreground"> cool full-stack projects</span> from scratch.
                            </p>
                        </motion.div>

                        {/* Buttons — desktop only (mobile buttons rendered below grid) */}
                        <motion.div variants={itemVariants} className="hidden lg:flex items-center gap-5">
                            <Button href="#contact" className="h-14 px-10 text-lg group">
                                Let's Talk <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <AnimatedBorderButton href="/resume.pdf" target="_blank" className="h-14 px-8 text-base">
                                <Download className="mr-2 w-5 h-5" /> Download CV
                            </AnimatedBorderButton>
                        </motion.div>

                        {/* Social Links & Connect */}
                        <motion.div variants={itemVariants} className="pt-3 lg:pt-10 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-8">
                            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">Connect</div>
                            <div className="flex items-center gap-3 lg:gap-4">
                                {[
                                    { icon: Github, href: "https://github.com/PrincePrajapatiXi" },
                                    { icon: Instagram, href: "https://www.instagram.com/prince_developer_/" },
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -4, scale: 1.15 }}
                                        className="p-2 lg:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <social.icon className="w-4 h-4 lg:w-5.5 lg:h-5.5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Image / Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 60 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative opacity-100 z-10 pointer-events-auto flex justify-end items-start lg:pr-10 col-span-1 h-full"
                    >
                        {/* Main Image Card */}
                        <div className="relative z-10 w-[160px] lg:w-[420px] rounded-[1.5rem] lg:rounded-[4rem] overflow-hidden border border-white/10 glass-reflection shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] group mt-2 lg:mt-0">
                            <img
                                src="/profile-photo.jpg"
                                alt="Prince"
                                className="w-full h-[210px] lg:h-[680px] object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

                            {/* Full-Stack Dev badge */}
                            <div className="absolute bottom-2 left-2 lg:bottom-10 lg:left-5 p-2 lg:p-5 glass-strong rounded-xl lg:rounded-[2rem] border border-white/10 backdrop-blur-2xl scale-[0.6] lg:scale-100 origin-bottom-left">
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <div className="w-2 h-2 lg:w-3 lg:h-2.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Full-Stack Dev</span>
                                </div>
                            </div>
                        </div>

                        {/* "Based In" badge — hidden on mobile */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="hidden lg:block absolute top-2 right-4 z-20"
                        >
                            <div className="glass px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl">
                                <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Based in</div>
                                <div className="text-xs font-bold whitespace-nowrap">India, UP</div>
                            </div>
                        </motion.div>

                        {/* Top floating blob — hidden on mobile */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden lg:flex absolute top-10 left-10 w-24 h-24 rounded-[2rem] glass-strong border border-white/10 z-0 items-center justify-center shadow-2xl opacity-60"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/20 blur-[10px]" />
                        </motion.div>

                        {/* Bottom blob — hidden on mobile */}
                        <motion.div
                            animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="hidden lg:block absolute bottom-10 left-20 w-32 h-32 rounded-[2.5rem] glass-strong border border-white/15 z-0 opacity-30 backdrop-blur-3xl"
                        />
                    </motion.div>
                </div>

                {/* Mobile only — buttons full width below grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex lg:hidden flex-row items-center gap-3 mt-5"
                >
                    <Button href="#contact" className="h-11 px-6 text-sm group">
                        Let's Talk <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <AnimatedBorderButton href="/resume.pdf" target="_blank" className="h-11 px-5 text-sm">
                        <Download className="mr-1 w-4 h-4" /> Download CV
                    </AnimatedBorderButton>
                </motion.div>

                {/* Tech Marquee */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 lg:mt-40 pt-8 lg:pt-16 border-t border-white/5"
                >
                    <div className="flex flex-wrap justify-center gap-x-8 lg:gap-x-16 gap-y-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        {skills.map((skill, idx) => (
                            <span key={idx} className="text-base md:text-3xl font-black tracking-tighter uppercase whitespace-nowrap hover:text-primary transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 group-hover:text-primary transition-colors">Explore Portfolio</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-6 h-6 text-primary/50 group-hover:text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};