import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiGithub, FiLinkedin, FiTwitter, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data';

// ═══════════════════════════════════════════════════════════════════════════
// 📧 WEB3FORMS SETUP - Free contact form service
// ═══════════════════════════════════════════════════════════════════════════
// 1. Go to https://web3forms.com
// 2. Enter your email and get access key (FREE)
// 3. Replace 'YOUR_ACCESS_KEY' below with your key
// ═══════════════════════════════════════════════════════════════════════════
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY'; // ← APNA ACCESS KEY DAALO

export default function Contact() {
    const { isDark } = useTheme();
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(formRef.current);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                formRef.current.reset();
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
        },
        {
            icon: FiMapPin,
            label: 'Location',
            value: personalInfo.location,
            href: null,
        },
    ];

    const socialLinks = [
        { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
        { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
        { icon: FiTwitter, href: personalInfo.socials.twitter, label: 'Twitter' },
    ];

    return (
        <section id="contact" className="section relative py-10 sm:py-14 md:py-20">
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
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Have a project in mind? Let's work together to create something amazing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className={`text-base sm:text-lg md:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Let's Talk
                        </h3>
                        <p className={`text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-center gap-2 sm:gap-3">
                                    <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${isDark ? 'bg-dark-card' : 'bg-light-card'
                                        }`}>
                                        <item.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-primary' : 'text-primary-light'}`} />
                                    </div>
                                    <div>
                                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className={`text-xs sm:text-sm font-medium hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className={`text-[10px] sm:text-xs mb-2 sm:mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Find me on
                            </p>
                            <div className="flex gap-1.5 sm:gap-2">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-300 hover:-translate-y-1 ${isDark
                                            ? 'bg-dark-card hover:bg-dark-border text-gray-400 hover:text-white'
                                            : 'bg-light-card hover:bg-light-border text-gray-600 hover:text-gray-900'
                                            }`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    required
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="user_email"
                                    required
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder-gray-500'
                                        : 'bg-white border-light-border text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-center text-[10px] sm:text-xs">
                                    ✅ Message sent! I'll get back to you soon.
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center text-[10px] sm:text-xs">
                                    ❌ Something went wrong. Try again or email me.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
