"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Linkedin, Facebook, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ContactPopup, FormContext } from "@/components/contact-popup"

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

const AnimatedLink = ({ href, children }: AnimatedLinkProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden transition-all duration-300 hover:text-blue-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center"
        animate={{ x: isHovered ? 8 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="mr-2"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
        <span>{children}</span>
      </motion.div>
    </Link>
  )
}

const FooterWave = () => (
  <div className="absolute top-0 left-0 w-full" style={{ transform: 'translateY(-100%)' }}>
    <svg viewBox="0 0 1054 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#096EB6"/>
          <stop offset="100%" stopColor="#043050"/>
        </linearGradient>
      </defs>
      <path d="M0,20 C300,70 800,0 1054,40 L1054,70 L0,70 Z" fill="url(#waveGradient)" />
    </svg>
  </div>
);

export function Footer() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [formContext, setFormContext] = useState<FormContext>({ type: 'demo' })

  const handleBookDemo = () => {
    setFormContext({ type: 'demo' })
    setIsContactPopupOpen(true)
  }

  return (
    <div className="relative mt-24">
      <FooterWave />
      {/* Footer Content */}
      <footer className="text-white bg-gradient-to-r from-highlight to-[#043050]">
        <div className="px-4 pt-16 pb-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Products Column */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Products</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <AnimatedLink href="#">Productive Tracking</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Time Tracking</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Realtime Reporting</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Mobile Tracking</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Employee Tracking</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="/pricing">Pricing</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Location tracking</AnimatedLink>
                  </li>
                </ul>
              </motion.div>

              {/* Company Column */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <AnimatedLink href="/about">About Us</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Blog</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Careers</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">News</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Partners</AnimatedLink>
                  </li>
                </ul>
              </motion.div>

              {/* Support Column */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Support</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    {/* <AnimatedLink href="/services">Our Services</AnimatedLink> */}
                  </li>
                  <li>
                    <AnimatedLink href="/contact">Contact Us</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Help Center</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">Documentation</AnimatedLink>
                  </li>
                  <li>
                    <AnimatedLink href="#">API Status</AnimatedLink>
                  </li>
                </ul>
              </motion.div>

              {/* Track Nexus & CTA Column */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3">
                   <img
                      src="/clock-logo.png"
                      alt="Track Nexus Logo"
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        console.error('Clock logo failed to load, trying fallback');
                        const target = e.target as HTMLImageElement;
                        target.src = "/logo.png";
                      }}
                    />
                  
                  <span className="text-xl font-bold">Track Nexus</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Ready to get started</h4>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={handleBookDemo}
                      className="bg-white hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-highlight"
                    >
                      Book a Demo
                    </Button>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Follow us on</p>
                  <div className="flex space-x-3">
                    {[
                      { icon: Instagram, href: "https://www.instagram.com/tracknexus.in/" },
                      { icon: Youtube, href: "https://www.youtube.com/@TrackNexusOfficial" },
                      { icon: Linkedin, href: "https://www.linkedin.com/company/tracknexus" },
                      { icon: Facebook, href: "https://www.facebook.com/tracknexus.in" },
                    ].map((social, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={social.href}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
                        >
                          <social.icon className="w-4 h-4" style={{ color: '#096EB6' }} />
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="https://x.com/tracknexusappit"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4" style={{ color: '#096EB6' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Footer */}
            <motion.div
              className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t-highlight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-sm">Copyright © Track Nexus 2025. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <AnimatedLink href="/privacy-policy">Privacy Policy</AnimatedLink>
                <AnimatedLink href="/terms-conditions">Terms & Conditions</AnimatedLink>
                {/* <AnimatedLink href="/services">Services</AnimatedLink> */}
                <AnimatedLink href="/contact">CONTACT US</AnimatedLink>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
        context={formContext}
      />
    </div>
  )
}
