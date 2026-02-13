'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, ChevronDown, Shield } from 'lucide-react';

interface HeroContactFormProps {
  location?: string;
  category: string;
}

const countryCodes = [
  { code: '+91', flag: '🇮🇳', name: 'IN', label: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'US', label: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'GB', label: 'United Kingdom' },
  { code: '+61', flag: '🇦🇺', name: 'AU', label: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'AE', label: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'SG', label: 'Singapore' },
  { code: '+49', flag: '🇩🇪', name: 'DE', label: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'FR', label: 'France' },
  { code: '+81', flag: '🇯🇵', name: 'JP', label: 'Japan' },
  { code: '+86', flag: '🇨🇳', name: 'CN', label: 'China' },
  { code: '+55', flag: '🇧🇷', name: 'BR', label: 'Brazil' },
  { code: '+27', flag: '🇿🇦', name: 'ZA', label: 'South Africa' },
  { code: '+234', flag: '🇳🇬', name: 'NG', label: 'Nigeria' },
  { code: '+82', flag: '🇰🇷', name: 'KR', label: 'South Korea' },
  { code: '+52', flag: '🇲🇽', name: 'MX', label: 'Mexico' },
];

export function HeroContactForm({ location, category }: HeroContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    message: '',
  });
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.company,
          companyEmail: formData.email,
          companySize: '',
          mobileNumber: formData.phone ? `${selectedCountry.code} ${formData.phone}` : '',
          message: formData.message,
          formType: 'demo-request',
          source: `Marketing Landing Page - ${location || 'General'}`,
        }),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We will contact you soon.');
        setFormData({ name: '', email: '', company: '', jobTitle: '', phone: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 sm:px-6 py-3">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Request Demo{location ? ` in ${location}` : ''}
        </h3>
        <p className="text-xs text-white/80 mt-0.5">
          {location
            ? `Our ${location} team will contact you within 24 hours`
            : `See how TrackNexus can streamline your ${category.toLowerCase()} operations`}
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row 1: Name + Email (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-name" className="block text-xs font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="hero-name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-300 h-9 text-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="hero-email" className="block text-xs font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="hero-email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-gray-300 h-9 text-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Row 2: Company + Job Title (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-company" className="block text-xs font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <Input
                id="hero-company"
                type="text"
                placeholder="Company Name"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="border-gray-300 h-9 text-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="hero-jobTitle" className="block text-xs font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="hero-jobTitle"
                type="text"
                placeholder="e.g. CTO, Director"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="border-gray-300 h-9 text-sm focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Row 3: Phone with country code dropdown */}
          <div>
            <label htmlFor="hero-phone" className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex gap-0">
              {/* Country Code Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 bg-gray-50 border border-gray-300 border-r-0 rounded-l-md px-2 h-9 text-xs text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-w-[85px]"
                >
                  <span className="text-sm">{selectedCountry.flag}</span>
                  <span className="font-medium">{selectedCountry.code}</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-52 max-h-56 overflow-y-auto">
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-2 text-xs hover:bg-cyan-50 transition-colors cursor-pointer ${
                          selectedCountry.code === country.code ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-sm">{country.flag}</span>
                        <span className="font-medium">{country.name}</span>
                        <span className="text-gray-400">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Input
                id="hero-phone"
                type="tel"
                placeholder={`${selectedCountry.code} XXX XXX XXXX`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-300 h-9 text-sm flex-1 rounded-l-none focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Row 4: Message */}
          <div>
            <label htmlFor="hero-message" className="block text-xs font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="hero-message"
              placeholder="Tell us about your specific needs..."
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-gray-300 text-sm min-h-[60px] resize-none focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          {submitMessage && (
            <div className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
              submitMessage.includes('Error') || submitMessage.includes('wrong')
                ? 'text-red-700 bg-red-50 border border-red-200'
                : 'text-green-700 bg-green-50 border border-green-200'
            }`}>
              {!submitMessage.includes('Error') && !submitMessage.includes('wrong') && (
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Request Demo'
            )}
          </Button>

          {/* Privacy note */}
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            By submitting, you agree to our{' '}
            <a href="/privacy-policy" className="text-cyan-600 hover:underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms-conditions" className="text-cyan-600 hover:underline">Terms of Service</a>.
          </p>
        </form>

        {/* Trust indicators below form */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            {location ? `300+ ${location} Customers` : '57,000+ Companies'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            {location ? 'Local Support Team' : '24/7 Support'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            SOC 2 Certified
          </span>
        </div>
      </div>
    </div>
  );
}
