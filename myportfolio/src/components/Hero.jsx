import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';

export default function Hero() {
    const { isDark } = useTheme();

    const roles = ['Full Stack Developer', 'MERN Stack Expert', 'UI/UX Enthusiast'];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-0">
            {/* Animated Background Blobs */}
            <div className="gradient-blob gradient-blob-1" />
            <div className="gradient-blob gradient-blob-2" />

            {/* Grid Pattern */}
            <div
                className={`absolute inset-0 bg-grid-pattern bg-grid opacity-30 ${isDark ? '' : 'opacity-10'
                    }`}
                style={{
                    maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 100%)',
                }}
            />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-5 md:mb-8 text-[10px] sm:text-xs ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-card border border-light-border'
                        }`}
                >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Available for opportunities
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-5 leading-tight ${isDark ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    Hi, I'm{' '}
                    <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
                    <br />
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {personalInfo.tagline}
                    </span>
                </motion.h1>

                {/* Typing Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-3 sm:mb-5 md:mb-8 h-5 sm:h-6 flex items-center justify-center"
                >
                    <TypingAnimation texts={roles} />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-10"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-md sm:rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        className={`w-full sm:w-auto px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg border-2 transition-all duration-300 hover:-translate-y-1 ${isDark
                            ? 'border-dark-border text-white hover:bg-dark-surface'
                            : 'border-light-border text-gray-900 hover:bg-light-card'
                            }`}
                    >
                        Contact Me
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5"
                >
                    {[
                        { icon: FiGithub, url: personalInfo.socials.github, label: 'GitHub' },
                        { icon: FiLinkedin, url: personalInfo.socials.linkedin, label: 'LinkedIn' },
                        { icon: FiTwitter, url: personalInfo.socials.twitter, label: 'Twitter' },
                    ].map(({ icon: Icon, url, label }) => (
                        <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 sm:p-2 md:p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 ${isDark
                                ? 'bg-dark-surface hover:bg-dark-border text-gray-400 hover:text-white'
                                : 'bg-light-card hover:bg-light-border text-gray-600 hover:text-gray-900'
                                }`}
                            aria-label={label}
                        >
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </a>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={isDark ? 'text-gray-500' : 'text-gray-400'}
                    >
                        <FiArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Typing Animation Component
function TypingAnimation({ texts }) {
    const { isDark } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, texts]);

    return (
        <span className={`text-xs sm:text-sm md:text-lg font-medium ${isDark ? 'text-primary' : 'text-primary-light'}`}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}
