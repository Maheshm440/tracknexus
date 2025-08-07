"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get a Demo</Button>
                <Button variant="outline" className="bg-white text-blue-600 border-blue-600">
                  Start now
                </Button>
              </div>
              <div className="text-sm text-gray-600 pt-2">Call us: +913357799</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
