import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Clean Code",
        description: "I try my best to write code that actually makes sense when I read it a month later.",
    },
    {
        icon: Rocket,
        title: "Fast & Smooth",
        description: "Nobody likes slow websites. I focus on making my projects load and run super fast.",
    },
    {
        icon: Users,
        title: "Always Learning",
        description: "Constantly picking up new tech and figuring things out as I go.",
    },
    {
        icon: Lightbulb,
        title: "Creative Flair",
        description: "I love adding cool animations and bits of polish to make projects stand out.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const About = () => {
    return (
        <section id="about" className="py-12 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 md:mb-6"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wider uppercase">About Me</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-6xl font-bold leading-tight mb-8 md:mb-12 lg:max-w-[70%]"
                >
                    Building cool things,
                    <span className="text-muted-foreground font-serif italic font-normal"> and having fun doing it.</span>
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">

                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-5 md:space-y-8"
                    >
                        <div className="space-y-4 md:space-y-6 text-sm md:text-lg leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-4 md:pl-6">
                            <p>
                                I'm an 18-year-old student currently surviving 12th grade while secretly spending a lot of my free time <span className="text-white font-medium">writing code</span>. I started learning web development out of pure curiosity, and now I just can't stop building things.
                            </p>
                            <p>
                                My go-to tech stack right now is <span className="text-primary font-semibold">React (Next.js)</span>, <span className="text-primary font-semibold">Node.js</span>, and <span className="text-primary font-semibold">Tailwind CSS</span>. I really enjoy figuring out how to make websites look awesome and run smoothly without breaking.
                            </p>
                            <p>
                                When I'm not doing school assignments or debugging my code, I'm probably scrolling through GitHub, trying out cool new tools, or just brainstorming my next side project.
                            </p>
                        </div>

                        {/* Mission Quote */}
                        <div className="glass rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Rocket size={60} className="md:w-20 md:h-20" />
                            </div>
                            <p className="text-base md:text-xl font-medium italic text-white leading-relaxed relative z-10">
                                "I'm still learning every day, but my goal is simple: build things that look great, work perfectly, and make people go 'wow'."
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - Highlights */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-3 md:gap-6"
                    >
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="glass p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" />
                                </div>
                                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-xs md:text-base">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};