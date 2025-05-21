"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { motion } from "framer-motion"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name || !email || !message) {
      toast({
        title: t.contact.validationErrorTitle,
        description: t.contact.validationErrorMessage,
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: t.contact.invalidEmailTitle,
        description: t.contact.invalidEmailMessage,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // For Netlify deployment, we use the Netlify function endpoint
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // Reset form
      setName("")
      setEmail("")
      setMessage("")

      // Show success message
      toast({
        title: t.contact.successTitle,
        description: t.contact.successMessage,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t.contact.title}</CardTitle>
        <CardDescription>{t.contact.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.contact.nameLabel}</Label>
            <Input
              id="name"
              placeholder={t.contact.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.contact.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t.contact.messageLabel}</Label>
            <Textarea
              id="message"
              placeholder={t.contact.messagePlaceholder}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? t.contact.submitting : t.contact.submit}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
