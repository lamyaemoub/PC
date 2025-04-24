import { useMotionValue, useSpring, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";

interface UseHoverAnimationProps {
  scale?: number;
  rotation?: number;
  duration?: number;
}

export const useHoverAnimation = ({
  scale = 1.05,
  rotation = 0,
  duration = 0.3,
}: UseHoverAnimationProps = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create motion values
  const motionScale = useMotionValue(1);
  const motionRotation = useMotionValue(0);
  
  // Create springs for smooth animation
  const springScale = useSpring(motionScale, { duration: duration * 1000, bounce: 0.2 });
  const springRotation = useSpring(motionRotation, { duration: duration * 1000, bounce: 0.2 });

  // Update motion values based on hover state
  useEffect(() => {
    if (isHovered) {
      motionScale.set(scale);
      motionRotation.set(rotation);
    } else {
      motionScale.set(1);
      motionRotation.set(0);
    }
  }, [isHovered, scale, rotation, motionScale, motionRotation]);

  const bindHoverEvents = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  };

  return {
    isHovered,
    springScale,
    springRotation,
    bindHoverEvents,
  };
};