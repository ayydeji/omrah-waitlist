"use client";

import { motion } from "framer-motion";

export function HeroText() {
  return (
    <div className="text-center space-y-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-wide">
          omrah.
        </h1>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight max-w-4xl mx-auto">
          Find your next Umrah trip{" "}
          <span className="italic font-light">in one sentence</span>
        </h2>
      </motion.div>
    </div>
  );
}