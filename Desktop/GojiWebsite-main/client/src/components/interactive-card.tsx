import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useHoverAnimation } from "@/hooks/use-hover-animation";
import { cn } from "@/lib/utils";
import { HTMLMotionProps } from "framer-motion";

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  floatOnHover?: boolean;
  tiltOnHover?: boolean;
  tiltDegree?: number;
  scaleOnHover?: number;
  hoverEffect?: "glow" | "lift" | "both" | "none";
}

export function InteractiveCard({
  children,
  className,
  glowOnHover = false,
  floatOnHover = false,
  tiltOnHover = false,
  tiltDegree = 5,
  scaleOnHover = 1.02,
  hoverEffect = "both",
  ...props
}: InteractiveCardProps) {
  const { isHovered, springScale, bindHoverEvents } = useHoverAnimation({
    scale: hoverEffect === "none" ? 1 : scaleOnHover,
  });

  // Determine if we should apply any effects
  const shouldGlow = glowOnHover || hoverEffect === "glow" || hoverEffect === "both";
  const shouldLift = floatOnHover || hoverEffect === "lift" || hoverEffect === "both";
  const shouldTilt = tiltOnHover;

  return (
    <motion.div
      style={{
        scale: shouldLift ? springScale : 1,
      }}
      className={cn(
        "transition-all duration-300",
        shouldGlow && isHovered && "shadow-lg shadow-primary/20",
        className
      )}
      {...bindHoverEvents}
      {...props}
    >
      <motion.div
        style={{
          rotateX: shouldTilt && isHovered ? -tiltDegree / 2 : 0,
          rotateY: shouldTilt && isHovered ? tiltDegree : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card
          className={cn(
            "transition-all duration-300 overflow-hidden",
            shouldGlow && isHovered && "border-primary/50"
          )}
        >
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function InteractiveCardHeader({ className, ...props }: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className={cn("transition-all", className)} {...props} />;
}

export function InteractiveCardContent({ className, ...props }: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={cn("transition-all", className)} {...props} />;
}

export function InteractiveCardFooter({ className, ...props }: React.ComponentProps<typeof CardFooter>) {
  return <CardFooter className={cn("transition-all", className)} {...props} />;
}