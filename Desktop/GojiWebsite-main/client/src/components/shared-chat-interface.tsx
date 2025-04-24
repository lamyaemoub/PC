import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Mic, Volume2 } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypeWriter } from "@/components/type-writer";

// A list of example questions to show users
const exampleQuestions = [
  {
    id: "customize",
    question: "Can I customize demos?",
    answer: "Yes! Goji allows for full customization of your demos. You can personalize the content, branding, user journey, and even the qualification questions based on your specific product and target audience. Our AI adapts in real-time to prospect responses, creating a unique experience for each visitor."
  },
  {
    id: "enrichment",
    question: "How does prospect enrichment work?",
    answer: "Goji's prospect enrichment combines first-party data from your CRM with third-party intelligence to create comprehensive visitor profiles. When a prospect engages with your demo, Goji identifies their company, role, and potential pain points, allowing for a tailored experience that addresses their specific needs without them having to fill out forms."
  },
  {
    id: "integration",
    question: "Does it integrate with our CRM?",
    answer: "Absolutely! Goji integrates seamlessly with major CRMs including Salesforce, HubSpot, and Pipedrive. All prospect interactions, qualification data, and engagement metrics are automatically synced to your CRM, creating new leads or enriching existing records without any manual work from your team."
  },
  {
    id: "qualification",
    question: "What qualification framework do you use?",
    answer: "Goji uses the BANT framework (Budget, Authority, Need, Timeline) as its core qualification methodology, but we customize it to your specific sales process. Our AI is trained to naturally uncover qualification criteria through conversation rather than direct questioning, resulting in higher completion rates and more accurate data."
  }
];

export function SharedChatInterface() {
  const { 
    isExpanded, 
    expandChat, 
    collapseChat, 
    selectedQuestion, 
    setSelectedQuestion, 
    chatHistory, 
    addMessage 
  } = useChat();
  
  const [inputValue, setInputValue] = useState("");
  const [isAnswerComplete, setIsAnswerComplete] = useState(false);
  const [showVoiceUI, setShowVoiceUI] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Focus the input field when the chat expands
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message to chat
      addMessage("user", inputValue);
      
      // Simulate AI response (in a real app, this would be an API call)
      setTimeout(() => {
        let response = "Thank you for your question! Goji's sales automation helps with personalized demos and qualification.";
        
        // Check if the message is related to any of our example questions
        if (inputValue.toLowerCase().includes("custom")) {
          response = exampleQuestions.find(q => q.id === "customize")?.answer || response;
        } else if (inputValue.toLowerCase().includes("enrich") || inputValue.toLowerCase().includes("prospect")) {
          response = exampleQuestions.find(q => q.id === "enrichment")?.answer || response;
        } else if (inputValue.toLowerCase().includes("integrat") || inputValue.toLowerCase().includes("crm")) {
          response = exampleQuestions.find(q => q.id === "integration")?.answer || response;
        } else if (inputValue.toLowerCase().includes("qualif") || inputValue.toLowerCase().includes("bant")) {
          response = exampleQuestions.find(q => q.id === "qualification")?.answer || response;
        }
        
        addMessage("assistant", response);
      }, 1000);
      
      setInputValue("");
    }
  };

  // Handle selecting an example question
  const handleSelectQuestion = (questionId: string) => {
    const selectedQ = exampleQuestions.find(q => q.id === questionId);
    if (selectedQ) {
      setSelectedQuestion(questionId);
      addMessage("user", selectedQ.question);
      
      // Simulate AI response
      setTimeout(() => {
        addMessage("assistant", selectedQ.answer);
        setIsAnswerComplete(true);
      }, 500);
    }
  };

  // Get the answer for a selected question
  const getAnswerForQuestion = (questionId: string) => {
    const question = exampleQuestions.find(q => q.id === questionId);
    return question ? question.answer : "";
  };

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  g
                </div>
                <div>
                  <h3 className="font-medium">Goji AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything about how Goji can help your sales process</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={collapseChat}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {chatHistory.map((message: { role: "user" | "assistant"; content: string }, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                      g
                    </div>
                  )}
                  <div 
                    className={`rounded-lg p-3 text-sm ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <TypeWriter 
                        text={message.content} 
                        delay={20} 
                        className="leading-relaxed"
                      />
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-semibold text-primary-foreground">
                      u
                    </div>
                  )}
                </div>
              ))}
              
              {/* Example questions displayed as chat bubbles */}
              {chatHistory.length === 1 && (
                <div className="pl-11 space-y-2">
                  {exampleQuestions.map((q) => (
                    <motion.div 
                      key={q.id}
                      className="inline-block bg-primary/10 text-sm px-3 py-1.5 rounded-lg text-primary cursor-pointer mr-2 mb-2"
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(72, 86, 246, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectQuestion(q.id)}
                    >
                      {q.question}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setShowVoiceUI(!showVoiceUI)}
                >
                  {showVoiceUI ? (
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Mic className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 bg-muted/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  variant={inputValue.trim() ? "default" : "ghost"}
                  size="icon"
                  className="rounded-full"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className={`h-5 w-5 ${inputValue.trim() ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </Button>
              </div>
              {showVoiceUI && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 bg-muted/20 rounded-lg p-3 flex items-center justify-center overflow-hidden"
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      {/* Voice visualization */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-primary w-1 rounded-full"
                            animate={{
                              height: [15, 30, 20, 40, 15],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Listening... Tap the microphone when you're done speaking.</div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}