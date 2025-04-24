import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  springConfig?: { stiffness: number; damping: number };
  opacity?: boolean;
  scale?: boolean;
}

export function ParallaxScroll({
  children,
  className,
  speed = 0.2,
  direction = "up",
  springConfig = { stiffness: 100, damping: 30 },
  opacity = false,
  scale = false,
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // Update measurements on mount or window resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = () => {
      const { top } = element.getBoundingClientRect();
      setElementTop(top + window.scrollY);
      setClientHeight(window.innerHeight);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // Calculate scroll progress
  const { scrollY } = useScroll();
  
  // Transform range from (elementTop - clientHeight) to (elementTop + element.height)
  // To output range of values for y or x based on direction
  const getRange = (motion: MotionValue<number>) => {
    const height = ref.current?.offsetHeight || 0;
    
    return useTransform(
      motion,
      [elementTop - clientHeight, elementTop + height],
      direction === "up" 
        ? [speed * 100, -speed * 100] 
        : direction === "down" 
          ? [-speed * 100, speed * 100]
          : direction === "left"
            ? [speed * 100, -speed * 100]
            : [-speed * 100, speed * 100]
    );
  };
  
  // Set up transforms based on direction
  const transformProp = direction === "up" || direction === "down" ? "y" : "x";
  const springMotion = useSpring(getRange(scrollY), springConfig);
  
  // Set up opacity if enabled
  const opacityMotion = opacity
    ? useTransform(
        scrollY,
        [elementTop - clientHeight, elementTop - clientHeight / 2, elementTop + clientHeight / 2],
        [0.6, 1, 0.6]
      )
    : 1;
  
  // Set up scale if enabled
  const scaleMotion = scale
    ? useTransform(
        scrollY,
        [elementTop - clientHeight, elementTop, elementTop + clientHeight],
        [0.8, 1, 0.8]
      )
    : 1;

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        [transformProp]: springMotion,
        opacity: opacityMotion,
        scale: scaleMotion,
      }}
    >
      {children}
    </motion.div>
  );
}