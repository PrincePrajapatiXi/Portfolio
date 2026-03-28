import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";
import { useEffect } from "react";

// This would normally come from a CMS or data file
const projectsData = {
  "1": {
    title: "Eco-Track Dashboard",
    description: "A comprehensive sustainability tracking platform...",
    image: "/images/project1.jpg",
    tags: ["React", "Express", "Chart.js"],
    challenge: "Processing large real-time datasets without compromising UI performance.",
    solution: "Implemented Web Workers for heavy computations and optimized React rendering cycles.",
    results: "30% faster load times and 100% user satisfaction in initial trials.",
    links: { github: "#", live: "#" }
  },
  // Add more as needed
};

export const CaseStudy = () => {
  const { id } = useParams();
  const project = projectsData[id] || projectsData["1"]; // Fallback

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </Link>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Column: Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{project.title}</h1>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
             <div className="space-y-4">
               <h3 className="text-xl font-bold text-white">The Challenge</h3>
               <p>{project.challenge}</p>
             </div>
             <div className="space-y-4">
               <h3 className="text-xl font-bold text-white">The Solution</h3>
               <p>{project.solution}</p>
             </div>
             <div className="space-y-4">
               <h3 className="text-xl font-bold text-white">Results</h3>
               <p className="p-6 glass rounded-2xl border border-white/5">{project.results}</p>
             </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="h-14 px-8 group">
              View Live Site <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" className="h-14 px-8">
              Source Code <Github className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="space-y-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-[3rem] overflow-hidden border border-white/10 glass shadow-2xl"
          >
            <img src={project.image} alt={project.title} className="w-full object-cover" />
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 glass rounded-[2rem] border border-white/5" />
            <div className="h-40 glass rounded-[2rem] border border-white/5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
