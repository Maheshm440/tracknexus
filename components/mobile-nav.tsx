"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { productCategories } from "@/components/products/ProductsData"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

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
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 space-y-2">
              {/* Products with expandable submenu */}
              <div>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-highlight font-medium py-2"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1 border-l-2 border-gray-100 ml-2">
                        {productCategories.map((category) => {
                          const Icon = category.icon
                          return (
                            <Link
                              key={category.id}
                              href={`/product/${category.id}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-highlight py-2 transition-colors"
                              onClick={() => {
                                setIsOpen(false)
                                setIsProductsOpen(false)
                              }}
                            >
                              <div
                                className={`p-1.5 rounded-md bg-gradient-to-br ${category.gradient}`}
                              >
                                <Icon className="w-3 h-3 text-white" />
                              </div>
                              <span>{category.title}</span>
                            </Link>
                          )
                        })}
                        <Link
                          href="/product"
                          className="block text-sm font-medium text-highlight py-2 mt-2"
                          onClick={() => {
                            setIsOpen(false)
                            setIsProductsOpen(false)
                          }}
                        >
                          View All Products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Us with expandable submenu */}
              <div>
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-highlight font-medium py-2"
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isAboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1 border-l-2 border-gray-100 ml-2">
                        <Link
                          href="/about"
                          className="block text-sm text-gray-600 hover:text-highlight py-2 transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setIsAboutOpen(false)
                          }}
                        >
                          Overview
                        </Link>
                        <Link
                          href="/about/team"
                          className="block text-sm text-gray-600 hover:text-highlight py-2 transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setIsAboutOpen(false)
                          }}
                        >
                          Our Team
                        </Link>
                        <Link
                          href="/about/values"
                          className="block text-sm text-gray-600 hover:text-highlight py-2 transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setIsAboutOpen(false)
                          }}
                        >
                          Our Values
                        </Link>
                        <Link
                          href="/about/careers"
                          className="block text-sm text-gray-600 hover:text-highlight py-2 transition-colors"
                          onClick={() => {
                            setIsOpen(false)
                            setIsAboutOpen(false)
                          }}
                        >
                          Careers
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/pricing"
                className="text-gray-700 hover:text-highlight font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-highlight font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button className="bg-highlight hover:bg-highlight/80 text-white">Get a Demo</Button>
                <Button variant="outline" className="bg-white text-highlight border-highlight">
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
