"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Play, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { productCategories, Category } from "@/components/products/ProductsData";

interface ProductsMegaMenuProps {
  isActive?: boolean;
  onGetDemo?: () => void;
}

export function ProductsMegaMenu({ isActive = false, onGetDemo }: ProductsMegaMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<Category>(productCategories[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleCategoryClick = (categoryId: string) => {
    setIsOpen(false);
    router.push(`/product/${categoryId}`);
  };

  const handleFeatureClick = (categoryId: string, featureId: string) => {
    setIsOpen(false);
    router.push(`/product/${categoryId}#${featureId}`);
  };

  return (
    <NavigationMenu value={isOpen ? "product" : ""} onValueChange={(value) => setIsOpen(value === "product")}>
      <NavigationMenuList>
        <NavigationMenuItem value="product">
          <NavigationMenuTrigger
            className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0 font-medium text-sm lg:text-base transition-colors ${
              isActive
                ? "font-semibold text-highlight"
                : "text-gray-700 hover:text-highlight"
            }`}
          >
            Product
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[900px]">
              {/* Main 3-Panel Layout */}
              <div className="flex">
                {/* Left Panel - PRODUCTS (Categories List) */}
                <div className="w-64 border-r border-gray-200 p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                    Products
                  </h3>
                  <nav className="space-y-1">
                    {productCategories.map((category) => {
                      const Icon = category.icon;
                      const isSelected = selectedCategory.id === category.id;
                      return (
                        <button
                          key={category.id}
                          onMouseEnter={() => setSelectedCategory(category)}
                          onClick={() => handleCategoryClick(category.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            isSelected
                              ? "bg-highlight text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-md bg-gradient-to-br ${category.gradient} ${
                              isSelected ? "opacity-90" : ""
                            }`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{category.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Middle Panel - KEY FEATURES */}
                <div className="flex-1 p-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Key Features
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCategory.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {selectedCategory.features.slice(0, 4).map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <button
                            key={feature.id}
                            onClick={() => handleFeatureClick(selectedCategory.id, feature.id)}
                            className="group p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${selectedCategory.color}15` }}
                              >
                                <FeatureIcon
                                  className="w-4 h-4"
                                  style={{ color: selectedCategory.color }}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm group-hover:text-highlight transition-colors">
                                  {feature.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Panel - DEMO VIDEO */}
                <div className="w-72 bg-gray-50 p-6">
                  {/* Video Placeholder */}
                  <div className="relative rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-gray-200 to-gray-300 aspect-video">
                    {/* Placeholder Pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-highlight/20 to-highlight/5 flex items-center justify-center">
                        {/* Decorative lines to simulate dashboard */}
                        <div className="absolute inset-4 border border-gray-300/50 rounded-md">
                          <div className="absolute top-2 left-2 right-2 h-2 bg-gray-300/50 rounded" />
                          <div className="absolute top-6 left-2 w-1/3 h-1.5 bg-gray-300/40 rounded" />
                          <div className="absolute top-10 left-2 right-2 bottom-2 grid grid-cols-2 gap-1">
                            <div className="bg-highlight/10 rounded" />
                            <div className="bg-highlight/15 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                        <Play className="w-5 h-5 text-highlight ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-highlight text-white text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                    <Play className="w-3 h-3" fill="currentColor" />
                    DEMO VIDEO
                  </div>

                  {/* Content */}
                  <h4 className="font-semibold text-gray-900 mb-2">
                    View 2-Minute Demo
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    See for yourself how TrackNexus can boost your productivity.
                  </p>

                  {/* CTA Link */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onGetDemo?.();
                    }}
                    className="text-sm font-medium text-highlight hover:text-highlight/80 flex items-center gap-1 transition-colors"
                  >
                    Watch a Demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50/50">
                {/* Left Links */}
                <div className="flex items-center gap-6">
                  <Link
                    href="/integrations"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-700 hover:text-highlight flex items-center gap-1 transition-colors"
                  >
                    Integrations
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/product"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-700 hover:text-highlight flex items-center gap-1 transition-colors"
                  >
                    See all Features
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onGetDemo?.();
                    }}
                    className="text-sm font-medium text-gray-700 hover:text-highlight flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Sales
                  </button>
                </div>

                {/* Right Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-highlight text-highlight hover:bg-highlight/5"
                    onClick={() => {
                      setIsOpen(false);
                      onGetDemo?.();
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    size="sm"
                    className="bg-highlight hover:bg-highlight/90 text-white"
                    onClick={() => {
                      setIsOpen(false);
                      onGetDemo?.();
                    }}
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
