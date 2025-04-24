"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import CalendlyIntegration from "./calendly-integration"

interface BookingCalendarModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingCalendarModal({ isOpen, onClose }: BookingCalendarModalProps) {
  // Add keyboard support
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Close button positioned at the top right of the screen */}


          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 md:p-8 pt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden">
              {/* Calendly content */}
                      <div className="flex justify-end px-3 py-1">
            <Button variant="secondary" size="sm" className="flex items-center gap-1 shadow-lg" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
              <div className="w-full h-full">
                <CalendlyIntegration url="https://calendly.com/alex-getgoji/30min"/>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
