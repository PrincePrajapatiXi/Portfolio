import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Home } from "@/pages/Home";
import { CaseStudy } from "@/pages/CaseStudy";
import { Footer } from "@/layout/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { ClickExplosion } from "./components/ClickExplosion";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-white">
        <NoiseOverlay />
        <ClickExplosion />
        <ScrollProgress />
        <CustomCursor />
        
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:id" element={<CaseStudy />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
