import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Track Nexus",
  description: "Privacy Policy for Track Nexus time tracking software",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-highlight to-[#043050] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl opacity-90">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This may include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and profile information</li>
                  <li>Time tracking data and project information</li>
                  <li>Usage data and preferences</li>
                  <li>Communication records when you contact us</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Detect and prevent fraud and abuse</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With trusted service providers who assist in operating our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. This includes 
                  encryption, secure servers, and regular security assessments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability where technically feasible</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>APPIT SOFTWARE SOLUTIONS PVT LTD</strong><br />
                    Email: privacy@tracknexus.com<br />
                    Phone: +91 9876543210
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mt-8">
                  This Privacy Policy was last updated on January 21, 2025.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 