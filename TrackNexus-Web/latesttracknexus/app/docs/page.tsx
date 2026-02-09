import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Book, FileText, Users, Settings, Shield, Zap, HelpCircle, Search, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation - TrackNexus',
  description: 'Complete documentation for TrackNexus CRM and project management platform',
};

const docsSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    icon: Zap,
    color: 'from-emerald-500 to-cyan-500',
    articles: [
      { title: 'Quick Start Guide', slug: 'quick-start', description: 'Get started in 5 minutes' },
      { title: 'Account Setup', slug: 'account-setup', description: 'Configure your account settings' },
      { title: 'Dashboard Overview', slug: 'dashboard', description: 'Understanding your workspace' },
      { title: 'Navigation Basics', slug: 'navigation', description: 'Learn your way around' },
    ]
  },
  {
    title: 'Features & Tools',
    description: 'Explore all the powerful features available',
    icon: Book,
    color: 'from-blue-500 to-purple-500',
    articles: [
      { title: 'Lead Management', slug: 'lead-management', description: 'Track and manage leads effectively' },
      { title: 'Client Management', slug: 'client-management', description: 'Organize your client relationships' },
      { title: 'Ticket System', slug: 'tickets', description: 'Handle customer support tickets' },
      { title: 'Follow-up Tracking', slug: 'follow-ups', description: 'Never miss a follow-up' },
      { title: 'Analytics Dashboard', slug: 'analytics', description: 'Data-driven insights' },
      { title: 'Activity Tracking', slug: 'activity-tracking', description: 'Monitor all activities' },
    ]
  },
  {
    title: 'User Management',
    description: 'Manage users, roles, and permissions',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    articles: [
      { title: 'User Roles', slug: 'user-roles', description: 'Understanding different user types' },
      { title: 'Permissions', slug: 'permissions', description: 'Configure access controls' },
      { title: 'Team Collaboration', slug: 'team-collaboration', description: 'Work together effectively' },
    ]
  },
  {
    title: 'Settings & Configuration',
    description: 'Customize TrackNexus to fit your needs',
    icon: Settings,
    color: 'from-gray-500 to-slate-500',
    articles: [
      { title: 'General Settings', slug: 'general-settings', description: 'Basic configuration options' },
      { title: 'Email Preferences', slug: 'email-settings', description: 'Configure email notifications' },
      { title: 'API Integration', slug: 'api-integration', description: 'Connect with external services' },
      { title: 'Data Export', slug: 'data-export', description: 'Export your data' },
    ]
  },
  {
    title: 'Security & Privacy',
    description: 'Keep your data safe and secure',
    icon: Shield,
    color: 'from-green-500 to-teal-500',
    articles: [
      { title: 'Security Overview', slug: 'security', description: 'How we protect your data' },
      { title: 'Two-Factor Authentication', slug: '2fa', description: 'Add an extra layer of security' },
      { title: 'Privacy Settings', slug: 'privacy', description: 'Control your privacy settings' },
      { title: 'Data Backup', slug: 'backup', description: 'Automatic backup solutions' },
    ]
  },
  {
    title: 'Troubleshooting',
    description: 'Common issues and their solutions',
    icon: HelpCircle,
    color: 'from-red-500 to-pink-500',
    articles: [
      { title: 'Common Issues', slug: 'common-issues', description: 'Frequently encountered problems' },
      { title: 'Performance Tips', slug: 'performance', description: 'Optimize your experience' },
      { title: 'Error Messages', slug: 'error-messages', description: 'Understanding error codes' },
      { title: 'Contact Support', slug: 'contact-support', description: 'Get help from our team' },
    ]
  }
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-cyan-600" />
            <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to know about TrackNexus. Find guides, tutorials, and detailed information about all features.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Need Help? Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docsSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`p-6 bg-gradient-to-r ${section.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <p className="text-white/90">{section.description}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {section.articles.map((article, articleIndex) => (
                    <Link
                      key={articleIndex}
                      href={`/docs/${article.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-500">{article.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/docs/quick-start" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <Zap className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
            </Link>
            <Link href="/docs/lead-management" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Lead Management</h3>
            </Link>
            <Link href="/docs/security" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Security</h3>
            </Link>
            <Link href="/docs/common-issues" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <HelpCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Troubleshooting</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?{' '}
            <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Contact our support team
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            © 2024 TrackNexus. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
