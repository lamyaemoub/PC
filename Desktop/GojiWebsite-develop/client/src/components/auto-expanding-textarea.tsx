"use client"

import { useRef, useEffect, type ChangeEvent } from "react"
import { Textarea } from "@/components/ui/textarea"

interface AutoExpandingTextareaProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  suppressHydrationWarning?: boolean
}

export default function AutoExpandingTextarea({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  suppressHydrationWarning,
}: AutoExpandingTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Function to adjust the height
  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto"

    // Set the height to the scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight()
  }, [value])

  // Adjust height on window resize
  useEffect(() => {
    window.addEventListener("resize", adjustHeight)
    return () => window.removeEventListener("resize", adjustHeight)
  }, [])

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e)
        adjustHeight()
      }}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      rows={1}
      suppressHydrationWarning={suppressHydrationWarning}
    />
  )
}
