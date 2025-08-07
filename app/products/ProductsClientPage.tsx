"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Users, BarChart3, Clock, Shield, Zap, Target, KanbanSquare, ListTodo, TrendingUp, ClipboardCheck, Briefcase, Settings } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ImageTextSection } from "@/components/image-text-section"

const features = [
  {
    icon: Clock,
    title: "Projects & Timesheets",
    description:
      "Track Nexus provides powerful usage analytics to track how time, tools, and tasks are used across your organization. Gain insights into productivity trends and workflow efficiency for smarter decision-making.",
    image: "/images/product/card1.jpg?height=300&width=400",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track Nexus provides powerful usage analytics to track how time, tools, and tasks are used across your organization. Gain insights into productivity trends and workflow efficiency for smarter decision-making.",
    image: "/images/product/card2.jpg?height=300&width=400",
  },
  {
    icon: Users,
    title: "Hybrid & Remote",
    description:
      "Track Nexus provides powerful usage analytics to track how time, tools, and tasks are used across your organization. Gain insights into productivity trends and workflow efficiency for smarter decision-making.",
    image: "/images/product/card3.jpg?height=300&width=400",
  },
]

const benefits = [
  { icon: Zap, title: "Instant Setup", description: "Get started in minutes with our intuitive interface" },
  { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and data protection" },
  { icon: Target, title: "Precision Tracking", description: "Accurate time logging with GPS and facial recognition" },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live insights into team productivity and performance",
  },
]

