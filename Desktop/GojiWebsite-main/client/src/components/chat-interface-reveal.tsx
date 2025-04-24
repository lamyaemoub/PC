import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, User, Send, Clock, Calendar, CircleDollarSign, Target } from "lucide-react";
import { TypeWriter } from "./type-writer";

interface ChatInterfaceRevealProps {
  className?: string;
  finalImage?: string; // Optional final screenshot
  duration?: number; // in seconds
  delay?: number; // in seconds
  repeat?: boolean;
  onComplete?: () => void;
}

export function ChatInterfaceReveal({
  className = "",
  finalImage,
  duration = 4,
  delay = 0.5,
  repeat = true,
  onComplete
}: ChatInterfaceRevealProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFinalImage, setShowFinalImage] = useState(false);
  
  useEffect(() => {
    const startReveal = () => {
      setIsRevealing(true);
      setAnimationStep(0);
      setShowFinalImage(false);
      
      // Progress through animation steps
      const stepInterval = duration * 1000 / 7; // Total steps for the animation
      
      let step = 0;
      const stepTimer = setInterval(() => {
        step++;
        setAnimationStep(step);
        
        if (step >= 6) {
          clearInterval(stepTimer);
          
          // Show final image at the end if provided
          if (finalImage) {
            setTimeout(() => {
              setShowFinalImage(true);
              if (onComplete) setTimeout(onComplete, 1000);
            }, 500);
          } else if (onComplete) {
            setTimeout(onComplete, 500);
          }
          
          // Repeat if needed
          if (repeat) {
            setTimeout(() => {
              setIsRevealing(false);
              setTimeout(startReveal, 1000);
            }, 4000);
          }
        }
      }, stepInterval);
      
      return () => clearInterval(stepTimer);
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
  }, [delay, duration, repeat, isRevealing, finalImage, onComplete]);
  
  // Animation variants for different chat elements
  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const outlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.7,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  const typingIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0.3, 1, 0.3], 
      transition: { 
        repeat: Infinity,
        duration: 1.5
      }
    }
  };
  
  // Check if we should show each animation step
  const showHeader = animationStep >= 1;
  const showFirstMessage = animationStep >= 2;
  const showSecondMessage = animationStep >= 3;
  const showResponseTyping = animationStep >= 4;
  const showResponse = animationStep >= 5;
  const showInput = animationStep >= 6;
  
  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden rounded-lg shadow-2xl ${className}`}
      style={{ aspectRatio: "3/4", maxWidth: "500px" }}
    >
      {/* Drawing effect with final image */}
      {finalImage && showFinalImage && (
        <motion.div
          className="absolute inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={finalImage} 
            alt="Chat interface" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
      
      {/* The animated drawing effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial="hidden"
        animate={isRevealing ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } }
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Chat window outline */}
          <motion.rect 
            x="5%" y="5%" width="90%" height="90%" rx="12"
            stroke="currentColor" 
            strokeWidth="2"
            fill="none"
            variants={outlineVariants}
            filter="url(#glow)"
            className="text-primary"
          />
        </svg>
      </motion.div>
      
      {/* Chat interface */}
      <motion.div
        className="bg-background w-full h-full flex flex-col rounded-lg border overflow-hidden"
        initial="hidden"
        animate={isRevealing ? "visible" : "hidden"}
        variants={chatWindowVariants}
      >
        {/* Chat header */}
        <motion.div 
          className="p-4 border-b flex items-center gap-3 bg-background"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Goji Sales Assistant</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </motion.div>
        
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-accent/5">
          {/* First user message */}
          <motion.div
            className="flex items-start gap-3 max-w-[85%] ml-auto"
            initial="hidden"
            animate={showFirstMessage ? "visible" : "hidden"}
            variants={messageVariants}
          >
            <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none">
              <p className="text-sm">
                {showFirstMessage && "Hi, I'm interested in learning about your product capabilities."}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mt-1 shrink-0">
              <User className="h-4 w-4" />
            </div>
          </motion.div>
          
          {/* Second user message */}
          <motion.div
            className="flex items-start gap-3 max-w-[85%] ml-auto"
            initial="hidden"
            animate={showSecondMessage ? "visible" : "hidden"}
            variants={messageVariants}
          >
            <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none">
              <p className="text-sm">
                {showSecondMessage && "We're looking for a solution to qualify our product demo requests more efficiently."}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mt-1 shrink-0">
              <User className="h-4 w-4" />
            </div>
          </motion.div>
          
          {/* Typing indicator */}
          <motion.div
            className="flex items-start gap-3 max-w-[85%]"
            initial="hidden"
            animate={showResponseTyping && !showResponse ? "visible" : "hidden"}
            variants={messageVariants}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-card p-3 rounded-lg rounded-tl-none">
              <motion.div 
                className="flex gap-1"
                variants={typingIndicatorVariants}
              >
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Bot response */}
          <motion.div
            className="flex items-start gap-3 max-w-[85%]"
            initial="hidden"
            animate={showResponse ? "visible" : "hidden"}
            variants={messageVariants}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 shrink-0">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-card p-3 rounded-lg rounded-tl-none">
              {showResponse ? (
                <TypeWriter
                  text="Great to meet you! I'd be happy to tell you about how Goji can help qualify your demo requests using our BANT framework analysis. Would you like to start with a quick overview of our qualification capabilities?"
                  delay={30}
                  className="text-sm"
                />
              ) : (
                <p className="text-sm invisible">Placeholder</p>
              )}
            </div>
          </motion.div>
          
          {/* BANT icons appearing when response is shown */}
          <motion.div
            className="flex justify-center gap-6 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: showResponse ? 1 : 0, 
              y: showResponse ? 0 : 10 
            }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CircleDollarSign className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs mt-1">Budget</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs mt-1">Authority</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs mt-1">Need</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs mt-1">Timeline</span>
            </div>
          </motion.div>
        </div>
        
        {/* Chat input */}
        <motion.div 
          className="p-3 border-t flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showInput ? 1 : 0, y: showInput ? 0 : 20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex-1 bg-accent/10 rounded-full px-4 py-2 text-sm text-muted-foreground flex items-center">
            Type your message...
          </div>
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Send className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}