import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioAttempts, setAudioAttempts] = useState(0);
  const [, navigate] = useLocation();

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setIsOpen(true);
      localStorage.setItem("hasSeenIntro", "true");
    }
  }, []);

  const handleStartDemo = () => {
    setIsOpen(false);
    navigate("/demo");
  };

  const handleAudioRetry = () => {
    setAudioError(false);
    setIsLoading(true);
    setAudioAttempts(prev => prev + 1);
  };

  return
    // <Dialog open={isOpen} onOpenChange={setIsOpen}>
    //   <DialogContent 
    //     variant="chatbot" 
    //     className="bg-background border-primary/20"
    //   >
    //     <DialogTitle className="text-xl font-semibold">👋 Goji wants to talk with you!</DialogTitle>
    //     <div className="space-y-4">
    //       {isLoading && (
    //         <div className="flex justify-center py-4">
    //           <Spinner />
    //         </div>
    //       )}
    //       {!audioError && (
    //         <audio 
    //           key={`${audioAttempts}`}
    //           controls 
    //           className="w-full"
    //           onLoadStart={() => {
    //             console.log("Audio loading started");
    //             setIsLoading(true);
    //             setAudioError(false);
    //           }}
    //           onCanPlay={() => {
    //             console.log("Audio can play");
    //             setIsLoading(false);
    //           }}
    //           onError={(e) => {
    //             console.error("Audio loading error:", e);
    //             setAudioError(true);
    //             setIsLoading(false);
    //           }}
    //         >
    //           <source src="/api/welcome-audio" type="audio/mpeg" />
    //           <p>Your browser does not support the audio element.</p>
    //         </audio>
    //       )}
    //       {audioError && (
    //         <div className="space-y-2">
    //           <p className="text-sm text-destructive">
    //             Sorry, I couldn't load the audio message.
    //           </p>
    //           <Button
    //             variant="outline"
    //             size="sm"
    //             onClick={handleAudioRetry}
    //             className="w-full"
    //           >
    //             Retry Audio
    //           </Button>
    //         </div>
    //       )}
    //       <motion.div
    //         whileHover={{ scale: 1.02 }}
    //         whileTap={{ scale: 0.98 }}
    //       >
    //         <Button
    //           onClick={handleStartDemo}
    //           className="w-full gap-2 relative overflow-hidden group"
    //         >
    //           <motion.div
    //             className="absolute inset-0 bg-primary/20"
    //             initial={{ x: '-100%' }}
    //             whileHover={{ x: '100%' }}
    //             transition={{ duration: 0.5 }}
    //           />
    //           <span className="relative z-10">Start Demo</span>
    //           <MousePointerClick className="h-4 w-4 relative z-10" />
    //         </Button>
    //       </motion.div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
 
}