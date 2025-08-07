"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AiFeaturesForModernTeams from "./AiFeaturesForModernTeams";
import { useState } from "react";

interface HeaderProps {
  onGetDemo?: () => void;
}

export function Header({ onGetDemo }: HeaderProps) {
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 lg:px-8 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            style={{
              width: "180px",
              marginTop: "10px",
            }}
            src="/logo.png"
            alt="Track Nexus Logo"
            width={180}
            height={150}
            className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        <MobileNav />

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { href: "/products", label: "Products" },
            { href: "/about", label: "About Us" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact Us" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium text-sm lg:text-base transition-colors relative ${
                pathname === item.href
                  ? "font-semibold text-highlight"
                  : "text-gray-700 hover:text-highlight"
              }`}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.classList.add("text-highlight");
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.classList.remove("text-highlight");
                }
              }}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-highlight"
                  layoutId="activeTab"
                />
              )}
            </Link>
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-base font-medium text-[#374151] hover:text-sky-600 p-0 hover:bg-transparent">Features</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full flex justify-center items-center">
              <DialogTitle className="hidden">
      AI Features for Modern Teams
    </DialogTitle>
              <AiFeaturesForModernTeams
                onAnyClick={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span className="font-medium">EN</span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              className="text-white px-4 py-2 text-sm font-medium bg-highlight hover:bg-highlight/80"
              onClick={onGetDemo}
            >
              Get a Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white px-4 py-2 text-sm font-medium text-highlight border-highlight hover:bg-highlight/80"
              onClick={onGetDemo}
            >
              Start now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
