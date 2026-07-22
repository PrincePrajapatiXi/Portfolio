import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { GitHubStats } from "@/sections/GitHubStats";
import { Achievements } from "@/sections/Achievements";
import { Blog } from "@/sections/Blog";
import { Contact } from "@/sections/Contact";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GitHubStats />
      <Achievements />
      <Blog />
      <Contact />
    </motion.div>
  );
};
