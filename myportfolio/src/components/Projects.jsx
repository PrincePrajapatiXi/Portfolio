import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { featuredProjects, allProjects } from '../data';

export default function Projects() {
    const { isDark } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);

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
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="projects" className="section relative py-10 sm:py-14 md:py-20">
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
                        Selected <span className="gradient-text">Projects</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Here are some of my best works that showcase my skills and passion for building exceptional web experiences.
                    </p>
                </motion.div>

                {/* Bento Grid - Fully Dynamic */}
                {featuredProjects.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-auto"
                    >
                        {featuredProjects.map((project) => {
                            // Dynamic column span based on size
                            const getColSpan = (size) => {
                                switch (size) {
                                    case 'large':
                                        return 'md:col-span-2';
                                    case 'full':
                                        return 'md:col-span-2 lg:col-span-3';
                                    case 'small':
                                    case 'medium':
                                    default:
                                        return '';
                                }
                            };

                            return (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    className={getColSpan(project.size)}
                                >
                                    <ProjectCard
                                        project={project}
                                        isDark={isDark}
                                        onClick={() => setSelectedProject(project)}
                                        isLarge={project.size === 'large' || project.size === 'full'}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    // Empty state when no projects
                    <div className={`text-center py-8 sm:py-12 md:py-16 rounded-xl sm:rounded-2xl ${isDark ? 'bg-dark-card' : 'bg-light-card'}`}>
                        <p className={`text-sm sm:text-base md:text-lg px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            No projects added yet. Add your projects in <code className="px-2 py-1 rounded bg-dark-surface text-xs sm:text-sm">src/data/index.js</code>
                        </p>
                    </div>
                )}

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-6 sm:mt-8 md:mt-12"
                >
                    <button
                        onClick={() => setShowAllProjects(true)}
                        className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 ${isDark
                            ? 'border-dark-border text-white hover:bg-dark-surface'
                            : 'border-light-border text-gray-900 hover:bg-light-card'
                            }`}
                    >
                        View All Projects
                    </button>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        isDark={isDark}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* All Projects Modal */}
            <AnimatePresence>
                {showAllProjects && (
                    <AllProjectsModal
                        projects={allProjects}
                        isDark={isDark}
                        onClose={() => setShowAllProjects(false)}
                        onSelectProject={setSelectedProject}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function ProjectCard({ project, isDark, onClick, isLarge }) {
    // If project has custom image, use that. Otherwise generate screenshot URL
    // Added waitForTimeout=3000 to wait 3 seconds for page to fully load
    const getImageUrl = () => {
        // Custom image takes priority
        if (project.image && project.image !== '') {
            return project.image;
        }
        // Generate screenshot with delay for dynamic sites
        if (project.liveUrl && project.liveUrl !== '#') {
            return `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&viewport.width=1280&viewport.height=800`;
        }
        return null;
    };

    const imageUrl = getImageUrl();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={`group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden h-full min-h-[200px] sm:min-h-[240px] md:min-h-[300px] ${isLarge ? 'min-h-[220px] sm:min-h-[280px] md:min-h-[360px]' : ''
                } ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-light-card border border-light-border'
                } transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
        >
            {/* Project Live Preview */}
            <div className={`h-28 sm:h-32 md:h-44 ${isLarge ? 'h-32 sm:h-40 md:h-52' : ''} relative overflow-hidden`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 ${isDark ? '' : 'from-primary-light/20 to-accent-light/20'
                    }`} />

                {/* Live Website Screenshot or Custom Image */}
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`${project.title} preview`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            // Hide image on error, show fallback
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    // Fallback: Show first letter
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-4xl sm:text-5xl md:text-6xl font-bold opacity-20 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {project.title.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 sm:pb-4">
                    <span className="text-white text-xs sm:text-sm font-medium">Click for details</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-6">
                <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                </h3>
                <p className={`text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full ${isDark
                                ? 'bg-dark-surface text-gray-300'
                                : 'bg-light-border text-gray-700'
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full ${isDark ? 'bg-dark-surface text-gray-400' : 'bg-light-border text-gray-500'
                            }`}>
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, isDark, onClose }) {
    // If project has custom image, use that. Otherwise generate screenshot URL with delay
    const getImageUrl = () => {
        if (project.image && project.image !== '') {
            return project.image;
        }
        if (project.liveUrl && project.liveUrl !== '#') {
            return `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&viewport.width=1280&viewport.height=800`;
        }
        return null;
    };

    const imageUrl = getImageUrl();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-dark-surface' : 'bg-white'
                    }`}
            >
                {/* Header with Live Screenshot */}
                <div className="relative h-56 bg-gradient-to-br from-primary/30 to-accent/30 overflow-hidden">
                    {/* Live Website Screenshot or Custom Image */}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={`${project.title} preview`}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            loading="lazy"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}

                    {/* Fallback Letter (shows behind image or when no URL) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-8xl font-bold opacity-20 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {project.title.charAt(0)}
                        </span>
                    </div>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform ${isDark ? 'bg-dark-card text-white hover:bg-dark-border' : 'bg-white text-gray-900 hover:bg-gray-100'
                            }`}
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                    </h2>
                    <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-4 py-2 text-sm rounded-lg ${isDark
                                        ? 'bg-dark-card text-gray-200'
                                        : 'bg-light-card text-gray-700'
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <FiExternalLink size={18} />
                            Live Demo
                        </a>
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl border-2 transition-colors ${isDark
                                ? 'border-dark-border text-white hover:bg-dark-card'
                                : 'border-light-border text-gray-900 hover:bg-light-card'
                                }`}
                        >
                            <FiGithub size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function AllProjectsModal({ projects, isDark, onClose, onSelectProject }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-dark-surface' : 'bg-white'
                    }`}
            >
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            All Projects
                        </h2>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className={`p-2 rounded-full cursor-pointer hover:scale-110 transition-transform ${isDark ? 'bg-dark-card text-white hover:bg-dark-border' : 'bg-light-card text-gray-900 hover:bg-light-border'
                                }`}
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => {
                                    onClose();
                                    onSelectProject(project);
                                }}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isDark
                                    ? 'bg-dark-card hover:bg-dark-border'
                                    : 'bg-light-card hover:bg-light-border'
                                    }`}
                            >
                                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {project.title}
                                </h3>
                                <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
