import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";

interface FloatingAIButtonProps {
  className?: string;
}

export function FloatingAIButton({ className }: FloatingAIButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { expandChat } = useChat();

  // Handle click event to expand chat interface
  const handleClick = () => {
    // Use the global chat context to expand the chat interface
    expandChat();
  };

  return
  //   <motion.div
  //     className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}
  //     initial={{ scale: 0, opacity: 0 }}
  //     animate={{ scale: 1, opacity: 1 }}
  //     transition={{
  //       type: "spring",
  //       stiffness: 260,
  //       damping: 20,
  //       delay: 1
  //     }}
  //   >
  //     {/* Animated contour ring with AI colors */}
  //     <div className="absolute -inset-1.5 rounded-full overflow-hidden">
  //       <motion.div 
  //         className="w-full h-full"
  //         style={{
  //           background: `conic-gradient(
  //             from 0deg,
  //             rgb(59, 130, 246),   /* bright blue */
  //             rgb(139, 92, 246),   /* bright purple */
  //             rgb(236, 72, 153),   /* bright pink */
  //             rgb(255, 255, 255),  /* white */
  //             rgb(59, 130, 246)    /* back to bright blue */
  //           )`
  //         }}
  //         animate={{ 
  //           rotate: 360 
  //         }}
  //         transition={{ 
  //           duration: isHovered ? 1.5 : 3,
  //           ease: "linear",
  //           repeat: Infinity,
  //           repeatType: "loop"
  //         }}
  //       />
  //     </div>
      
  //     {/* Main button with subtle gradient */}
  //     <motion.div
  //       animate={{ 
  //         scale: [1, 1.03, 1],
  //       }}
  //       transition={{
  //         duration: 4,
  //         ease: "easeInOut",
  //         repeat: Infinity,
  //       }}
  //       whileHover={{ scale: 1.08 }}
  //       whileTap={{ scale: 0.95 }}
  //       className="relative w-11 h-11 rounded-full shadow-lg overflow-hidden cursor-pointer"
  //       onClick={handleClick}
  //       onHoverStart={() => setIsHovered(true)}
  //       onHoverEnd={() => setIsHovered(false)}
  //     >
  //       {/* Tooltip that appears on hover */}
  //       <AnimatePresence>
  //         {isHovered && (
  //           <motion.div 
  //             className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1.5 shadow-md whitespace-nowrap text-sm font-medium"
  //             initial={{ opacity: 0, y: 10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             exit={{ opacity: 0, y: 5 }}
  //             transition={{ duration: 0.2 }}
  //           >
  //             Chat with Goji
  //             <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>

  //       {/* Inner white background */}
  //       <div className="absolute inset-0 rounded-full bg-white" />
        
  //       {/* Gradient background with shimmer - brighter on hover */}
  //       <motion.div 
  //         className={`absolute inset-0 rounded-full ${isHovered ? 'opacity-70' : 'opacity-40'} bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200`}
  //         animate={{
  //           backgroundPosition: ['0% 0%', '100% 100%'],
  //         }}
  //         transition={{
  //           duration: isHovered ? 5 : 8, // Faster animation on hover
  //           repeat: Infinity,
  //           repeatType: "mirror",
  //           ease: "linear"
  //         }}
  //         style={{
  //           backgroundSize: '200% 200%',
  //         }}
  //       />
  //     </motion.div>
  //   </motion.div>
  // );
}