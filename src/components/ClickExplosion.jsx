import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_COUNT = 8;

export const ClickExplosion = () => {
    const [explosions, setExplosions] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const id = Date.now();
            const newExplosion = {
                id,
                x: e.clientX,
                y: e.clientY,
                particles: Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
                    id: i,
                    angle: (i / PARTICLE_COUNT) * 2 * Math.PI,
                    distance: 30 + Math.random() * 50,
                })),
            };

            setExplosions((prev) => [...prev, newExplosion]);
            setTimeout(() => {
                setExplosions((prev) => prev.filter((ex) => ex.id !== id));
            }, 800);
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[10001] overflow-hidden">
            <AnimatePresence>
                {explosions.map((ex) => (
                    <div key={ex.id} className="absolute" style={{ left: ex.x, top: ex.y }}>
                        {ex.particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute w-1 h-1 bg-primary rounded-full"
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    x: Math.cos(p.angle) * p.distance,
                                    y: Math.sin(p.angle) * p.distance,
                                    opacity: 0,
                                    scale: 0.5,
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        ))}
                        {/* Instant ring shockwave */}
                        <motion.div
                            className="absolute rounded-full border border-primary/30"
                            initial={{ width: 0, height: 0, opacity: 0.5, x: 0, y: 0 }}
                            animate={{ width: 120, height: 120, opacity: 0, x: -60, y: -60 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};
