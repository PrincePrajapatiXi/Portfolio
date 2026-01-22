import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { skills } from '../data';
import { FaCode, FaDatabase, FaServer, FaTools, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJava, FaPython, FaFigma, FaRobot } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiTailwindcss, SiNextdotjs, SiPostman, SiVercel, SiFirebase, SiPostgresql, SiRedux, SiExpress, SiMysql, SiGoogle } from 'react-icons/si';
import { BiLogoHtml5, BiLogoCss3 } from 'react-icons/bi';
import { VscVscode } from 'react-icons/vsc';

// Simple icon mapping with reliable icons only
const iconMap = {
    html5: BiLogoHtml5,
    css3: BiLogoCss3,
    javascript: SiJavascript,
    react: FaReact,
    nextjs: SiNextdotjs,
    typescript: SiTypescript,
    tailwindcss: SiTailwindcss,
    redux: SiRedux,
    gsap: FaCode,
    nodejs: FaNodeJs,
    express: SiExpress,
    mongodb: SiMongodb,
    postgresql: SiPostgresql,
    mysql: SiMysql,
    firebase: SiFirebase,
    spring: FaServer,
    python: FaPython,
    java: FaJava,
    cplusplus: FaCode,
    csharp: FaCode,
    git: FaGitAlt,
    github: FaGithub,
    vscode: VscVscode,
    postman: SiPostman,
    figma: FaFigma,
    vercel: SiVercel,
    antigravity: SiGoogle,
};

// Icon colors
const iconColors = {
    html5: '#E34F26',
    css3: '#1572B6',
    javascript: '#F7DF1E',
    react: '#61DAFB',
    nextjs: '#ffffff',
    typescript: '#3178C6',
    tailwindcss: '#06B6D4',
    redux: '#764ABC',
    gsap: '#88CE02',
    nodejs: '#339933',
    express: '#ffffff',
    mongodb: '#47A248',
    postgresql: '#4169E1',
    mysql: '#4479A1',
    firebase: '#FFCA28',
    spring: '#6DB33F',
    python: '#3776AB',
    java: '#007396',
    cplusplus: '#00599C',
    csharp: '#512BD4',
    git: '#F05032',
    github: '#ffffff',
    vscode: '#007ACC',
    postman: '#FF6C37',
    figma: '#F24E1E',
    vercel: '#ffffff',
    antigravity: '#4285F4',
};

export default function Skills() {
    const { isDark } = useTheme();

    const categories = [
        { key: 'frontend', title: 'Frontend', emoji: '🎨' },
        { key: 'backend', title: 'Backend', emoji: '⚙️' },
        { key: 'languages', title: 'Languages', emoji: '💻' },
        { key: 'tools', title: 'Tools', emoji: '🛠️' },
    ];

    return (
        <section id="skills" className="section relative py-10 sm:py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6 sm:mb-10 md:mb-14"
                >
                    <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Technologies I work with to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl ${isDark
                                ? 'bg-dark-card border border-dark-border'
                                : 'bg-light-card border border-light-border'
                                }`}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 md:mb-5">
                                <span className="text-base sm:text-lg md:text-xl">{category.emoji}</span>
                                <h3 className={`text-sm sm:text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-1.5 sm:gap-2"
                            >
                                {skills[category.key]?.map((skill, index) => {
                                    const Icon = iconMap[skill.icon] || FaCode;
                                    const color = iconColors[skill.icon] || '#9CA3AF';

                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            className={`group relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-all duration-300 ${isDark
                                                ? 'bg-dark-surface hover:bg-dark-border'
                                                : 'bg-white hover:bg-light-border shadow-sm'
                                                }`}
                                        >
                                            <Icon
                                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110"
                                                style={{ color: isDark ? color : color }}
                                            />
                                            <span className={`text-[11px] sm:text-xs md:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
