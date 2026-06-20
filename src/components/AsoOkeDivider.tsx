import { motion } from 'motion/react';

export default function AsoOkeDivider() {
  return (
    <div className="relative w-full h-12 overflow-hidden bg-indigo-dye/20 py-2" id="aso-oke-divider">
      {/* Dynamic interlocking diagonal lines pattern representing loomed Aso-Oke warp and weft threads */}
      <div className="absolute inset-0 flex items-center justify-center opacity-65">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="asoOkePattern" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Warp threads - horizontal and diagonal cords in golden and terracotta hues */}
              <line x1="0" y1="10" x2="40" y2="10" stroke="#D4A843" strokeWidth="1.5" />
              <line x1="0" y1="30" x2="40" y2="30" stroke="#C4581F" strokeWidth="1.5" />
              
              {/* Overlocking weft stitching representing traditional loom rhythm */}
              <line x1="10" y1="0" x2="30" y2="40" stroke="#F7F0E3" strokeWidth="1.2" strokeDasharray="2 3" />
              <line x1="30" y1="0" x2="10" y2="40" stroke="#2D5A27" strokeWidth="1" strokeDasharray="3 2" />

              {/* Central horizontal alignment string */}
              <line x1="0" y1="20" x2="40" y2="20" stroke="#D4A843" strokeWidth="0.8" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#asoOkePattern)" />
        </svg>
      </div>

      {/* Overlaid sliding glowing pulse effect simulating active shuttle movement in a loom */}
      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-woven-gold/40 to-transparent pointer-events-none"
        animate={{
          left: ['-20%', '120%'],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
