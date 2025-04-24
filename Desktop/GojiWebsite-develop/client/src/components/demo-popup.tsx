"use client"

import { useEffect } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { z } from "zod"

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
})

type LoginForm = z.infer<typeof loginSchema>

const SITE_URL = import.meta.env.VITE_APP_URL || 'https://getgoji.ai';

interface DemoPopupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoPopupModal({ isOpen, onClose }: DemoPopupModalProps) {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = async (data: LoginForm) => {
  try {
    setIsPending(true)

    // Simulate a delay like an API call
    await new Promise((res) => setTimeout(res, 1000))

    // Simulate incorrect password always
    throw new Error("Incorrect password")
  } catch (error) {
    toast({
      title: "Access Denied",
      description: "Incorrect password. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsPending(false)
  }
}

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
          <motion.div
            className="fixed inset-0 bg-black/50 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative bg-background rounded-lg shadow-xl w-full max-w-md overflow-hidden">
              <div className="flex justify-end px-3 py-2">
                <Button size="sm" variant="secondary" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card className="bg-background border-none shadow-none">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Demo Access
                  </CardTitle>
                  <CardDescription>Enter your demo credentials to access the Goji AI demo</CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <Label htmlFor="password">Secret Key</Label>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  className={`pr-10 ${
                                    fieldState.invalid
                                      ? "border-destructive focus-visible:ring-destructive"
                                      : field.value && !fieldState.invalid
                                        ? "border-green-500 focus-visible:ring-green-500"
                                        : ""
                                  }`}
                                />
                              </FormControl>
                              {field.value && (
                                <div className="absolute right-3 top-2.5">
                                  {fieldState.invalid ? (
                                    <X className="h-5 w-5 text-destructive" />
                                  ) : (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                          <>
                            <Spinner size="sm" />
                            <span>Accessing...</span>
                          </>
                        ) : (
                          <span>Access Demo</span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
