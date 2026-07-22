export const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] opacity-[0.035] overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" opacity="1" />
      </svg>
    </div>
  );
};
