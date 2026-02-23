import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
    {
        quote: "Just took a look at Prince’s updated portfolio and it’s top-tier! The UI is incredibly smooth, and you can tell Prince really cares about the fine details that make a site feel premium. It’s rare to find a developer who balances aesthetics and performance this well. Prince absolutely nailed this—highly recommend checking out his work.",
        author: "Army of mr random",
        role: "Owner of army smp",
        avatar: "/review1.jpg",
    },
    {
        quote: "Took his services recently. The Developer Prince is really friendly and cooperative willing to help when required. He made the site stunning and feel premium with optimised performance! .Totally recommend for everyone. ✌️",
        author: "Void",
        role: "Youtuber",
        avatar: "/review2.png",
    },
    {
        quote: "Prince's expertise in React and TypeScript helped us rebuild our entire frontend in record time. His architectural decisions continue to pay dividends.",
        author: "Nukkad gamer",
        role: "Software Engineer, Youtuber",
        avatar: "/review3.JPG",
    },
    {
        quote: "The portfolio looks serious and better now. Instead of flashy and weird elements it focuses on the key factors and makes the decisions easier. Would really like to try the services.",
        author: "Utsav",
        role: "Front end developer",
        avatar: "/review4.JPG",
    },
];

export const Testimonials = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    // Optimization: Preload all images on mount
    useEffect(() => {
        testimonials.forEach((testimonial) => {
            const img = new Image();
            img.src = testimonial.avatar;
        });
    }, []);

    const next = () => {
        setActiveIdx((prev) => (prev + 1) % testimonials.length);
    };

    const previous = () => {
        setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            id="testimonials"
            className="py-16 md:py-32 relative overflow-hidden bg-black text-white"
        >
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2
                w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-primary/5
                rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                        What People Say
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 text-secondary-foreground">
                        Kind words from{" "}
                        <span className="font-serif italic font-normal text-white">
                            amazing people.
                        </span>
                    </h2>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Main Testimonial Card */}
                        <div className="glass p-5 rounded-2xl md:p-12 md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500">
                            <div className="absolute -top-3 left-6 w-9 h-9 md:-top-4 md:left-8 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center">
                                <Quote className="w-4 h-4 md:w-6 md:h-6 text-white" />
                            </div>

                            <blockquote className="text-base md:text-2xl font-medium leading-relaxed mb-5 md:mb-8 pt-4 min-h-[150px]">
                                "{testimonials[activeIdx].quote}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <img
                                    key={testimonials[activeIdx].avatar} // Important for re-rendering animation
                                    src={testimonials[activeIdx].avatar}
                                    alt={testimonials[activeIdx].author}
                                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-blue-500/20"
                                    loading="eager" 
                                />
                                <div>
                                    <div className="text-sm md:text-base font-semibold">
                                        {testimonials[activeIdx].author}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-400">
                                        {testimonials[activeIdx].role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                        <button 
                            className="p-2 md:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all" 
                            onClick={previous}
                        >
                            <ChevronLeft />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === activeIdx
                                            ? "w-8 bg-blue-600"
                                            : "w-2 bg-gray-600 hover:bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-2 md:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};