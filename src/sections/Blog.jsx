import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";

const blogPosts = [
  {
    title: "How I Built My Portfolio from Scratch with React & Tailwind",
    excerpt: "A deep dive into the design decisions, animations, and architecture behind this very portfolio you're looking at.",
    date: "July 2026",
    readTime: "5 min read",
    tags: ["React", "Tailwind CSS", "Web Dev"],
    slug: "#",
    featured: true,
  },
  {
    title: "Why I Chose the MERN Stack as a Self-Taught Developer",
    excerpt: "My journey from HTML basics to building full-stack apps, and why MongoDB, Express, React, and Node.js clicked for me.",
    date: "June 2026",
    readTime: "4 min read",
    tags: ["MERN", "Learning", "Career"],
    slug: "#",
    featured: false,
  },
  {
    title: "5 Lessons from Building an E-Commerce Site as a Student",
    excerpt: "Real challenges I faced building Catchy Store — from payment integration to responsive design.",
    date: "May 2026",
    readTime: "6 min read",
    tags: ["E-Commerce", "React", "Tips"],
    slug: "#",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Blog = () => {
  return (
    <section id="blog" className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-wider uppercase text-xs md:text-sm"
            >
              Thoughts & Insights
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl lg:text-6xl font-bold mt-2 md:mt-4"
            >
              From my{" "}
              <span className="text-muted-foreground font-serif italic font-normal">coding journal.</span>
            </motion.h2>
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 md:gap-6"
        >
          {blogPosts.map((post, idx) => (
            <motion.a
              key={idx}
              variants={itemVariants}
              href={post.slug}
              className={`group glass-strong rounded-2xl md:rounded-[2rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col ${
                post.featured ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Content */}
              <div className="p-5 md:p-8 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] md:text-xs font-medium text-primary/80 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.featured && (
                    <span className="text-[10px] md:text-xs font-bold text-yellow-500 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
