"use client";

import { motion } from "framer-motion";
import { Plane, MapPin } from "lucide-react";

export function ItineraryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
      animate={{ opacity: 0.4, rotate: 6, scale: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="w-[320px] rounded-xl bg-background/90 
                 backdrop-blur-sm shadow-lg p-6 border border-black/10
                 hover:opacity-90 hover:rotate-0 hover:scale-105 
                 transition-all duration-500 cursor-pointer z-10"
    >
      {/* Card label */}
      <div
        className="absolute -top-3 left-4 px-3 py-1 bg-background text-foreground 
                      border-2 border-black text-xs font-medium rounded-full shadow-sm"
      >
        Example Itinerary
      </div>

      <div className="space-y-4">
        {/* Trip title */}
        <h3 className="text-lg font-semibold text-foreground">
          7-Day Couple's Umrah – October
        </h3>

        {/* Flights */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Plane className="w-4 h-4" />
            <span>London ✈ Jeddah – Oct 5</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Plane className="w-4 h-4 rotate-180" />
            <span>Jeddah ✈ London – Oct 12</span>
          </div>
        </div>

        {/* Hotel */}
        <div className="bg-background/50 border border-black/5 rounded-lg p-3">
          <h4 className="font-medium text-foreground">Pullman Zamzam Makkah</h4>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>150m from Haram</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              £68/night
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <span className="text-lg font-bold text-foreground">
            From £985 <span className="text-sm font-normal">per person</span>
          </span>
        </div>

        {/* CTA */}
        <button
          className="w-full py-2 px-4 text-sm font-medium bg-background text-foreground 
                          border-2 border-black rounded-full hover:bg-foreground hover:text-background 
                          transition-all duration-300"
        >
          See full itinerary →
        </button>
      </div>

      {/* AI tag */}
      <div
        className="absolute -bottom-2 -right-2 px-2 py-1 
                      bg-background text-foreground border-2 border-black text-xs font-medium 
                      rounded-full shadow-sm"
      >
        AI Optimized
      </div>
    </motion.div>
  );
}
