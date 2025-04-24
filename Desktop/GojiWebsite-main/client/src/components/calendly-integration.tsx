"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface CalendlyIntegrationProps {
  url?: string
}

export default function CalendlyIntegration({
  url = "https://calendly.com/enrico-getgoji/30min?utm_source=ai_sales_agent&utm_medium=chat&utm_campaign=product_demo",
}: CalendlyIntegrationProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Load Calendly script when component is in view
  useEffect(() => {
    if (inView) {
      // Create a container for Calendly scripts to avoid conflicts
      const scriptContainer = document.createElement("div")
      scriptContainer.id = "calendly-script-container"
      document.body.appendChild(scriptContainer)

      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      scriptContainer.appendChild(script)

      return () => {
        // Clean up the script and container when component unmounts
        if (scriptContainer && document.body.contains(scriptContainer)) {
          document.body.removeChild(scriptContainer)
        }

        // Also try to clean up any Calendly-related elements that might be interfering
        const calendlyElements = document.querySelectorAll("[data-calendly]")
        calendlyElements.forEach((el) => {
          if (el.parentNode) {
            el.parentNode.removeChild(el)
          }
        })
      }
    }
  }, [inView])

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-4xl mx-auto p-0">
        <div
          className="calendly-inline-widget"
          data-url={url}
          style={{
            minWidth: "320px",
            height: "100%",
            border: "none",
            // Set a lower z-index to ensure it doesn't overlap the close button
            zIndex: 1,
            position: "relative",
          }}
        />
      </div>
    </div>
  )
}
