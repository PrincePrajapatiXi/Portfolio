import { Button } from "@/components/Button";
import {
    ArrowRight,
    ChevronDown,
    Github,
    Linkedin,
    Twitter,
    Download,
    Instagram,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Vercel",
    "Tailwind CSS",
    "Git",
    "GitHub Actions",
];

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
                <div className="absolute inset-0 bg-linear-to-b from-background/20 to-background" />
            </div>
            {/* Green Dots */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute w-1.5 h-1.5 rounded-full opacity-60"
                        style={{
                            backgroundColor: "#20B2A6",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `slow-drift ${15 + Math.random() * 20
                                }s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container mx-auto px-2 md:px-6 pt-20 md:pt-32 pb-20 relative z-10">

                {/* 👇 BAS YAHAN CHANGE HAI: Grid hata kar Flexbox lagaya hai taaki Right Side pakka rahe 👇 */}
                <div className="flex flex-row gap-4 md:gap-8 lg:gap-12 items-center w-full">

                    {/* Left Column - Text Content (Strictly 50% width) */}
                    <div className="w-[57%] md:w-1/2 shrink-0 min-w-0 space-y-3 md:space-y-6 lg:space-y-8">
                        <div className="animate-fade-in">
                            <span className="inline-flex items-center gap-1 px-4 py-3 md:px-4 md:py-2 rounded-full glass text-[12px] md:text-sm text-primary whitespace-nowrap">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />Web Developer • React Specialist
                            </span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-lg sm:text-2xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in animation-delay-100">
                                Crafting <span className="text-primary glow-text">digital</span>
                                <br />
                                experiences with
                                <br />
                                <span className="font-serif italic font-normal text-white">
                                    precision.
                                </span>
                            </h1>
                            <p className="text-sm md:text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                                Hi, I'm Prince — a Web developer specializing in
                                React, Next.js, and TypeScript. I build scalable, performant web
                                applications that users love.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex items-center gap-1.5 md:gap-5 animate-fade-in animation-delay-300">
                            <Button className="min-w-[90px]">
                                Contact Me <ArrowRight className="w-4 h-4" />
                            </Button>
                            <AnimatedBorderButton>
                                <Download className="w-4 h-4" />
                                Download CV
                            </AnimatedBorderButton>
                        </div>
                        {/* Social Links */}
                        <div className="flex items-center gap-2 md:gap-3 animate-fade-in animation-delay-400">
                            <span className="text-xs md:text-sm text-muted-foreground">Follow me: </span>
                            {[{ icon: Github, href: "https://github.com/PrincePrajapatiXi" },
                            { icon: Instagram, href: "https://www.instagram.com/prince_developer_/" },
                            ].map((social, idx) => (
                                <a key={idx} href={social.href} className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300">
                                    {<social.icon className="w-5 h-5" />}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Profile Image (Strictly 50% width) */}
                    <div className="w-[40%] md:w-1/2 shrink-0 min-w-0 flex relative animate-fade-in animation-delay-300 justify-center">

                        {/* Profile Image (Size wapas tumhara wala kar diya: max-w-xs md:max-w-sm) */}
                        <div className="relative w-full max-w-xs md:max-w-sm">
                            <div
                                className="absolute inset-0 
              rounded-3xl bg-linear-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
                            />

                            <div className="relative glass rounded-3xl p-1 glow-border">
                                <img src="/profile-photo.jpg" alt="Prince" className="w-full aspect-2/3 object-cover object-top rounded-2xl" />

                                {/* Floationg Badge */}
                                <div className="flex absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 glass rounded-xl px-2 py-1 md:px-4 md:py-3 animate-float">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs md:text-sm font-medium">Available for work</span>
                                    </div>
                                </div>
                                {/* Stats Badge */}
                                <div className="flex absolute -top-2 -left-2 md:-top-4 md:-left-4 glass rounded-xl px-2 py-1 md:px-4 md:py-3 animate-float animation-delay-500">
                                    <div className="text-lg md:text-2xl font-bold text-primary">0</div>
                                    <div className="text-xs text-muted-foreground">Years Exp.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-20 animate-fade-in animation-delay-600">
                    <p className="text-sm text-muted-foreground mb-6 text-center">Technologies I work with
                    </p>
                    <div className="relative overflow-hidden">
                        <div className="flex animate-marquee">
                            {[...skills, ...skills].map((skill, idx) => (
                                <div key={idx} className="shrink-0 px-8 py-4">
                                    <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
            >
                <a
                    href="#about"
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </a>
            </div>
        </section>
    );
};