const productFeatures = [
  {
    name: "Monitoring",
    icon: Target,
    description: "Real-time monitoring empowers informed decisions that elevate employee productivity and optimize team performance.",
    gradient: "from-cyan-400 to-teal-400",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400",
    shadowColor: "shadow-cyan-400/50",
  },
  {
    name: "Employee Productivity",
    icon: TrendingUp,
    description: "Employee productivity measures how efficiently employees complete tasks. Higher productivity leads to better business outcomes.",
    gradient: "from-indigo-400 to-violet-400",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400",
    shadowColor: "shadow-indigo-400/50",
  },
  {
    name: "Project Management",
    icon: Briefcase,
    description: "Project management ensures tasks are planned, organized, and completed efficiently to meet goals, deadlines, and optimize resource utilization for successful.",
    gradient: "from-purple-400 to-fuchsia-400",
    color: "text-purple-400",
    bgColor: "bg-purple-400",
    shadowColor: "shadow-purple-400/50",
  },
  {
    name: "Time Tracking",
    icon: Settings,
    description: "Time tracking ensures tasks are planned, organized, and completed efficiently to meet goals, deadlines, and optimize resource utilization for successful.",
    gradient: "from-pink-400 to-rose-400",
    color: "text-pink-400",
    bgColor: "bg-pink-400",
    shadowColor: "shadow-pink-400/50",
  },
  {
    name: "Task Tracking",
    icon: ClipboardCheck,
    description: "Task tracking monitors progress and completion of tasks to ensure accountability, meet deadlines, and maintain productivity throughout a project or workflow.",
    gradient: "from-red-400 to-orange-400",
    color: "text-red-400",
    bgColor: "bg-red-400",
    shadowColor: "shadow-red-400/50",
  },
];

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient, className = "" }: FeatureCardProps) => (
  <div
    className={`group relative p-8 rounded-2xl bg-gray-900 text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
  >
    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-white/10 rounded-lg mr-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

const AnimatedFeatureTimeline = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Features of Employee Management Software
          </h2>
        </motion.div>

        <div className="relative">
          {/* The connecting line */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-full bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* The feature nodes */}
          <div className="relative flex justify-between items-center">
            {productFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  className="flex flex-col items-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.3 }}
                >
                  {/* Node and Number */}
                  <div
                    className={`relative flex flex-col items-center ${
                      index % 2 === 0 ? "mb-24" : "mt-24"
                    }`}
                  >
                    <span
                      className={`absolute font-bold text-2xl opacity-50 -top-10 ${feature.color}`}
                    >
                      0{index + 1}
                    </span>
                    <div
                      className={`relative flex items-center justify-center w-24 h-24 bg-white rounded-2xl border-2 border-gray-100 shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:scale-110 group-hover:shadow-2xl ${feature.shadowColor}`}
                    >
                      <div className="absolute inset-0 bg-white rounded-2xl"></div>
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 ${feature.bgColor}`}
                      ></div>
                      <Icon
                        className={`relative z-10 w-12 h-12 transition-colors duration-300 ${feature.color}`}
                      />
                    </div>
                  </div>

                  {/* Text Label */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-1 mb-2 rounded-full ${feature.bgColor}`} />
                    <p className="font-semibold text-gray-700">{feature.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ProductsClientPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white px-4 py-20 lg:px-8 lg:py-32">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/images/aboutus/banner.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Track Nexus
          </motion.h1>

          <motion.p
            className="text-lg lg:text-xl mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Leave manual tracking behind. Track Nexus automates employee monitoring, time logging, and performance
            insights—so you can focus on growth, not micromanagement.
          </motion.p>

          <motion.div
            className="text-2xl lg:text-3xl font-script italic text-highlight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start Now- It&apos;s Free
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-highlight rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </section>

      {/* Transforming Workflows Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageTextSection
          title={
            <>
              Transforming Workflows with <span className="text-highlight">Intelligent Employee Tracking</span>
            </>
          }
          description={
            <>
              <p>
                <span className="font-semibold text-highlight">Track Nexus</span> brings a smarter approach to managing
                time and productivity. Our AI-powered platform automates employee tracking, including precise
                login/logout times, activity monitoring, and real-time performance insights.
              </p>
              <p>
                Designed to reduce micromanagement and increase transparency, Track Nexus helps organizations streamline
                workflows, identify productivity gaps, and make data-driven decisions.
              </p>
            </>
          }
          imageSrc="/images/product/engine.png?height=400&width=400"
          imageAlt="Intelligent workflow automation gears"
          imagePosition="right"
          backgroundColor="gray"
        />
      </motion.div>

       {/* Demo Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8 lg:px-8 lg:py-12 relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-highlight">Why Choose Us?</span> See how{" "}
              <span className="text-highlight">Track Nexus</span> simplifies workforce tracking
            </h2>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ y }}
          >
            <div className="relative mx-auto max-w-4xl">
              <Image
                src="/images/product/laptop.png?height=500&width=800"
                alt="Track Nexus dashboard demo on laptop"
                width={800}
                height={500}
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              {/* <motion.button
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Explore the <span className="text-highlight">Features Powering</span> Track Nexus
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={`${feature.title} feature demonstration`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-highlight rounded-lg flex items-center justify-center mr-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-highlight">{feature.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Management Features */}
      {/* <section className="bg-gray-50 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
          
            <Image
              src="/images/product/features.png?height=600&width=1000"
              alt="Employee management software features overview"
              width={800}
              height={400}g
              className="w-full max-w-8xl h-auto mx-auto"
            />
          </motion.div>
        </div>
      </section> */}

      <AnimatedFeatureTimeline />

      {/* New Feature Card Section */}
      <section className="bg-white py-16 lg:py-24">g
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {productFeatures.slice(0, 4).map((feature) => (
              <FeatureCard
                key={feature.name}
                icon={feature.icon}
                title={feature.name}
                description={feature.description}
                gradient={feature.gradient}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {productFeatures[4] && (
              <div className="w-full max-w-md">
                <FeatureCard
                  icon={productFeatures[4].icon}
                  title={productFeatures[4].name}
                  description={productFeatures[4].description}
                  gradient={productFeatures[4].gradient}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Feature Sections with alternating layouts */}
      <section className="bg-white py-16 lg:py-24">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            &quot;Track Nexus,{' '}
            <span className="text-highlight">Smart Features for Seamless Time Tracking</span>&quot;
          </h2>
        </div>
        <div className="flex flex-col space-y-16 lg:space-y-24">
          <ImageTextSection
            title="Monitoring"
            description={
              <p>
                Track Nexus offers comprehensive employee monitoring to help teams stay accountable and productive. The
                system automatically tracks work hours, captures activity levels based on keyboard and mouse usage, and
                logs applications and websites accessed during work hours. For enhanced visibility, optional screenshot
                capture can be enabled at regular intervals. Managers can view real-time dashboards showing who is
                working, on what, and for how long—helping identify bottlenecks, optimize workloads, and ensure
                compliance.
              </p>
            }
            imageSrc="/images/product/1.jpg?height=400&width=300"
            imageAlt="Employee monitoring dashboard interface"
            imagePosition="left"
          />

          <ImageTextSection
            title="Employee Productivity"
            description={
              <p>
                Track Nexus helps you boost employee productivity with data-driven insights and clear performance
                metrics. The platform tracks time spent on tasks, highlights productive vs. idle hours, and identifies
                patterns that impact efficiency. With daily, weekly, and project-based productivity reports, managers
                can easily spot top performers and areas needing support. Custom productivity benchmarks and activity
                summaries enable smarter decision-making—whether it&apos;s optimizing workload distribution, identifying
                training needs, or improving time management across teams. Empower your team to work smarter, not
                harder.
              </p>
            }
            imageSrc="/images/product/2.jpg?height=400&width=300"
            imageAlt="Employee productivity analytics and metrics"
            imagePosition="right"
          />

          <ImageTextSection
            title="Project Management"
            description={
              <p>
                Track Nexus simplifies project management by combining time tracking with task and team oversight. Create
                projects, assign tasks, set deadlines, and monitor progress—all in one place. Track real-time hours
                logged per project and compare them against estimates to stay on schedule and within budget. With
                built-in analytics and performance metrics, managers gain clear visibility into project health, resource
                allocation, and team efficiency—ensuring every project moves forward with clarity and control.
              </p>
            }
            imageSrc="/images/product/3.jpg?height=400&width=300"
            imageAlt="Project management dashboard with team collaboration"
            imagePosition="left"
          />

          <ImageTextSection
            title="Task Tracking"
            description={
              <p>
                Track Nexus offers precise task tracking to help teams stay organized and focused. Assign tasks, set
                priorities, and monitor progress in real time. Each task is linked to time entries, allowing you to see
                exactly how time is spent and which tasks are driving productivity. With visual dashboards and status
                updates, team members and managers can stay aligned, meet deadlines, and keep workflows
                efficient—all without the need for manual updates or check-ins.
              </p>
            }
            imageSrc="/images/product/4.jpg?height=400&width=300"
            imageAlt="Task tracking illustration with clock and calendar"
            imagePosition="right"
          />

          <ImageTextSection
            title="Time Tracking"
            description={
              <p>
                Track Nexus provides accurate and effortless time tracking to capture every billable and non-billable
                hour. With intuitive timers, manual entry options, and automated tracking, teams of any size can record
                work hours seamlessly. Real-time tracking ensures up-to-date logs, while detailed reports help analyze
                time allocation across projects, tasks, and clients. This feature empowers organizations to improve
                billing accuracy, optimize productivity, and make data-driven decisions with ease.
              </p>
            }
            imageSrc="/images/product/5.jpg?height=400&width=300"
            imageAlt="Time tracking on mobile device with calendar and clock"
            imagePosition="left"
          />
        </div>
      </section>
    </div>
  )
}
