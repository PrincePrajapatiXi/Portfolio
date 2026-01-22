import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCode, FiCoffee, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, education } from '../data';

// Animated Counter Component
function CountUp({ value }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    const numericValue = parseInt(value.toString().replace(/\D/g, '')) || 0;
    const suffix = value.toString().replace(/[0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(easeOut * numericValue));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericValue]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
    const { isDark } = useTheme();

    const stats = [
        { icon: FiCode, label: 'Projects Completed', value: personalInfo.stats.projects },
        { icon: FiCoffee, label: 'Years Learning', value: personalInfo.stats.experience },
        { icon: FiUsers, label: 'Technologies', value: '15+' },
    ];

    return (
        <section id="about" className="section relative py-10 sm:py-14 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6 sm:mb-10 md:mb-14"
                >
                    <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Get to know the person behind the code
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                    {/* Profile Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className={`aspect-square max-w-[160px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-sm mx-auto rounded-xl sm:rounded-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'}`}>
                            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                                <div className="text-center">
                                    <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white/20' : 'text-gray-900/10'}`}>
                                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                    <p className={`mt-2 sm:mt-3 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Add your photo here
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements - smaller on mobile */}
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl opacity-20 blur-lg" />
                        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24 bg-gradient-to-br from-accent to-primary rounded-lg sm:rounded-xl opacity-20 blur-lg" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {/* About Text */}
                        <div className={`mb-4 sm:mb-5 md:mb-8 text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {personalInfo.about.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-3 sm:mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Stats - horizontal on mobile with smaller cards */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center transition-shadow duration-300 ${isDark
                                        ? 'bg-dark-card hover:shadow-lg hover:shadow-primary/10'
                                        : 'bg-light-card hover:shadow-lg hover:shadow-primary/5'
                                        }`}
                                >
                                    <stat.icon className={`mx-auto mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-primary' : 'text-primary-light'}`} />
                                    <motion.div
                                        className={`text-base sm:text-lg md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                                    >
                                        <CountUp value={stat.value} />
                                    </motion.div>
                                    <div className={`text-[10px] sm:text-xs leading-tight ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Download Resume Button - smaller on mobile */}
                        <motion.a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-shadow"
                        >
                            <FiDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </div>

                {/* Education Section */}
                {education && education.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-12 sm:mt-16 md:mt-20"
                    >
                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 md:mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <FiBookOpen className="inline-block mr-2 mb-1 w-5 h-5 sm:w-6 sm:h-6" />
                            Education
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
                                        } transition-all duration-300 hover:shadow-lg hover:shadow-primary/10`}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl ${isDark ? 'bg-primary/20' : 'bg-primary-light/20'}`}>
                                            <FiAward className={`${isDark ? 'text-primary' : 'text-primary-light'} w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {edu.degree}
                                            </h4>
                                            <p className={`text-xs sm:text-sm mb-1.5 sm:mb-2 truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {edu.school}
                                            </p>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {edu.duration}
                                                </span>
                                                {edu.grade && (
                                                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${isDark ? 'bg-primary/20 text-primary' : 'bg-primary-light/20 text-primary-light'
                                                        }`}>
                                                        {edu.grade}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
