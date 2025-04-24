"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

export interface Message {
  id: string
  role: "user" | "assistant" | "followUp"
  content: string
  timestamp: Date
  additionalData?: any
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "assistant"
  const isFollowUp = message.role === "followUp"
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])

  // Extract follow-up questions from the message content
  useEffect(() => {
    if (isAI && message.content) {
      const questions: string[] = message.additionalData?.questions || []
      const content = message.content

      // Extract questions from <assistant_question> tags
      const assistantQuestionRegex = /<assistant_question>(.*?)<\/assistant_question>/gs
      let match

      while ((match = assistantQuestionRegex.exec(content)) !== null) {
        if (match[1] && match[1].trim()) {
          questions.push(match[1].trim())
        }
      }

      // Extract questions from <question> tags
      const questionRegex = /<question>(.*?)<\/question>/gs

      while ((match = questionRegex.exec(content)) !== null) {
        if (match[1] && match[1].trim()) {
          questions.push(match[1].trim())
        }
      }

      setFollowUpQuestions(questions)
    }
  }, [message.content, message.additionalData, isAI])

  // Clean message content by removing tags
  const cleanContent = message.content
    .replace(
      /<slide>.*?<\/slide>|<url>.*?<\/url>|<answer>|<\/answer>|<assistant_question>.*?<\/assistant_question>|<question>.*?<\/question>/gs,
      "",
    )
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n$/, "")

  return (
    <div className="mb-3 sm:mb-4">
      {/* Main message */}
      <div className={cn("flex items-start gap-2 sm:gap-3", isAI || isFollowUp ? "flex-row" : "flex-row-reverse")}>
        <Avatar className={isFollowUp ? "hidden" : "h-7 w-7 sm:h-8 sm:w-8"}>
          <AvatarFallback>
            {isAI ? (
              <img
                src="/chat-logo.png"
                alt="Company Logo"
                width={200}
                height={200}
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
            ) : (
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </AvatarFallback>
        </Avatar>

        <div className={cn("flex flex-col max-w-[80%] sm:max-w-[75%]", isAI ? "items-start" : "items-end")}>
          {!isFollowUp && (
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
              <span className="text-sm sm:text-base font-semibold">{isAI ? "Goji" : "You"}</span>
            </div>
          )}
          {!isFollowUp && (
            <div
              className={cn(
                "p-1 sm:p-2 px-2 sm:px-3 rounded-lg text-sm sm:text-base",
                isAI ? "bg-[#F5F5F4] text-secondary-foreground" : "bg-[#4655F6] text-primary-foreground",
                isAI ? "rounded-tl-none" : "rounded-tr-none",
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: cleanContent.replace(/\n/g, "<br />") }} />
            </div>
          )}
          {isFollowUp && (
            <div
              className={cn(
                "ml-9 sm:ml-12 p-1 sm:p-1 px-2 sm:px-3 rounded-lg bg-[#DADDFD] text-secondary-foreground text-sm sm:text-base",
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: cleanContent.replace(/\n/g, "<br />") }} />
            </div>
          )}
        </div>
      </div>

      {/* Follow-up questions */}
      {isAI && followUpQuestions.length > 0 && (
        <div className="mt-2 sm:mt-3">
          {followUpQuestions.map((question, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"></div> {/* Spacer for alignment */}
              <div className="ml-0 sm:ml-0 p-1 sm:p-2 px-2 sm:px-3 rounded-lg bg-[#DADDFD] text-secondary-foreground text-sm sm:text-base">
                <div dangerouslySetInnerHTML={{ __html: question.replace(/\n/g, "<br />") }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
