import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useHoverAnimation } from "@/hooks/use-hover-animation";

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  animation?: "pulse" | "float" | "spin" | "bounce" | "wobble" | "none";
  color?: string;
  hoverEffect?: boolean;
  strokeWidth?: number;
}

export function AnimatedIcon({
  icon: Icon,
  className,
  size = 24,
  animation = "none",
  color,
  hoverEffect = false,
  strokeWidth = 2,
}: AnimatedIconProps) {
  const { springScale, springRotation, bindHoverEvents } = useHoverAnimation({
    scale: hoverEffect ? 1.15 : 1,
    rotation: animation === "wobble" ? 5 : 0,
  });

  // Animation variants based on the selected animation type
  const getAnimationClass = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse";
      case "float":
        return "animate-float";
      case "spin":
        return "animate-spin";
      case "bounce":
        return "animate-bounce";
      default:
        return "";
    }
  };

  return (
    <motion.div
      style={{
        scale: hoverEffect ? springScale : 1,
        rotate: hoverEffect && animation === "wobble" ? springRotation : 0,
      }}
      className={cn("inline-flex", getAnimationClass())}
      {...(hoverEffect ? bindHoverEvents : {})}
    >
      <Icon
        className={className}
        width={size}
        height={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </motion.div>
  );
}