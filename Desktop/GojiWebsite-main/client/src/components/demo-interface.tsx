import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageSquare, Mic, Activity, Target, BadgeDollarSign, Clock, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypeWriter } from "@/components/type-writer";

interface DemoInterfaceProps {
  className?: string;
  delay?: number;
}

export function DemoInterface({ className, delay = 0 }: DemoInterfaceProps) {
  const [currentMode, setCurrentMode] = useState<"chat" | "voice">("chat");
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const demoChat = [
    { 
      message: "Hello! I'd like to know more about how your product handles our current pain points.", 
      isUser: true,
      slideIndex: 0, // Pain slide
    },
    { 
      message: "I'd be happy to explain. What specific challenges are you facing with your current demo process?", 
      isUser: false,
      slideIndex: 0, // Still on pain slide
    },
    { 
      message: "Our team spends too much time on manual demos, and the experience isn't consistent.", 
      isUser: true,
      slideIndex: 0, // Still on pain slide
    },
    { 
      message: "I understand. Our solution automates your demo process while maintaining personalization.", 
      isUser: false,
      slideIndex: 1, // Solution slide
    },
    { 
      message: "How does your pricing work? Do you have budget options?", 
      isUser: true,
      slideIndex: 2, // Budget slide
    },
    { 
      message: "We offer flexible pricing tiers starting at $1k/mo with volume discounts available.", 
      isUser: false,
      slideIndex: 2, // Budget slide
    },
    { 
      message: "And what's the implementation timeline?", 
      isUser: true,
      slideIndex: 3, // Timeline slide
    },
    { 
      message: "Our standard implementation takes 2 weeks, with full onboarding and training included.", 
      isUser: false,
      slideIndex: 3, // Timeline slide
    },
    { 
      message: "Great! What makes your solution different from competitors?", 
      isUser: true,
      slideIndex: 4, // Value slide
    },
    { 
      message: "We use advanced AI that learns from your demos to continuously improve. Our system also integrates with your existing CRM.", 
      isUser: false,
      slideIndex: 4, // Value slide
    }
  ];

  const slides = [
    { title: "Pain Points", icon: Activity, color: "text-rose-500", bgColor: "bg-rose-50" },
    { title: "Solution", icon: Lightbulb, color: "text-amber-500", bgColor: "bg-amber-50" },
    { title: "Budget", icon: BadgeDollarSign, color: "text-emerald-500", bgColor: "bg-emerald-50" },
    { title: "Timeline", icon: Clock, color: "text-sky-500", bgColor: "bg-sky-50" },
    { title: "Value", icon: Target, color: "text-violet-500", bgColor: "bg-violet-50" }
  ];

  // Effect to advance the chat and slides
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only start after the initial delay
      const chatAdvanceTimer = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentChatIndex(prev => {
            const newIndex = (prev + 1) % demoChat.length;
            // Update the slide when the AI is responding
            if (!demoChat[newIndex].isUser) {
              setCurrentSlide(demoChat[newIndex].slideIndex);
            }
            return newIndex;
          });
          setIsTyping(false);
          setTypingComplete(true);
        }, 1500);
      }, 4000);

      return () => clearInterval(chatAdvanceTimer);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // Effect to toggle between chat and voice modes
  useEffect(() => {
    const modeToggleTimer = setInterval(() => {
      setCurrentMode(prev => prev === "chat" ? "voice" : "chat");
    }, 15000); // Toggle every 15 seconds

    return () => clearInterval(modeToggleTimer);
  }, []);

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className={cn("flex overflow-hidden rounded-xl shadow-xl border h-[450px] w-full", className)}>
      {/* Left side - Chat/Voice interface */}
      <div className="w-1/2 border-r bg-background flex flex-col">
        {/* Chat header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">goji</span>
          </div>
          <div className="text-xs text-muted-foreground">Active now</div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-[400px]">
          {demoChat.slice(0, currentChatIndex + 1).map((chat, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                chat.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                  chat.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {idx === currentChatIndex && !chat.isUser && isTyping ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                  </div>
                ) : idx === currentChatIndex && !typingComplete ? (
                  <TypeWriter text={chat.message} delay={30} />
                ) : (
                  chat.message
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-3 border-t flex items-center gap-2">
          {currentMode === "chat" ? (
            <>
              <div className="flex-1 h-9 px-3 py-1 bg-muted rounded-md text-sm flex items-center text-muted-foreground">
                Type your message...
              </div>
              <button className="p-2 rounded-md bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 h-9 px-3 py-1 bg-muted rounded-md text-sm flex items-center justify-center gap-2 text-muted-foreground">
                <Mic className="h-4 w-4 text-primary animate-pulse" />
                Listening...
              </div>
              <button className="p-2 rounded-md bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
        
        {/* Mode tabs - simplified to just icons */}
        <div className="flex border-t justify-center py-1">
          <button 
            className={cn(
              "p-2 rounded-full mx-1",
              currentMode === "chat" ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground"
            )}
            onClick={() => setCurrentMode("chat")}
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button 
            className={cn(
              "p-2 rounded-full mx-1",
              currentMode === "voice" ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground"
            )}
            onClick={() => setCurrentMode("voice")}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right side - Dynamic visuals */}
      <div className="w-1/2 bg-background p-6 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div className={cn("rounded-lg shadow-sm border p-6 w-full max-w-[280px]", slides[currentSlide].bgColor)}>
              <div className="flex items-center mb-4">
                <div className="rounded-full p-3 mr-3">
                  <SlideIcon className={cn("h-8 w-8", slides[currentSlide].color)} />
                </div>
                <h3 className="text-lg font-semibold">{slides[currentSlide].title}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentSlide === 0 && "Identify pain points in current demo process"}
                {currentSlide === 1 && "AI-powered personalized demo automation"}
                {currentSlide === 2 && "Flexible pricing options for all team sizes"}
                {currentSlide === 3 && "Quick implementation with minimal disruption"}
                {currentSlide === 4 && "Superior ROI and integration capabilities"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}