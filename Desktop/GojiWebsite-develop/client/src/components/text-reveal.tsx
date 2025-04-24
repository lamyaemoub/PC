import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  splitBy?: "letter" | "word";
  animation?: "fade" | "slide" | "scale" | "wave";
  direction?: "up" | "down" | "left" | "right";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  once = true,
  splitBy = "letter",
  animation = "fade",
  direction = "up",
}: TextRevealProps) {
  // Split text into individual elements (letters or words)
  const items = splitBy === "letter" 
    ? text.split("") 
    : text.split(" ");
  
  // Handle empty space for letters
  const elements = splitBy === "letter" 
    ? items.map(item => item === " " ? "\u00A0" : item)
    : items;

  // Define animation variants based on the selected animation and direction
  const getVariants = () => {
    const baseVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    };

    let childVariants = {};

    switch (animation) {
      case "fade":
        childVariants = {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration }
          }
        };
        break;
      case "slide":
        const offset = direction === "up" ? 20 : direction === "down" ? -20 : direction === "left" ? 20 : -20;
        const axis = direction === "up" || direction === "down" ? "y" : "x";
        childVariants = {
          hidden: { opacity: 0, [axis]: offset },
          visible: { 
            opacity: 1, 
            [axis]: 0,
            transition: { duration }
          }
        };
        break;
      case "scale":
        childVariants = {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration }
          }
        };
        break;
      case "wave":
        childVariants = {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration,
              delay: staggerChildren * i
            }
          })
        };
        break;
    }

    return { container: baseVariants, child: childVariants };
  };

  const variants = getVariants();

  return (
    <motion.div
      className={cn("inline-flex flex-wrap", className)}
      variants={variants.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {elements.map((item, index) => (
        <motion.span
          key={index}
          className={splitBy === "word" ? "mr-[0.25em]" : ""}
          variants={variants.child}
          custom={index}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}