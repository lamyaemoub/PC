"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatInterface from "@/components/fake-chat-interface";
import SlideDisplay from "@/components/slide-display";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Monitor, Calendar } from "lucide-react";

export default function LoopingAnimatedDemo() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [key, setKey] = useState(0); // Key to force re-render and restart animation
  const [chatResetKey, setChatResetKey] = useState(0); // Key to reset chat interface
  const [activeTab, setActiveTab] = useState<string>("live-demo");
  const loopRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up the animation loop
  useEffect(() => {
    // Force immediate refresh of the loop key to restart the animation cycle
    setKey((prev) => prev + 1);
    setChatResetKey((prev) => prev + 1);

    const animationDuration = 3000; // 3 seconds for the animation
    const uiDisplayDuration = 5000; // 12 seconds to show the actual UI (increased to see the full sequence)

    // Function to start a single cycle of the loop
    const startCycle = () => {
      // Show animation
      setShowAnimation(true);
      setIsAnimating(true);

      // After animation completes, show the UI
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }

      animationTimerRef.current = setTimeout(() => {
        setShowAnimation(false);
      }, animationDuration);

      // After UI has been shown, restart the loop
      if (loopRef.current) {
        clearTimeout(loopRef.current);
      }

      loopRef.current = setTimeout(() => {
        // Reset animation state completely
        setIsAnimating(false);
        setShowAnimation(true);

        // Use a small delay before starting the new animation
        if (resetTimerRef.current) {
          clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = setTimeout(() => {
          setKey((prevKey) => prevKey + 1); // Change key to force re-render
          setChatResetKey((prevKey) => prevKey + 1); // Reset chat interface
          setIsAnimating(true);

          // Start the next cycle to ensure infinite looping
          startCycle();
        }, 50);
      }, animationDuration + uiDisplayDuration);
    };

    // Start the infinite loop
    startCycle();

    // Clean up all timers on unmount
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Animation variants for the border drawing effect
  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.1,
          type: "spring",
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: i * 0.1, duration: 0.01 },
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      transition: {
        delay: 2.0 + i * 0.05,
        duration: 0.3,
      },
    }),
  };

  // Animation variants for the typing indicator dots
  const typingVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.3,
        repeat: 2,
        repeatType: "reverse" as const,
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Define the SVG paths for different UI components - lighter borders, no external container
  const uiComponents = [
    // First tab (Custom Demo) - individual tab without container
    {
      id: "tab-1",
      path: "M740,15 L850,15 L850,45 L740,45 Z", // Moved 50 units left
      strokeWidth: 0.8,
    },
    {
      id: "tab-2",
      path: "M870,15 L970,15 L970,45 L870,45 Z", // Moved 50 units left, kept 20px gap
      strokeWidth: 0.8,
    },
    // Chat interface container - NARROWER WIDTH
    {
      id: "chat-interface",
      path: "M30,70 L30,570 L350,570 L350,70 Z", // Reduced width from 480 to 350
      strokeWidth: 1.3,
    },
    // Demo panel container - WIDER to compensate
    {
      id: "demo-panel",
      path: "M370,70 L370,570 L970,570 L970,70 Z", // Adjusted to start at 370 instead of 500
      strokeWidth: 1.3,
    },
    // Video container in demo panel
    {
      id: "video-container",
      path: "M500,200 L500,400 L840,400 L840,200 Z", // Rectangle for video
      strokeWidth: 0.8,
    },
    // Play button triangle
    {
      id: "play-button",
      path: "M720,300 L650,260 L650,340 Z", // Triangle for play button
      strokeWidth: 0.8,
    },
    // Chat header
    {
      id: "chat-header",
      path: "M30,70 L30,120 L350,120 L350,70 Z", // Adjusted width
      strokeWidth: 0.8,
    },
    // Chat input area
    {
      id: "chat-input",
      path: "M30,520 L30,570 L350,570 L350,520 Z", // Adjusted width
      strokeWidth: 0.8,
    },
    // Message bubble 1
    {
      id: "message-1",
      path: "M50,140 C50,130 60,130 70,130 L180,130 C190,130 200,130 200,140 L200,190 C200,200 190,200 180,200 L70,200 C60,200 50,200 50,190 Z", // Adjusted position
      strokeWidth: 0.8,
    },
    // Avatar for message 1 (AI)
    {
      id: "avatar-1",
      path: "M40,165 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", // Moved right and made slightly smaller
      strokeWidth: 0.8,
    },
    // Circle at top of message 1
    {
      id: "message-1-circle",
      path: "M125,130 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", // Small circle at top of message
      strokeWidth: 0.6,
    },
    // Message bubble 2
    {
      id: "message-2",
      path: "M200,255 C200,250 210,250 220,250 L330,250 C340,250 350,250 350,255 L350,275 C350,280 340,280 330,280 L220,280 C210,280 200,280 200,275 Z", // Adjusted height
      strokeWidth: 0.8,
    },
    // Avatar for message 2 (User)
    {
      id: "avatar-2",
      path: "M330,265 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", // Moved left to fit inside chat interface
      strokeWidth: 0.8,
    },
    // Circle at top of message 2
    {
      id: "message-2-circle",
      path: "M275,230 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", // Small circle at top of message
      strokeWidth: 0.6,
    },
    // Message bubble 3
    {
      id: "message-3",
      path: "M50,340 C50,330 60,330 70,330 L180,330 C190,330 200,330 200,340 L200,390 C200,400 190,400 180,400 L70,400 C60,400 50,400 50,390 Z", // Adjusted position
      strokeWidth: 0.8,
    },
    // Avatar for message 3 (AI)
    {
      id: "avatar-3",
      path: "M40,365 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", // Moved right and made slightly smaller
      strokeWidth: 0.8,
    },
    // Circle at top of message 3
    {
      id: "message-3-circle",
      path: "M125,330 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", // Small circle at top of message
      strokeWidth: 0.6,
    },
    // Send button
    {
      id: "send-button",
      path: "M320,545 C320,535 330,535 330,535 C340,535 340,535 340,545 C340,555 340,555 330,555 C330,555 320,555 320,545 Z", // Adjusted position
      strokeWidth: 0.8,
    },
    // Demo title
    {
      id: "demo-title",
      path: "M390,90 L950,90",
      strokeWidth: 0.8,
    },
    // Demo item 1
    {
      id: "demo-item-1",
      path: "M390,120 L950,120 M390,150 L650,150",
      strokeWidth: 0.8,
    },
    // Demo item 2
    {
      id: "demo-item-2",
      path: "M390,450 L950,450 M390,480 L650,480",
      strokeWidth: 0.8,
    },
    // Demo navigation
    {
      id: "demo-nav",
      path: "M500,520 L840,520",
      strokeWidth: 0.8,
    },
    // Add a text input placeholder in the chat input area
    {
      id: "input-placeholder",
      path: "M60,545 L290,545", // Horizontal line representing text input
      strokeWidth: 0.8,
    },
  ];

  // Add a containment wrapper with overflow hidden to prevent page scrolling
  return (
    <div className="relative w-full max-w-full h-[780px] bg-white rounded-lg shadow-lg overflow-hidden mx-auto">
      {/* Actual UI content */}
      <div
        className={`transition-opacity ease-in-out duration-&lsqb;2500ms&rsqb; h-full ${showAnimation ? "opacity-0" : "opacity-100"}`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {" "}
          {/* Added overflow-hidden here */}
          {/* Tabs at the top */}
          <div className="flex justify-end w-full p-4">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-auto"
            >
              <TabsList className="bg-gray-100 p-1 md:p-2">
                <TabsTrigger
                  value="live-demo"
                  className="flex items-center gap-1 md:gap-2 px-2 py-1.5 text-sm sm:text-base cursor-pointer"
                >
                  <Monitor className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Custom Demo</span>
                  <span className="sm:hidden">Demo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="schedule-call"
                  disabled
                  className="flex items-center gap-1 md:gap-2 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-sm sm:text-base cursor-pointer"
                >
                  <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Book a Call</span>
                  <span className="sm:hidden">Book</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 h-full p-4 overflow-hidden">
            {" "}
            {/* Added overflow-hidden here */}
            {/* Chat section (left) */}
            <div className="w-full md:w-[430px] flex-shrink-0 bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md border border-gray-200 overflow-hidden transition-all duration-300">
              <ChatInterface
                key={chatResetKey} // Add key to force re-render and reset chat
                conversationId="demo-id"
                initialMessage={{
                  message: "Welcome to the demo!",
                  additional_data: { phase: "demonstration" },
                }}
                resetKey={chatResetKey} // Pass the reset key to the chat interface
              />
            </div>
            {/* Right panel */}
            <div className="w-full flex-grow bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md border border-gray-200 overflow-hidden transition-all duration-300">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="h-full"
              >
                <TabsContent value="live-demo" className="h-full m-0">
                  <SlideDisplay />
                </TabsContent>
                <TabsContent value="schedule-call" className="h-full m-0">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        Schedule a Demo
                      </h3>
                      <p className="text-gray-600">
                        Book a time with our team to see the product in action.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Animated borders overlay */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${
          showAnimation ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Use the key to force re-render and restart animation */}
          {uiComponents.map((component, i) => (
            <motion.path
              key={`${component.id}-${key}`} // Include the key to force re-render
              d={component.path}
              stroke="rgba(70, 85, 246, 0.7)" // Lighter blue color with transparency
              strokeWidth={component.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial="hidden"
              animate={isAnimating ? "visible" : "hidden"} // Reset to hidden when not animating
              custom={i}
              variants={borderVariants}
            />
          ))}

          {/* Typing indicator dots for message 3 */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`typing-dot-${i}-${key}`} // Include the key to force re-render
              cx={125 + i * 15}
              cy={370}
              r={3}
              fill="rgba(70, 85, 246, 0.7)"
              initial="hidden"
              animate={isAnimating ? "visible" : "hidden"}
              custom={i}
              variants={typingVariants}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
