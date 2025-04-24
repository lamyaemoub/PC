import { createContext, useState, useContext, ReactNode } from "react";

// Chat context type
interface ChatContextType {
  isExpanded: boolean;
  expandChat: () => void;
  collapseChat: () => void;
  selectedQuestion: string | null;
  setSelectedQuestion: (question: string | null) => void;
  chatHistory: {
    role: "user" | "assistant";
    content: string;
  }[];
  addMessage: (role: "user" | "assistant", content: string) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | null>(null);

// Chat Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { 
      role: "assistant", 
      content: "Hi there! I'm goji, your AI sales assistant. What would you like to know about our product or how it can help with your sales process?" 
    }
  ]);

  // Expand the chat interface
  const expandChat = () => {
    setIsExpanded(true);
  };

  // Collapse the chat interface
  const collapseChat = () => {
    setIsExpanded(false);
  };

  // Add a message to the chat history
  const addMessage = (role: "user" | "assistant", content: string) => {
    setChatHistory(prev => [...prev, { role, content }]);
  };

  return (
    <ChatContext.Provider
      value={{
        isExpanded,
        expandChat,
        collapseChat,
        selectedQuestion,
        setSelectedQuestion,
        chatHistory,
        addMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}