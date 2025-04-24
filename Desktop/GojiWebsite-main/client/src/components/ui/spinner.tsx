import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
}

export function Spinner({ className, size = "default", ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "default",
          "h-12 w-12": size === "lg",
        },
        className
      )}
      {...props}
    >
      <motion.div
        className={cn(
          "border-primary/30 border-t-primary rounded-full border-4",
          {
            "h-4 w-4": size === "sm",
            "h-8 w-8": size === "default",
            "h-12 w-12": size === "lg",
          }
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
