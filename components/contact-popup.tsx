"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X, Mail, Phone, User, MessageSquare, Building, Users, Star, Zap, Calendar as CalendarIcon, Clock, Send, Check, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { getVisitorId } from "@/lib/tracking/tracker"

export type FormType = 'demo' | 'pricing' | 'free-trial'

export interface FormContext {
  type: FormType
  planName?: string
  planPrice?: string
  planType?: 'monthly' | 'yearly'
}

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  context?: FormContext
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error'

export function ContactPopup({ isOpen, onClose, context = { type: 'demo' } }: ContactPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyEmail: "",
    companySize: "",
    mobileNumber: "",
    message: "",
    selectedPlan: context.planName || "",
    planType: context.planType || "",
    preferredTime: ""
  })
  
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')

  const getFormConfig = () => {
    switch (context.type) {
      case 'demo':
        return {
          title: "Request a Demo",
          subtitle: "Let's discuss how Track Nexus can help your team",
          buttonText: "Request Demo",
          messagePlaceholder: "Tell us about your requirements and what you'd like to see in the demo",
          showPlanInfo: false,
          showCalendar: false
        }
      case 'pricing':
        return {
          title: `Get Started with ${context.planName}`,
          subtitle: `You've selected the ${context.planName} plan. Let's get you set up!`,
          buttonText: "Start My Plan",
          messagePlaceholder: "Any specific questions about this plan or special requirements?",
          showPlanInfo: true,
          showCalendar: false
        }
      case 'free-trial':
        return {
          title: "Start Your Free 7-Day Trial",
          subtitle: "No credit card required. Get full access to Track Nexus for 7 days.",
          buttonText: "Start Free Trial",
          messagePlaceholder: "Tell us about your team and what you hope to achieve with Track Nexus",
          showPlanInfo: false,
          showCalendar: false
        }
      default:
        return {
          title: "Get in Touch",
          subtitle: "Let's discuss how Track Nexus can help your team",
          buttonText: "Send Message",
          messagePlaceholder: "How can we help you?",
          showPlanInfo: false,
          showCalendar: false
        }
    }
  }

  const config = getFormConfig()

  // Available time slots for demos
  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" }
  ]

  // Submit lead to API
  const submitLead = async (leadData: Record<string, unknown>) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit lead');
    }

    return response.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (submissionStatus === 'sending') return

    setSubmissionStatus('sending')

    // Get visitor ID from tracker (if available)
    const visitorId = getVisitorId();

    const leadData = {
      name: formData.name,
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      companySize: formData.companySize,
      mobileNumber: formData.mobileNumber,
      message: formData.message,
      formType: context.type,
      selectedPlan: formData.selectedPlan || undefined,
      preferredDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
      preferredTime: formData.preferredTime || undefined,
      visitorId: visitorId || undefined,
      source: typeof window !== 'undefined' ? window.location.pathname : undefined,
    }

    try {
      const result = await submitLead(leadData)

      if (result.success) {
        setSubmissionStatus('success')

        // Store the lead in localStorage so it appears in the dashboard
        try {
          const existingLeads = JSON.parse(localStorage.getItem('tracknexus_leads') || '[]')
          const newLead = {
            id: result.leadId,
            name: formData.name,
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            companySize: formData.companySize,
            mobileNumber: formData.mobileNumber,
            message: formData.message,
            formType: context.type,
            selectedPlan: formData.selectedPlan || undefined,
            preferredDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
            preferredTime: formData.preferredTime || undefined,
            score: result.score || 0, // Use the score calculated by API
            status: 'NEW',
            createdAt: new Date().toISOString(),
            source: typeof window !== 'undefined' ? window.location.pathname : undefined,
          }
          const updatedLeads = [newLead, ...existingLeads]
          localStorage.setItem('tracknexus_leads', JSON.stringify(updatedLeads))
        } catch (storageError) {
          console.error('Error storing lead in localStorage:', storageError)
        }

        // Auto-close after success
        setTimeout(() => {
          handleClose()
        }, 2000)
      } else {
        throw new Error(result.error || 'Failed to submit');
      }

    } catch (error) {
      console.error("Lead submission failed:", error)
      setSubmissionStatus('error')

      // Reset to idle after showing error
      setTimeout(() => {
        setSubmissionStatus('idle')
      }, 3000)
    }
  }

  const handleClose = () => {
    // Reset all state when closing
    setFormData({ 
      name: "", 
      companyName: "", 
      companyEmail: "", 
      companySize: "", 
      mobileNumber: "", 
      message: "",
      selectedPlan: "",
      planType: "",
      preferredTime: ""
    })
    setSelectedDate(undefined)
    setSubmissionStatus('idle')
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Accent */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all z-10"
              disabled={submissionStatus === 'sending'}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{config.subtitle}</p>
              </div>

              {/* Plan Info (for pricing context) */}
              {config.showPlanInfo && context.planName && (
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{context.planName}</h3>
                      <p className="text-xs text-gray-500">{context.planPrice} • {context.planType}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Building className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      name="companyName"
                      placeholder="Company"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    name="companyEmail"
                    placeholder="Work Email"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className="pl-8 h-9 text-sm border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Users className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 z-10" />
                    <Select onValueChange={handleSelectChange('companySize')} required>
                      <SelectTrigger className="pl-8 h-9 text-sm border-gray-200">
                        <SelectValue placeholder="Team Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-50">10 - 50</SelectItem>
                        <SelectItem value="50-100">50 - 100</SelectItem>
                        <SelectItem value="100-500">100 - 500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    <Input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Phone"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                      required
                    />
                  </div>
                </div>

                {/* Calendar Fields for Demo Booking */}
                {config.showCalendar && (
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`h-9 text-sm justify-start ${!selectedDate && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                          {selectedDate ? format(selectedDate, "MMM d") : "Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400 z-10" />
                      <Select onValueChange={handleSelectChange('preferredTime')} required>
                        <SelectTrigger className="pl-8 h-9 text-sm">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <MessageSquare className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                  <Textarea
                    name="message"
                    placeholder={config.messagePlaceholder}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="pl-8 min-h-[70px] text-sm resize-none border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  disabled={submissionStatus === 'sending'}
                >
                  {submissionStatus === 'sending' ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : submissionStatus === 'success' ? (
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      {config.buttonText}
                    </span>
                  )}
                </Button>
              </form>

              {/* Status Messages */}
              {submissionStatus === 'success' && (
                <motion.div
                  className="mt-3 p-2.5 bg-green-50 border border-green-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Success! We&apos;ll be in touch soon.</span>
                  </div>
                </motion.div>
              )}

              {submissionStatus === 'error' && (
                <motion.div
                  className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-red-700 text-sm">
                    <X className="w-4 h-4" />
                    <span className="font-medium">Failed. Please try again.</span>
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              {submissionStatus === 'idle' && (
                <p className="text-center mt-3 text-[11px] text-gray-400">
                  {context.type === 'free-trial'
                    ? "Start instantly • No credit card required"
                    : "We respond within 24 hours"
                  }
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 