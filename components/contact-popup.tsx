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

  // Simulate email sending
  const simulateEmailSending = async (submissionData: any) => {
    // Add your SendGrid API Calling here
    // Send email response to: admin@tracknexus.com or your specified email
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Demo form submitted:", submissionData)
    console.log("Email should be sent to your specified email address")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (submissionStatus === 'sending') return
    
    setSubmissionStatus('sending')
    
    const submissionData = {
      ...formData,
      preferredDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      formType: context.type,
      submittedAt: new Date().toISOString()
    }

    try {
      // Simulate progressive email sending
      await simulateEmailSending(submissionData)
      
      setSubmissionStatus('success')
      
      // Auto-close after success
      setTimeout(() => {
        handleClose()
      }, 2000)
      
    } catch (error) {
      console.error("Email sending failed:", error)
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={submissionStatus === 'sending'}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
              <p className="text-gray-600">{config.subtitle}</p>
            </div>

            {/* Plan Info (for pricing context) */}
            {config.showPlanInfo && context.planName && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center mr-3">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{context.planName}</h3>
                      <p className="text-sm text-gray-600">
                        {context.planPrice} ({context.planType} billing)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Free Trial Benefits (for free trial context) */}
            {/* {context.type === 'free-trial' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">What's Included:</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Unlimited team members</li>
                  <li>• Real-time analytics</li>
                  <li>• 24/7 support</li>
                </ul>
              </div>
            )} */}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                <Select onValueChange={handleSelectChange('companySize')} required>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-50">10 To 50</SelectItem>
                    <SelectItem value="50-100">50 - 100</SelectItem>
                    <SelectItem value="100-500">100 - 500</SelectItem>
                    <SelectItem value="500+">500 Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>

              {/* Calendar Fields for Demo Booking */}
              {config.showCalendar && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Select Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!selectedDate && "text-muted-foreground"}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Select Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10" />
                        <Select onValueChange={handleSelectChange('preferredTime')} required>
                          <SelectTrigger className="pl-10">
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
                  </div>
                </>
              )}

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Textarea
                  name="message"
                  placeholder={config.messagePlaceholder}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="pl-10 min-h-[100px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-highlight text-white hover:bg-blue-700 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submissionStatus === 'sending'}
              >
                {submissionStatus === 'sending' ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </div>
                ) : submissionStatus === 'success' ? (
                  <div className="flex items-center justify-center">
                    <Check className="w-5 h-5 mr-2" />
                    Sent Successfully!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    {config.buttonText}
                  </div>
                )}
              </Button>
            </form>

            {/* Simple Loading Message */}
            {submissionStatus === 'sending' && (
              <motion.div
                className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Sending Email...</span>
                </div>
              </motion.div>
            )}

            {/* Success Message */}
            {submissionStatus === 'success' && (
              <motion.div
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Email sent successfully!</span>
                </div>
                                  <p className="text-sm text-green-600 mt-1">
                    We&apos;ll get back to you within 24 hours.
                  </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submissionStatus === 'error' && (
              <motion.div
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2 text-red-700">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Failed to send email</span>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  Please try again or contact us directly.
                </p>
              </motion.div>
            )}

            {/* Footer */}
            {submissionStatus === 'idle' && (
              <div className="text-center mt-4 text-sm text-gray-500">
                {context.type === 'demo' 
                  ? "We&apos;ll get back to you within 24 hours"
                  : context.type === 'free-trial' 
                  ? "Your trial starts immediately after signup"
                  : "We&apos;ll get back to you within 24 hours"
                }
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 