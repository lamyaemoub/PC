import { ButtonProps, Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useHoverAnimation } from "@/hooks/use-hover-animation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps extends ButtonProps {
  animateScale?: number;
  animateRotation?: number;
  clickEffect?: "ripple" | "pulse" | "bounce";
}

export function InteractiveButton({
  children,
  className,
  animateScale = 1.03,
  animateRotation = 0,
  clickEffect = "ripple",
  ...props
}: InteractiveButtonProps) {
  const { springScale, springRotation, bindHoverEvents } = useHoverAnimation({
    scale: animateScale,
    rotation: animateRotation,
  });
  
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // For ripple effect
    if (clickEffect === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        x,
        y,
        id: Date.now(),
      };
      
      setRipples([...ripples, newRipple]);
      
      // Clean up ripples after animation
      setTimeout(() => {
        setRipples((current) =>
          current.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);
    }
    
    // For pulse or bounce effects
    if (clickEffect === "pulse" || clickEffect === "bounce") {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    }
    
    // Call the original onClick if provided
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <motion.div
      style={{
        scale: springScale,
        rotate: springRotation,
      }}
      className="relative"
    >
      <Button
        {...props}
        {...bindHoverEvents}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden transition-colors",
          isClicked && clickEffect === "pulse" && "animate-pulse",
          isClicked && clickEffect === "bounce" && "animate-bounce",
          className
        )}
      >
        {children}
        
        {/* Ripple animations */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute block rounded-full bg-white/30 dark:bg-black/30 animate-ripple"
            style={{
              top: ripple.y - 40, // Center the ripple
              left: ripple.x - 40, // Center the ripple
              width: 80,
              height: 80,
            }}
          />
        ))}
      </Button>
    </motion.div>
  );
}