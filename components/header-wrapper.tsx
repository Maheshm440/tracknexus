"use client"

import { useState } from "react"
import { Header } from "./header"
import { ContactPopup, FormContext } from "./contact-popup"

export function HeaderWrapper() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: 'demo' })

  const handleOpenContact = () => {
    setFormContext({ type: 'demo' })
    setIsContactPopupOpen(true)
  }

  return (
    <>
      <Header onGetDemo={handleOpenContact} />
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)}
        context={formContext}
      />
    </>
  )
} 