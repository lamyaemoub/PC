import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsMoving(true);
      setPoints((prevPoints) => [
        ...prevPoints.slice(-15),
        {
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now(),
        },
      ]);

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {isMoving &&
          points.map((point, i) => {
            const size = 20 - (i * 20) / points.length;
            return (
              <motion.div
                key={point.timestamp}
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 0.5, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: point.x,
                  top: point.y,
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "hsl(var(--primary))",
                  borderRadius: "50%",
                  filter: "blur(2px)",
                }}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}