import { Button } from "@/components/Button";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { soundManager } from "@/lib/SoundManager";

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    if (Math.abs(distanceX) < 50 && Math.abs(distanceY) < 50) {
      x.set(distanceX * 0.4);
      y.set(distanceY * 0.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundManager.enabled && soundManager.play("hover")}
      onClick={() => soundManager.enabled && soundManager.play("click")}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false); // Default false for privacy

  useEffect(() => {
    setSoundOn(soundManager.enabled);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
    if (newState) soundManager.play("click");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled ? "glass-strong py-3 backdrop-blur-xl" : "bg-transparent py-5"
      }  z-50`}
    >
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Magnetic>
            <a
              href="/"
              className="text-xl font-bold tracking-tight hover:text-primary transition-all flex items-center gap-1 group"
            >
              PRINCE<span className="text-primary group-hover:scale-150 transition-transform">.</span>
            </a>
          </Magnetic>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex flex-none items-center">
          <div className="glass rounded-full px-2 py-1.5 flex items-center gap-1 border border-white/5 shadow-2xl">
            {navLinks.map((link, index) => (
              <Magnetic key={index}>
                <a
                  href={link.href}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary rounded-full hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
             <div className="w-px h-6 bg-white/10 mx-2" />
             
             {/* Sound Toggle */}
             <Magnetic>
               <button
                 onClick={toggleSound}
                 className={`p-2.5 rounded-full transition-all duration-300 ${soundOn ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-muted-foreground border-white/10'} border`}
                 aria-label="Toggle sound"
               >
                 {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
               </button>
             </Magnetic>

             <Magnetic>
               <Button size="sm" href="#contact" className="px-6 rounded-full shadow-lg shadow-primary/20">Contact Me</Button>
             </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
             <button onClick={toggleSound} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
             </button>
             <button
               className="p-2 text-foreground cursor-pointer hover:bg-white/5 rounded-xl transition-all"
               onClick={() => {
                  setIsMobileMenuOpen((prev) => !prev);
                  if (soundOn) soundManager.play("transition");
               }}
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in h-[100vh]">
          <div className="container mx-auto px-6 py-12 flex flex-col gap-6 items-center">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => {
                   setIsMobileMenuOpen(false);
                   if (soundOn) soundManager.play("click");
                }}
                onMouseEnter={() => { if (soundOn) soundManager.play("hover"); }}
                className="text-2xl font-medium text-muted-foreground hover:text-primary py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" onClick={() => setIsMobileMenuOpen(false)} size="lg" className="w-full mt-4">
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};