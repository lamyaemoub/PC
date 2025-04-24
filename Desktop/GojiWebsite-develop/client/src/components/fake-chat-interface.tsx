"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useSlideStore } from "@/lib/slide-store"
import ChatMessage, { type Message } from "@/components/chat-message"
import { Button } from "@/components/ui/button"
import AutoExpandingTextarea from "@/components/auto-expanding-textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Conversation sequences for each scenario
const conversationSequences = [
  // Scenario 1 - Basic setup video
  [
    {
      role: "user",
      content: "We have developers, but I'm worried about how much setup time this requires.",
    },
    {
      role: "assistant",
      content: "Perfect. Watch how quickly you can get started—here's our 15-minute setup process where you just drop in your assets and Goji handles the rest.",
      additionalData: {
        phase: "scenario1",
      },
    },
  ],
  
  // Scenario 2 - Enterprise Solution Qualification
  [
    {
      role: "assistant",
      content: "If you're leading growth, I'm guessing inbound lead quality is… hit or miss? What's your current qualifying process?",
      additionalData: {
        phase: "scenario2",
      },
    },
    {
      role: "user",
      content: "Exactly, we're scaling fast and drowning in low-intent leads. We use forms and SDRs follow up, but it's slow and most aren't ready to buy.",
    },
    {
      role: "assistant",
      content: "Classic. Imagine if your site could qualify in real time, and serve tailored demos instantly — no forms, no delay.",
      additionalData: {
        phase: "scenario2",
      },
    },
  ],
  
  // Scenario 3 - ROI and Conversions
  [
    {
      role: "user",
      content: "Sounds interesting, but what's the ROI? We have 3 SDRs doing about 20 demos each week.",
    },
    {
      role: "assistant",
      content: "With your 3 SDRs running 60 demos weekly, Goji would save you €2000 monthly while tripling your conversion rate. Your team could focus only on sales-ready leads, and you'd see ROI within the first month.",
      additionalData: {
        phase: "scenario3",
      },
    },
  ],
  
  // Scenario 4 - Goji AI Setup
  [
    {
      role: "assistant",
      content: "Here's your control panel — decide exactly what Goji says, shows, and when.",
      additionalData: {
        phase: "scenario4",
      },
    },
    {
      role: "user",
      content: "Can I customize per persona?",
    },
    {
      role: "assistant",
      content: "Totally. You choose the logic, messages, even demo flows — onboarding's a breeze.",
      additionalData: {
        phase: "scenario4",
      },
    },
  ],
]

interface ChatInterfaceProps {
  conversationId?: string | null
  initialMessage?: { message: string; additional_data?: any } | null
  onActivateCalendly?: () => void
  resetKey?: number // Add a reset key prop to force reset
}

