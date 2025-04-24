import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypeWriter({ text, delay = 100, className = "", onComplete }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    // Delay before starting the typing animation
    const startDelay = setTimeout(() => {
      setShouldStart(true);
    }, 1000); // 1 second delay before starting

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!shouldStart) return;

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, onComplete, shouldStart]);

  return (
    <AnimatePresence>
      {shouldStart && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={className}
          style={{fontStyle: 'italic'}} // Added italic style here
        >
          {displayText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block"
            >
              |
            </motion.span>
          )}
        </motion.span>
      )}
    </AnimatePresence>
  );
}