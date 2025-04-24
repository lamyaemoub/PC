"use client"

import { useState, useEffect, useRef } from "react"
import { useSlideStore } from "@/lib/slide-store"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SlideDisplayProps {
  onVideoPlaybackChange?: (isPlaying: boolean) => void
}

export default function SlideDisplay({ onVideoPlaybackChange }: SlideDisplayProps) {
  const { slides, currentSlideIndex, setCurrentSlideIndex, currentScenarioIndex, nextScenario } = useSlideStore()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showingAnimation, setShowingAnimation] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scenarioTransitionTimer = useRef<NodeJS.Timeout | null>(null)
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000); // or 640, 480, etc. depending on your breakpoint
    };

    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get the appropriate title based on the scenario index
  const getScenarioTitle = () => {
    switch (currentScenarioIndex) {
      case 0:
        return "Goji AI Capabilities";
      case 1:
        return "Use Case: Enterprise Solution Qualification";
      case 2:
        return "Goji's impact: increased conversions and shorter sales cycles";
      case 3:
        return "Goji AI Setup";
      default:
        return "Goji AI Demo";
    }
  }

  // Function to navigate to the next slide
  const nextSlide = () => {
    if (slides.length > 0 && currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  // Function to navigate to the previous slide
  const prevSlide = () => {
    if (slides.length > 0 && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  // Check if the current slide is a video
  const isVideo = slides[currentSlideIndex]?.url?.endsWith(".mp4")
  
  // Debug: Log current slide for troubleshooting
  useEffect(() => {
    console.log('Current scenario:', currentScenarioIndex, 'Current slide:', slides[currentSlideIndex])
  }, [currentScenarioIndex, currentSlideIndex, slides])
  
  // Function to transition to next scenario with animation
  const transitionToNextScenario = () => {
    // First show the animation
    console.log('Showing transition animation between scenarios');
    setShowingAnimation(true);
    
    // After 3 seconds of animation, move to the next scenario
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    
    animationTimerRef.current = setTimeout(() => {
      setShowingAnimation(false);
      console.log('Animation completed, advancing to next scenario');
      nextScenario();
    }, 3000); // 3 seconds of animation
  };
  
  // Show animation when scenario changes
  useEffect(() => {
    // When the scenario first loads, show animation briefly
    if (!showingAnimation && slides.length > 0) {
      console.log('New scenario loaded, showing initial animation');
      setShowingAnimation(true);
      
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      
      // Show animation briefly, then hide it
      animationTimerRef.current = setTimeout(() => {
        setShowingAnimation(false);
        console.log('Initial animation completed');
      }, 1000); // Show animation for 1 second when first loading a scenario
    }
  }, [currentScenarioIndex]);
  
  // Listen for chat completion events
  useEffect(() => {
    const handleChatMessageCompleted = (event: CustomEvent) => {
      console.log('Received chat message completed event', event.detail);
      // Start the transition animation when the chat message completes
      transitionToNextScenario();
    };

    // Add event listener for chat completion
    window.addEventListener('chatMessageCompleted', handleChatMessageCompleted as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('chatMessageCompleted', handleChatMessageCompleted as EventListener);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);
  
  // For image slides, automatically advance to next scenario after 4 seconds
  // Only do this if we're not showing the animation
  useEffect(() => {
    let imageTransitionTimer: NodeJS.Timeout | null = null;
    
    // If this is an image slide (not a video) and we're not showing animation
    if (slides.length > 0 && !isVideo && !showingAnimation) {
      console.log('Setting image auto-advance timer for 4 seconds');
      imageTransitionTimer = setTimeout(() => {
        console.log('Advancing to next scenario from image slide');
        transitionToNextScenario();
      }, 4000); // 4 seconds for image slides
    }
    
    // Clean up timer on unmount or when slide changes
    return () => {
      if (imageTransitionTimer) {
        clearTimeout(imageTransitionTimer);
      }
    };
  }, [slides, currentSlideIndex, isVideo, showingAnimation]);

  // Handle video playback state changes
  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
    if (onVideoPlaybackChange) {
      onVideoPlaybackChange(true)
    }
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
    if (onVideoPlaybackChange) {
      onVideoPlaybackChange(false)
    }
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
    if (onVideoPlaybackChange) {
      onVideoPlaybackChange(false)
    }
    
    console.log('Video ended, preparing to show animation and transition to next scenario');
    
    // After video ends, set a timer and then show animation before transitioning
    // This gives viewers time to read the caption and view the end frame
    if (scenarioTransitionTimer.current) {
      clearTimeout(scenarioTransitionTimer.current)
    }
    
    scenarioTransitionTimer.current = setTimeout(() => {
      // Start the animation and transition process
      transitionToNextScenario();
    }, 2000) // 2 seconds delay after video ends before showing animation
  }

  // Reset video state when slides change
  useEffect(() => {
    if (videoRef.current) {
      if (isVideo) {
        // If it's a video slide, play it
        videoRef.current.currentTime = 0
        videoRef.current.play().catch((err) => console.error("Error playing video:", err))
      } else {
        // If it's not a video slide, make sure we report not playing
        setIsVideoPlaying(false)
        if (onVideoPlaybackChange) {
          onVideoPlaybackChange(false)
        }
      }
    }
  }, [currentSlideIndex, slides, isVideo, onVideoPlaybackChange])

  // Default content when no slides are available
  if (!slides || slides.length === 0) {
    return (
      <div className="flex flex-col h-full goji-animation">
        <div className="p-3 sm:p-4 md:p-5 border-b border-gray-200">
          <div className="font-medium text-base sm:text-lg">{getScenarioTitle()}</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
          <div className="mb-6">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="AI Agent"
              className="mx-auto w-[100px] h-[100px]"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">An AI Agent</h2>
          <p className="text-gray-600 mb-8 max-w-md">Built for your product & sales motion</p>

          <div className="w-full max-w-md border-t border-gray-200 pt-8 mt-4"></div>

          <div className="mb-6 mt-4">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="Engagement"
              className="mx-auto w-[100px] h-[100px]"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Engagement & Qualification on Autopilot</h2>
          <p className="text-gray-600 mb-8 max-w-md">AI captures & converts visitors</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 md:p-5 border-b border-gray-200">
        <div className="font-medium text-base sm:text-lg">{getScenarioTitle()}</div>
      </div>

      <div className="flex-1 relative flex flex-col">
        
        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center p-4">
          {isVideo ? (
            <div className="relative w-full max-w-4xl mx-auto aspect-video">
              {!isMobile && (<video
                ref={videoRef}
                src={slides[currentSlideIndex].url}
                autoPlay
                muted
                className="w-full h-full object-contain goji-animation"
                // onPlay={handleVideoPlay}
                // onPause={handleVideoPause}
                // onEnded={handleVideoEnded}
              />)}
            </div>
          ) : (
            <div className="relative w-full max-w-3xl mx-auto">
              <img
                src={slides[currentSlideIndex].url || "/placeholder.svg"}
                alt={slides[currentSlideIndex].content || "Slide"}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Navigation arrows - only show if there's more than one slide */}
        {slides.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2 rounded-full bg-white/80 shadow-md ${
                currentSlideIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`p-2 rounded-full bg-white/80 shadow-md ${
                currentSlideIndex === slides.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Slide caption */}
        <div className="p-4 text-center">
          <p className="text-lg font-medium">{slides[currentSlideIndex].content}</p>
        </div>

        {/* Slide indicators - only show if there's more than one slide */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 pb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-2 h-2 rounded-full ${index === currentSlideIndex ? "bg-blue-600" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            
            {/* Dev tool - only for development & testing scenario transitions */}
            <button
              onClick={nextScenario}
              className="absolute bottom-0 right-0 text-xs text-gray-400 p-1 opacity-50 hover:opacity-100"
            >
              Next Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