export default function ChatInterface({
  conversationId,
  initialMessage,
  onActivateCalendly,
  resetKey = 0, // Default to 0
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { setSlides, setCurrentSlideIndex } = useSlideStore()

  const [currentStreamingText, setCurrentStreamingText] = useState("")
  const [isTypingLastMessage, setIsTypingLastMessage] = useState(false)

  // Refs to store timers for proper cleanup
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Get the current scenario index from the slide store
  const { currentScenarioIndex } = useSlideStore()

  // Reset the chat interface when resetKey changes and initialize with all messages except the last one
  useEffect(() => {
    // Clear any existing timers to prevent memory leaks and duplicate operations
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current)

    // Reset all state
    setMessages([])
    setInput("")
    setIsLoading(false)
    setCurrentStreamingText("")
    setIsTypingLastMessage(false)

    // Get the conversation sequence for the current scenario
    const currentSequence = conversationSequences[currentScenarioIndex]
    
    // Initialize with all messages except the last one
    const initialMessages: Message[] = currentSequence.slice(0, -1).map((msg: any) => ({
      id: Math.random().toString(36).substring(2, 9),
      role: msg.role,
      content: msg.content,
      timestamp: new Date(),
      additionalData: msg.additionalData,
    }))

    // Set initial messages after a small delay to ensure clean state
    setTimeout(() => {
      setMessages(initialMessages)

      // Set the slide based on the current scenario phase
      const phaseKey = `scenario${currentScenarioIndex + 1}`
      handlePhaseBasedSlide(phaseKey)

      // After a short delay, start typing the last message
      const lastMessage = currentSequence[currentSequence.length - 1]
      if (lastMessage) {
        typingTimerRef.current = setTimeout(() => {
          simulateLastMessageTyping(lastMessage)
        }, 1000)
      }
    }, 50)

    // Cleanup function to clear all timers when component unmounts or resetKey changes
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    }
  }, [resetKey, currentScenarioIndex]) // Add resetKey and currentScenarioIndex to dependencies

  // Improved scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      // Directly set the scrollTop of the container instead of using scrollIntoView
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  // Auto-scroll when messages change
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const scrollTimer = setTimeout(() => {
      if (messagesContainerRef.current) {
        // Only scroll if we're already near the bottom (to avoid disrupting manual scrolling)
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100 // Within 100px of bottom

        if (isNearBottom || messages.length <= 2) {
          // Always scroll for first few messages
          scrollToBottom()
        }
      }
    }, 100)

    return () => clearTimeout(scrollTimer)
  }, [messages, currentStreamingText])

  // Also update the resize handler to use the new approach
  useEffect(() => {
    const handleResize = () => {
      if (messagesContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100

        if (isNearBottom) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePhaseBasedSlide = (phase: string) => {
    // Set default slides based on conversation phase
    let slideUrl = ""
    let slideContent = ""

    switch (phase) {
      // Scenario 1 - Video with control panel demo
      case "scenario1":
        slideUrl = "/scenario1.mp4" // Using attached video asset
        slideContent = "Total control on choosing the logic, messages, even demo flows"
        break
      
      // Scenario 2 - Enterprise Solution Qualification
      case "scenario2":
        slideUrl = "/Scnario 2.png" // Using attached image asset
        slideContent = "Quality in real time, and serve tailored demos instantly"
        break
      
      // Scenario 3 - ROI and Conversions Impact
      case "scenario3":
        slideUrl = "/Scneario 3.png" // Using attached image asset
        slideContent = "Your team could focus only on sales-ready leads"
        break
      
      // Scenario 4 - Goji AI Setup
      case "scenario4":
        slideUrl = "/scenario4.mp4" // Using attached video asset
        slideContent = "Total control on choosing the logic, messages, even demo flows"
        break
        
      // Fallback cases from previous implementation
      case "greeting":
        slideUrl = "/Goji-knowledge-base/output_images/page_1.png"
        slideContent = "Welcome to Goji - The AI Closer for B2B Websites"
        break
      case "discovery":
        slideUrl = "/Goji-knowledge-base/output_images/page_3.png"
        slideContent = "The Problem: Websites Lose Deals"
        break
      case "qualification":
        slideUrl = "/Goji-knowledge-base/output_images/page_7.png"
        slideContent = "Goji's Solution: Interactive Demo Assistant"
        break
      case "demonstration":
        slideUrl = "/scenario1.mp4" // Updated to use the attached video file
        slideContent = "Total control on choosing the logic, messages, even demo flows"
        break
      case "addressing_objections":
        slideUrl = "/Goji-knowledge-base/output_images/page_8.png"
        slideContent = "Goji's Impact: Increased Conversions and Shorter Sales Cycles"
        break
      case "closing":
        slideUrl = "/Goji-knowledge-base/output_images/page_34.png"
        slideContent = "Schedule a Call with Our Team"
        break
      default:
        slideUrl = "/Goji-knowledge-base/output_images/page_2.png"
        slideContent = "Goji AI - AI-powered product demo and qualification platform"
    }

    setSlides([{ url: slideUrl, content: slideContent }])
    setCurrentSlideIndex(0)
  }

  const simulateLastMessageTyping = (messageData: any) => {
    // Safety check to prevent duplicate typing
    if (isTypingLastMessage) return

    const content = messageData.content
    setIsTypingLastMessage(true)
    setCurrentStreamingText("")

    // Stream the text character by character
    let streamIndex = 0

    // Clear any existing interval
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)

    // Create a custom event that the SlideDisplay component can listen for
    const chatCompletedEvent = new CustomEvent('chatMessageCompleted', {
      detail: { scenarioIndex: currentScenarioIndex }
    });

    streamIntervalRef.current = setInterval(() => {
      if (streamIndex <= content.length) {
        setCurrentStreamingText(content.substring(0, streamIndex))
        streamIndex++
      } else {
        // Clear the interval when done
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current)
          streamIntervalRef.current = null
        }

        // After streaming is complete, add the message
        completeTimerRef.current = setTimeout(() => {
          const assistantMessage: Message = {
            id: Date.now().toString(),
            role: messageData.role,
            content,
            timestamp: new Date(),
            additionalData: messageData.additionalData,
          }

          setMessages((prev) => [...prev, assistantMessage])
          setIsTypingLastMessage(false)
          setCurrentStreamingText("")

          // Clear the timer reference
          completeTimerRef.current = null
          
          console.log('Chat message typing completed for scenario:', currentScenarioIndex);
          
          // Dispatch a custom event when the chat message is complete
          // This allows other components to know when to proceed with scenario transition
          window.dispatchEvent(chatCompletedEvent);
        }, 1500) // Increased to give user more time to read the final message
      }
    }, 30) // Adjust streaming speed as needed
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header with Goji name */}
      <div className="p-3 sm:p-4 md:p-5 border-b border-gray-200 flex items-center">
        <div className="font-medium text-base sm:text-lg">Chat Interface</div>
        <div className="ml-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
      </div>

      {/* Messages container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 scroll-smooth">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTypingLastMessage && (
          <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
              <AvatarFallback>
                <img
                  src="/chat-logo.png"
                  alt="Company Logo"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start max-w-[80%] sm:max-w-[75%]">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                <span className="text-sm sm:text-base font-semibold">Goji</span>
                <div className="w-2 h-2 rounded-full bg-[#4655F6]"></div>
              </div>
              <div className="p-1 sm:p-2 px-2 sm:px-3 rounded-lg bg-[#F5F5F4] text-secondary-foreground rounded-tl-none">
                <div>{currentStreamingText}</div>
                <span className="inline-flex items-center ml-1">
                  <span
                    className="w-1 h-1 bg-gray-500 rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-1 h-1 bg-gray-500 rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1 h-1 bg-gray-500 rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        )}
        {/* This invisible div is used as a marker for scrolling to the bottom */}
        <div ref={messagesEndRef} className="h-0 w-full" />
      </div>

      {/* New message input area with auto-expanding textarea */}
      <div className="border-t p-2 sm:p-3 md:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="flex items-end gap-1 md:gap-2 border rounded-lg sm:rounded-xl shadow-sm p-1 md:p-2"
        >
          <AutoExpandingTextarea
            value={input}
            disabled
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="border-none p-2 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
            suppressHydrationWarning={true}
          />
          <Button
            type="submit"
            disabled
            className="h-8 sm:h-9 md:h-10 text-sm sm:text-base rounded-full bg-[#4655F6] cursor-pointer hover:bg-[#3A47D1]"
          >
            <ArrowUp className="m-0 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
