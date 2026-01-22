import { motion } from 'framer-motion';
import { FiAward, FiCode, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { certifications } from '../data';

// Icon mapping
const iconMap = {
    code: FiCode,
    award: FiAward,
    certificate: FiCheckCircle,
};

export default function Certifications() {
    const { isDark } = useTheme();

    // Don't render if no certifications
    if (!certifications || certifications.length === 0) {
        return null;
    }

    return (
        <section id="certifications" className="section relative py-10 sm:py-14 md:py-20">
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
                        <span className="gradient-text">Certifications</span> & Achievements
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Credentials that validate my skills and learning journey
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {certifications.map((cert, index) => {
                        const IconComponent = iconMap[cert.icon] || FiAward;

                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className={`group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl ${isDark
                                    ? 'bg-dark-card border border-dark-border hover:border-primary/40'
                                    : 'bg-light-card border border-light-border hover:border-primary-light/40'
                                    } transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${isDark ? 'bg-primary/20' : 'bg-primary-light/20'
                                    }`}>
                                    <IconComponent
                                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${isDark ? 'text-primary' : 'text-primary-light'}`}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className={`text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {cert.title}
                                </h3>

                                {/* Issuer */}
                                <p className={`text-xs sm:text-sm mb-1 ${isDark ? 'text-primary' : 'text-primary-light'}`}>
                                    {cert.issuer}
                                </p>

                                {/* Date */}
                                <p className={`text-[9px] sm:text-[10px] mb-1.5 sm:mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {cert.date}
                                </p>

                                {/* Verify Link */}
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium transition-colors ${isDark
                                            ? 'text-gray-400 hover:text-primary'
                                            : 'text-gray-500 hover:text-primary-light'
                                            }`}
                                    >
                                        <FiExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        Verify
                                    </a>
                                )}

                                {/* Decorative gradient line at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg sm:rounded-b-xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
