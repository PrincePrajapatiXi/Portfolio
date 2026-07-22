import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Home } from "@/pages/Home";
import { Footer } from "@/layout/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { ClickExplosion } from "./components/ClickExplosion";
import { Preloader } from "./components/Preloader";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import { useState, lazy, Suspense } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          {/* Preloader */}
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
          
          <div className={`min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-white ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <NoiseOverlay />
            <ClickExplosion />
            <ScrollProgress />
            <CustomCursor />
            
            <Navbar />
            
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </AnimatePresence>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
