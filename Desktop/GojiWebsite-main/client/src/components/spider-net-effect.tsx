import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface SpiderNetEffectProps {
  className?: string;
  color?: string;
  particleCount?: number;
  connectionDistance?: number;
  particleSpeed?: number;
  opacity?: number;
}

export function SpiderNetEffect({
  className = "",
  color = "#4856F6",
  particleCount = 70,
  connectionDistance = 150,
  particleSpeed = 0.6,
  opacity = 0.2
}: SpiderNetEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>();
  const speedMultiplier = useRef(particleSpeed);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Generate initial points
    const generatePoints = () => {
      const points: Point[] = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speedMultiplier.current,
          vy: (Math.random() - 0.5) * speedMultiplier.current,
          radius
        });
      }
      pointsRef.current = points;
    };
    
    generatePoints();
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move points and draw connections
      const points = pointsRef.current;
      
      // Update positions
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Move points
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) {
          point.vx = -point.vx;
        }
        
        if (point.y < 0 || point.y > canvas.height) {
          point.vy = -point.vy;
        }
        
        // Draw points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity * 0.8;
        ctx.fill();
      }
      
      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const point1 = points[i];
          const point2 = points[j];
          
          const dx = point1.x - point2.x;
          const dy = point1.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = color;
            
            // Fade connections by distance
            const alpha = opacity * (1 - distance / connectionDistance);
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Handle mouse interaction
      const handleMouseMove = (e: MouseEvent) => {
        // Create a temporary "attractor" point at mouse position
        const mousePoint = { 
          x: e.clientX, 
          y: e.clientY 
        };
        
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const dx = mousePoint.x - point.x;
          const dy = mousePoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance * 2) {
            // Draw connection to mouse
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(mousePoint.x, mousePoint.y);
            ctx.strokeStyle = color;
            
            // Fade connections by distance
            const alpha = opacity * 1.5 * (1 - distance / (connectionDistance * 2));
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            
            // Move points slightly towards mouse
            const angle = Math.atan2(dy, dx);
            const force = 0.1;
            point.vx += Math.cos(angle) * force;
            point.vy += Math.sin(angle) * force;
            
            // Limit velocity
            const maxSpeed = speedMultiplier.current * 1.5;
            const currentSpeed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
            if (currentSpeed > maxSpeed) {
              point.vx = (point.vx / currentSpeed) * maxSpeed;
              point.vy = (point.vy / currentSpeed) * maxSpeed;
            }
          }
        }
      };
      
      canvas.addEventListener("mousemove", handleMouseMove);
      
      requestRef.current = requestAnimationFrame(animate);
      
      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [color, particleCount, connectionDistance, particleSpeed, opacity]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed inset-0 -z-10 pointer-events-auto ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </motion.div>
  );
}