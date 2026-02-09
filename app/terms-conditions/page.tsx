import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - Track Nexus",
  description: "Terms and Conditions for Track Nexus time tracking software",
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-highlight to-[#043050] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl opacity-90">
              Please read these terms and conditions carefully before using our services.
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using Track Nexus services, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-700 mb-4">
                  Track Nexus provides time tracking and employee management software services. Our services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Time tracking and attendance monitoring</li>
                  <li>Project management and reporting</li>
                  <li>Employee productivity analytics</li>
                  <li>Mobile applications and integrations</li>
                  <li>Customer support and training</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  To access certain features of our service, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
                <p className="text-gray-700 mb-4">
                  You agree not to use our services to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper operation of our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  For paid services:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Fees are charged in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                  <li>Failure to pay may result in service suspension</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Protection</h2>
                <p className="text-gray-700">
                  We are committed to protecting your data. Your use of our services is also governed by our 
                  Privacy Policy. We implement appropriate security measures to protect against unauthorized 
                  access, alteration, disclosure, or destruction of your data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
                <p className="text-gray-700">
                  We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                  We reserve the right to modify, suspend, or discontinue services with reasonable notice. 
                  Scheduled maintenance will be communicated in advance when possible.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, Track Nexus shall not be liable for any indirect, 
                  incidental, special, or consequential damages resulting from your use of our services. 
                  Our total liability shall not exceed the amount paid by you for the services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-700">
                  Either party may terminate the agreement at any time. Upon termination, your access to 
                  the services will cease, and we may delete your data after a reasonable period. 
                  Provisions that should survive termination will remain in effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. We will notify users of significant 
                  changes via email or through our service. Continued use of our services after changes 
                  constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-700">
                  If you have questions about these Terms & Conditions, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>APPIT SOFTWARE SOLUTIONS PVT LTD</strong><br />
                    Email: legal@tracknexus.com<br />
                    Phone: +91 9876543210<br />
                    Address: [Your Business Address]
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mt-8">
                  These Terms & Conditions were last updated on January 21, 2025.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 