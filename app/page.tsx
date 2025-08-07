"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ImageTextSection } from "@/components/image-text-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { ContactPopup, FormContext } from "@/components/contact-popup";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoTrain } from "@/components/logo-train";
import { PhoneIcon, ArrowRight } from "lucide-react";
import AiFeaturesForModernTeams from "@/components/AiFeaturesForModernTeams";

export default function HomePage() {
  const heroRef = useRef(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({ type: "demo" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end end"],
  });

  type FAQ = {
    id: number;
    question: string;
    answer: string;
  };

  const defaultHomepageFaqs: FAQ[] = [
    {
      id: 1,
      question: "What is Track Nexus used for?",
      answer:
        "Track Nexus is a time tracking and productivity management software designed to help businesses monitor employee performance, manage work hours, and gain real-time insights into team activities. It helps improve efficiency, reduce time wastage, and boost overall productivity.",
    },
    {
      id: 2,
      question: "How does Track Nexus track employee time?",
      answer:
        "Track Nexus automatically records employee work hours through its desktop or mobile application. It tracks active and idle time, login and logout hours, and app and website usage to provide managers with a clear view of how time is spent during the workday.",
    },
    {
      id: 3,
      question: "Can Track Nexus be used for remote teams?",
      answer:
        "Yes, Track Nexus is ideal for remote, hybrid, and in-office teams. It provides real-time visibility into employee performance, regardless of where they work, helping organizations manage distributed teams effectively.",
    },
    {
      id: 4,
      question: "Is employee data secure with Track Nexus?",
      answer:
        "Absolutely. Track Nexus takes data security seriously and uses encryption and secure servers to protect sensitive information. Only authorized users can access the data, and companies can control permissions and visibility.",
    },
    {
      id: 5,
      question: "Can Track Nexus help with employee performance reviews?",
      answer:
        "Yes. Track Nexus provides detailed reports and analytics on each employee's productivity trends, attendance, and activity patterns. This data can be used to support fair and data-driven performance reviews.",
    },
    {
      id: 6,
      question: "Does Track Nexus integrate with other tools?",
      answer:
        "Track Nexus offers integrations with popular tools like project management platforms, communication apps, and more. This helps streamline workflows and keep all your productivity tools connected in one place.",
    },
    {
      id: 7,
      question: "Is Track Nexus easy to set up?",
      answer:
        "Yes, Track Nexus is user-friendly and easy to deploy. Whether you're managing a small team or a large workforce, the onboarding process is simple and the interface is intuitive.",
    },
  ];

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0A001A] text-white px-4 py-24 sm:px-6 lg:px-8"
        ref={heroRef}
      >
        {/* Background Grid and Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "2rem 2rem",
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl -mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
                Maximize Efficiency with
                <br />
                Intuitive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  AI-Based
                </span>{" "}
                Time Tracking
              </h1>

              <p className="text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 text-gray-300 mb-10">
                Your new go-to time tracking tool — free forever, no user cap.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-highlight text-white hover:bg-blue-700 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform shadow-lg group"
                  onClick={() => {
                    setFormContext({ type: "free-trial" });
                    setIsContactPopupOpen(true);
                  }}
                >
                  Start Your Free 7-Day Trial
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="group relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(-20deg)_rotateX(10deg)] hover:[transform:rotateY(0)_rotateX(0)]">
                <Image
                  src="/images/hero1.png"
                  alt="Track Nexus dashboard and smartwatch interface"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <div className="absolute -inset-2 rounded-xl border-2 border-highlight/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* AI Features for Modern Teams */}
      <AiFeaturesForModernTeams />

      {/* Workflow Insights Section */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Unified Workflow <span className="text-highlight">Insights</span>{" "}
              & <span className="text-highlight">Output Optimizer</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/landingpage/values.png?height=500&width=800"
              alt="Unified workflow insights and output optimizer diagram"
              width={800}
              height={500}
              className="w-full max-w-4xl h-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "96% More Productivity",
                alt: "Productivity analytics visualization",
              },
              {
                title: "40% More Profitability",
                alt: "Profitability growth chart",
              },
              {
                title: "100% Transparency",
                alt: "Transparency and verification interface",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={`/images/landingpage/${
                      index + 1
                    }.jpg?height=200&width=300`}
                    alt={card.alt}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#096EB6" }}
                  >
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
        <span className="text-highlight">Track Nexus </span>
        takes the hassle out of time tracking, no matter your team size.
      </h2>

      {/* Feature Sections with alternating layouts */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title="Effortless time tracking so you can start tracking instantly"
          titleColor="text-highlight"
          description={
            <>
              <p className="mb-4">
                <span className="text-highlight font-semibold">
                  Track Nexus
                </span>{" "}
                simplifies time tracking across{" "}
                <span className="text-highlight font-semibold">
                  desktop, mobile, and web
                </span>
                , letting users log hours effortlessly anytime, anywhere—even
                offline with real-time sync. With one-click timers, intuitive
                reporting, and features like GPS tracking, geofencing, and
                automated reminders, teams stay efficient and accountable.
              </p>
              <p>
                Managers can easily approve hours and export timesheets for
                payroll or billing. Track Nexus ensures security and compliance
                with enterprise-grade protection, offering a hassle-free,
                zero-cost start for smarter time tracking.
              </p>
            </>
          }
          imageSrc="/images/landingpage/left1.jpg?height=400&width=500"
          imageAlt="Track Nexus multi-device interface"
          imagePosition="left"
          backgroundColor="white"
        />
      </motion.div>

      {/* Strategic Project Leadership with Video */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:grid-flow-col-dense">
            {/* Video - Right Side */}
            <motion.div
              className="relative lg:col-start-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto rounded-2xl"
              >
                <source
                  src="/images/landingpage/officeman.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Content - Left Side */}
            <motion.div
              className="space-y-6 lg:col-start-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                <span className="text-highlight">Strategic Project</span>{" "}
                leadership
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 mb-4 border-l-highlight">
                  <p className="text-gray-700 italic">
                    &ldquo;Accelerate your path to project success with streamlined
                    execution.&rdquo;
                  </p>
                </div>
                <p>
                  Integrate{" "}
                  <span className="text-highlight font-semibold">
                    Track Nexus
                  </span>{" "}
                  time tracking software with advanced project management tools
                  to effortlessly log hours across tasks and projects, ensuring
                  accurate billing and resource allocation. This seamless
                  connection reduces manual work, improves productivity, and
                  helps you deliver projects on time and within budget.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title="Track Nexus syncs with your favorite apps."
          titleColor="text-highlight"
          subtitle="Bring your workflow together for smoother operations."
          description="Easily synchronize timesheets, activities, and projects with leading apps and platforms like Xero, QuickBooks Online, Deel, Zapier, and others. Avoid duplicate data entry and maintain consistent, accurate information across your entire workflow."
          imageSrc="/images/landingpage/3.jpg?height=300&width=500"
          imageAlt="App synchronization interface"
          imagePosition="left"
          backgroundColor="white"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title="Elevating time tracking to The Next level"
          titleColor="text-gray-900"
          subtitle="For dynamic work environments"
          description={
            <p>
              <span className="text-highlight font-semibold">Track Nexus</span>{" "}
              offers advanced features like facial recognition and GPS tracking
              to ensure precise time logging and secure attendance. Whether your
              team is on-site or working remotely, you can prevent buddy
              punching and gain real-time location insights. It&apos;s a smart way to
              maintain accuracy, accountability, and control across your
              workforce—wherever work happens.
            </p>
          }
          imageSrc="/images/landingpage/right1.png?height=400&width=500"
          imageAlt="Advanced time tracking illustration"
          imagePosition="right"
          backgroundColor="white"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title="Automatic Timesheets"
          titleColor="text-highlight"
          subtitle="Easily monitor and understand how your team allocates their time."
          description={
            <p>
              Generate detailed timesheets based on employee tracked time.{" "}
              <span className="text-highlight font-semibold">Track Nexus</span>{" "}
              automatically calculates total hours, overtime, and breaks,
              ensuring accuracy and saving you valuable time. Export reports
              instantly for payroll, project billing, or compliance. Customize
              views by project, team, or date range for clearer insights. Say
              goodbye to manual errors and enjoy seamless, automated time
              management.
            </p>
          }
          imageSrc="/images/landingpage/man.png?height=400&width=500"
          imageAlt="Automatic timesheet analytics"
          imagePosition="left"
          backgroundColor="gray"
        />
      </motion.div>

      {/* Detailed Reporting & Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title="Detailed Reporting & Analytics"
          titleColor="text-highlight"
          description={
            <p>
              <span className="text-highlight font-semibold">Track Nexus</span>{" "}
              simplifies time tracking across{" "}
              <span className="text-highlight font-semibold">
                desktop, mobile, and web
              </span>
              , letting users log hours effortlessly anytime, anywhere—even
              offline with real-time sync. With one-click timers, intuitive
              reporting, and features like GPS tracking, geofencing, and
              automated reminders, teams stay efficient and accountable.
              Managers can easily approve hours and export timesheets for
              payroll or billing. Track Nexus ensures security and compliance
              with enterprise-grade protection, offering a hassle-free,
              zero-cost start for smarter time tracking.
            </p>
          }
          imageSrc="/images/landingpage/right2.jpg?height=400&width=500"
          imageAlt="Detailed reporting and analytics dashboard"
          imagePosition="right"
          backgroundColor="white"
        />
      </motion.div>

      {/* Final CTA Section */}
      <section className="bg-gray-50 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image - Left Side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 flex items-center justify-center"
                style={{ minHeight: "400px" }}
              >
                <Image
                  src="/images/landingpage/left1.png?height=400&width=500"
                  alt="Track Nexus interface preview"
                  width={500}
                  height={400}
                  className="w-full h-auto max-h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Content - Right Side */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Don&apos;t settle{" "}
                <span className="text-highlight">
                  for just any Time Tracking software!
                </span>
              </h3>
              <h4 className="text-xl font-semibold text-highlight">
                The best free time tracking app
              </h4>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Sign up for a free account and discover why businesses of all
                  sizes trust{" "}
                  <span className="text-highlight font-semibold">
                    Track Nexus
                  </span>{" "}
                  for efficient time management and accurate timesheet tracking.
                  Experience a seamless solution that simplifies attendance,
                  enhances accountability, and integrates effortlessly with your
                  existing tools.
                </p>
                <p>
                  From real-time tracking to detailed reporting, Track Nexus
                  empowers teams to work smarter, not harder—saving time,
                  reducing errors, and boosting productivity every step of the
                  way.
                </p>
                <h5 className="text-lg font-bold italic text-highlight">
                  Start Now - It&apos;s Free
                </h5>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <LogoTrain />
      <FAQSection faqs={defaultHomepageFaqs} />

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        context={formContext}
      />
    </div>
  );
}
