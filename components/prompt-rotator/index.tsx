"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPT_EXAMPLES = [
  "I want to go Umrah with my wife next month",
  "Find me a 7-day Umrah trip for October half term",
  "Take me and my parents to Makkah in December",
  "Show me the cheapest Umrah package from Manchester",
  "I want to go for 10 days in Ramadan, from New York",
  "Help me book a 5-star Umrah in January",
  "I want to visit Makkah and Madinah with a Ziyarah tour",
];

export function PromptRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textRef = useRef<HTMLSpanElement>(null);

  const currentPrompt = PROMPT_EXAMPLES[currentIndex];

  useEffect(() => {
    if (isFocused) return; // Don't animate when input is focused

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentPrompt.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
        }, 50); // Typing speed
      } else {
        // Wait before starting to delete
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30); // Deleting speed
      } else {
        // Move to next prompt
        setCurrentIndex((prev) => (prev + 1) % PROMPT_EXAMPLES.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentPrompt, isTyping, isFocused]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        {/* Hidden input for actual functionality */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-input rounded-full bg-background 
                     focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300
                     text-transparent caret-transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled
        />

        {/* Visible text overlay */}
        <div className="absolute inset-0 flex items-center px-6 py-4 pointer-events-none">
          <div className="flex items-center text-lg">
            {isFocused ? (
              <span className="text-foreground">
                {inputValue}
                {inputValue === "" && (
                  <span className="text-muted-foreground/70">
                    Describe your ideal Umrah trip...
                  </span>
                )}
              </span>
            ) : (
              <>
                <span ref={textRef} className="text-muted-foreground/70">
                  {displayText}
                </span>
                {/* Typing cursor positioned right after the text */}
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "reverse",
                    }}
                    className="inline-block w-0.5 h-6 bg-foreground ml-0.5"
                  />
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
