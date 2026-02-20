import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Clean Code",
        description:
            "Writing maintainable, scalable code that stands the test of time.",
    },
    {
        icon: Rocket,
        title: "Performance",
        description:
            "Optimizing for speed and delivering lightning-fast user experiences.",
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working closely with teams to bring ideas to life.",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description:
            "Staying ahead with the latest technologies and best practices.",
    },
];

export const About = () => {
    return (
        <section id="about" className="py-16 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="animate-fade-in mb-3 md:mb-6">
                    <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-sm font-medium tracking-wider uppercase">About Me</span>
                </div>

                <h2 className="text-xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground mb-5 md:mb-10 md:max-w-[50%]">
                    Building the future,
                    <span className="font-serif italic font-normal text-white"> one component at a time.</span>
                </h2>

                <div className="grid grid-cols-2 gap-4 md:gap-16 items-start">{/* Left Column */}
                    <div className="space-y-3 md:space-y-8">

                        <div className="space-y-3 md:space-y-4 text-[11px] md:text-base leading-relaxed text-muted-foreground animate-fade-in animation-delay-200 border-l-2 border-primary/30 pl-3 md:pl-5">
                            <p>
                                I'm a <span className="text-foreground font-medium">passionate web developer</span> dedicated to crafting digital experiences that stand out. My journey started with a deep curiosity for how things work on the web, and it has evolved into a strong focus on <span className="text-foreground font-medium">modern web technologies</span>.
                            </p>
                            <p>
                                I currently specialize in <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 rounded bg-primary/10 text-primary font-medium text-[10px] md:text-sm">Next.js</span> <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 rounded bg-primary/10 text-primary font-medium text-[10px] md:text-sm">Node.js</span> and <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-0.5 rounded bg-primary/10 text-primary font-medium text-[10px] md:text-sm">Tailwind CSS</span>. Whether I am building sleek front-end interfaces or developing robust full-stack applications, my goal is to combine <span className="text-foreground font-medium">clean code</span> with an exceptional user experience.
                            </p>
                            <p>
                                When I'm not writing code, you'll find me exploring <span className="text-foreground font-medium">emerging technologies</span>, deepening my understanding of software architecture, and continuously refining my problem-solving skills to stay ahead in the ever-evolving tech landscape.
                            </p>
                        </div>

                        {/* Mission Quote - Desktop only, inside left column */}
                        <div className="hidden md:block glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
                            <p className="text-lg font-medium italic text-foreground">
                                "My mission is to create digital experiences that are not just functional, but truly delightful — products that users love to use and developers love to maintain."
                            </p>
                        </div>

                    </div>
                    {/* Right Column - Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-6">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="glass p-2.5 md:p-5 rounded-xl md:rounded-2xl animate-fade-in"
                                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                            >
                                <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-1.5 md:mb-4 hover:bg-primary/20">
                                    <item.icon className="w-3.5 h-3.5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <h3 className="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">{item.title}</h3>
                                <p className="text-[10px] md:text-sm text-muted-foreground leading-snug">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Quote - Mobile only, full width */}
                <div className="md:hidden glass rounded-xl p-3 glow-border animate-fade-in animation-delay-300 mt-5">
                    <p className="text-[11px] font-medium italic text-foreground">
                        "My mission is to create digital experiences that are not just functional, but truly delightful — products that users love to use and developers love to maintain."
                    </p>
                </div>
            </div>
        </section>
    );
};
