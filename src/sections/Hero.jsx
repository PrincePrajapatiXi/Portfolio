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
        <section ref={containerRef} id="home" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
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
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 glass-reflection">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Available for new opportunities</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05]">
                                Design <span className="text-primary italic font-serif font-normal text-glow-strong">Driven</span>
                                <br />
                                Development<span className="text-primary">.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                                I'm <span className="text-foreground font-bold">Prince</span>, a Full-Stack Developer obsessed with building
                                <span className="text-foreground"> exceptional digital experiences</span> that merge form and function.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
                            <Button href="#contact" className="h-14 px-10 text-lg group">
                                Let's Talk <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <AnimatedBorderButton href="/resume.pdf" target="_blank" className="h-14 px-8">
                                <Download className="mr-2 w-5 h-5" /> Download CV
                            </AnimatedBorderButton>
                        </motion.div>
                        
                        {/* Social Links & Connect */}
                        <motion.div variants={itemVariants} className="pt-10 flex items-center gap-8">
                            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">Connect</div>
                            <div className="flex items-center gap-4">
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
                                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <social.icon className="w-5.5 h-5.5" />
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
                        className="relative hidden lg:flex justify-end pr-10"
                    >
                        {/* Main Image Card */}
                        <div className="relative z-10 w-[420px] rounded-[4rem] overflow-hidden border border-white/10 glass-reflection shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] group">
                            <img
                                src="/profile-photo.jpg"
                                alt="Prince"
                                className="w-full h-[680px] object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                            
                            {/* Full-Stack Dev badge — inside image, bottom-left */}
                            <div className="absolute bottom-10 left-5 p-5 glass-strong rounded-[2rem] border border-white/10 backdrop-blur-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Full-Stack Dev</span>
                                </div>
                            </div>
                        </div>

                        {/* "Based In" badge — fixed: right-4 so it stays inside viewport */}
                        <motion.div 
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute top-2 right-4 z-20"
                        >
                            <div className="glass px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl">
                                <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Based in</div>
                                <div className="text-xs font-bold whitespace-nowrap">India, UP</div>
                            </div>
                        </motion.div>

                        {/* Top floating blob — fixed: right-4 instead of -right-6 */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 left-10 w-24 h-24 rounded-[2rem] glass-strong border border-white/10 z-0 flex items-center justify-center shadow-2xl opacity-60"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/20 blur-[10px]" />
                        </motion.div>

                        {/* Bottom blob — fixed: left-0 instead of -left-6 */}
                        <motion.div
                            animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-20 w-32 h-32 rounded-[2.5rem] glass-strong border border-white/15 z-0 opacity-30 backdrop-blur-3xl"
                        />
                    </motion.div>
                </div>

                {/* Tech Marquee */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-40 pt-16 border-t border-white/5"
                >
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        {skills.map((skill, idx) => (
                            <span key={idx} className="text-xl md:text-3xl font-black tracking-tighter uppercase whitespace-nowrap hover:text-primary transition-colors cursor-default">
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