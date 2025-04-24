import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DrawingRevealProps {
  finalImage: string;
  wireframeImage: string; // Optional outlines/wireframe version
  className?: string;
  duration?: number; // in seconds
  delay?: number; // in seconds
  repeat?: boolean;
}

export function DrawingReveal({
  finalImage,
  wireframeImage,
  className = "",
  duration = 2.5,
  delay = 0.5,
  repeat = false
}: DrawingRevealProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const startReveal = () => {
      setIsRevealing(true);
      
      if (repeat) {
        const timer = setTimeout(() => {
          setIsRevealing(false);
          // Brief pause before restarting animation
          setTimeout(() => startReveal(), 1000);
        }, duration * 1000);
        
        return () => clearTimeout(timer);
      }
    };
    
    // Initial animation start with delay
    const initialTimer = setTimeout(startReveal, delay * 1000);
    
    // Observer to restart animation when element comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isRevealing && repeat) {
          startReveal();
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      clearTimeout(initialTimer);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, duration, repeat, isRevealing]);
  
  // Variants for the drawing effect
  const drawingVariants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        duration: duration,
        ease: "easeInOut",
      },
    },
  };
  
  const wireframeVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 0.8, 0.6, 0.3, 0],
      transition: {
        duration: duration * 0.7, // Wireframe fades out before final image completes
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.7, 1]
      },
    },
  };
  
  // Interface elements that get revealed one by one
  const interfaceElements = [
    { delay: 0.1, duration: 0.5 },    // Header
    { delay: 0.3, duration: 0.5 },    // Sidebar
    { delay: 0.6, duration: 0.6 },    // Main content
    { delay: 1.0, duration: 0.5 },    // Charts/graphics
    { delay: 1.4, duration: 0.5 },    // Buttons/controls
    { delay: 1.8, duration: 0.4 }     // Details/text
  ];
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Wireframe/outline version that appears first */}
      {wireframeImage && (
        <motion.div
          className="absolute inset-0 z-10"
          initial="hidden"
          animate={isRevealing ? "visible" : "hidden"}
          variants={wireframeVariants}
        >
          <img 
            src={wireframeImage} 
            alt="Product wireframe" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
      
      {/* Final screenshot revealed progressively */}
      <motion.div
        className="relative z-20"
        initial="hidden"
        animate={isRevealing ? "visible" : "hidden"}
        variants={drawingVariants}
      >
        <img 
          src={finalImage} 
          alt="Product screenshot" 
          className="w-full h-full object-contain"
        />
        
        {/* Overlay elements that build up the interface piece by piece */}
        <div className="absolute inset-0 pointer-events-none">
          {interfaceElements.map((element, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 bg-transparent"
              initial={{ opacity: 0 }}
              animate={isRevealing ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: element.delay,
                duration: element.duration,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Decorative elements to enhance the drawing effect */}
      <motion.div 
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isRevealing ? { opacity: [0, 0.2, 0] } : { opacity: 0 }}
        transition={{ duration: duration * 0.8, ease: "easeInOut" }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* SVG drawing effects that follow the reveal animation */}
          <motion.path 
            d="M0,0 L100,100" 
            stroke="var(--primary)" 
            strokeWidth="2"
            strokeDasharray="5,5"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isRevealing ? { pathLength: 1, opacity: [0, 0.5, 0] } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: duration * 0.6, delay: 0.2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}