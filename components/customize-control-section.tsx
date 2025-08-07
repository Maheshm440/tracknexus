import Image from "next/image"
import SectionHeader from "./section-header";
const data = [
  {
    id: 1, // Keeping ID for unique key prop in React
    title: "Manager-Only Access & Control",
    subtitle: "Focused Oversight", // New subtitle based on content
    description: "Allow managers to securely access only their team's data, evaluate performance metrics, and customize productivity labels—ensuring focused oversight and effective team management.",
    imageSrc: "/placeholder-image-manager-access.svg", // Placeholder, replace with actual image path if available
    imageAlt: "Manager Access Icon",
    iconSrc: "/icon-manager-access.svg", // Placeholder icon, replace with actual path
    color: "blue" // Example color, adjust as needed
  },
  {
    id: 2,
    title: "Dedicated Manager Access",
    subtitle: "Efficient Team Oversight", // New subtitle based on content
    description: "Give managers secure, role-based access to their team's data. They can monitor performance, adjust productivity labels, and make informed decisions—ensuring efficient and focused team oversight.",
    imageSrc: "/placeholder-image-dedicated-manager.svg", // Placeholder, replace with actual image path if available
    imageAlt: "Dedicated Manager Icon",
    iconSrc: "/icon-dedicated-manager.svg", // Placeholder icon, replace with actual path
    color: "orange" // Example color, adjust as needed
  },
  {
    id: 3,
    title: "Seamless API Integration",
    subtitle: "Streamlined Workflows", // New subtitle based on content
    description: "Easily connect Time Champ with any internal or third-party software using our robust REST API, enabling smooth data exchange and streamlined workflows across your organization.",
    imageSrc: "/placeholder-image-api.svg", // Placeholder, replace with actual image path if available
    imageAlt: "API Integration Icon",
    iconSrc: "/icon-api.svg", // Placeholder icon, replace with actual path
    color: "teal" // Example color, adjust as needed
  },
  {
    id: 4,
    title: "Access to Raw Data",
    subtitle: "In-depth Analysis", // New subtitle based on content
    description: "Get accurate, real-time insights into your employees' computer activity captured down to the second for in-depth analysis and complete transparency.",
    imageSrc: "/placeholder-image-raw-data.svg", // Placeholder, replace with actual image path if available
    imageAlt: "Raw Data Icon",
    iconSrc: "/icon-raw-data.svg", // Placeholder icon, replace with actual path
    color: "purple" // Example color, adjust as needed
  },
  {
    id: 5,
    title: "Real-Time Productivity Alerts",
    subtitle: "Instant Notifications", // New subtitle based on content
    description: "Stay informed with instant alerts triggered by productivity changes or unwanted activities. Monitor behavior in real time to quickly identify and respond to issues as they arise.",
    imageSrc: "/placeholder-image-alerts.svg", // Placeholder, replace with actual image path if available
    imageAlt: "Alerts Icon",
    iconSrc: "/icon-alerts.svg", // Placeholder icon, replace with actual path
    color: "orange" // Example color, adjust as needed
  },
  {
    id: 6,
    title: "Smart Solutions for Employers",
    subtitle: "Quantify Performance", // New subtitle based on content
    description: "Automated reports from a leading employee monitoring system help you quantify performance, analyze workflows, and cut operational costs by up to 40% all with greater accuracy and less effort.",
    imageSrc: "/placeholder-image-solutions.svg", // Placeholder, replace with actual image path if available
    imageAlt: "Solutions Icon",
    iconSrc: "/icon-solutions.svg", // Placeholder icon, replace with actual path
    color: "blue" // Example color, adjust as needed
  }
];
export const CustomizeControlSection = () => {
    return <section className="container mx-auto mb-20 p-4">

    <SectionHeader title="Customize and Control Your Workspace" subtitle="Leverage powerful features to manage team structures, restrict data access, and tailor Time Champ to fit your organization’s unique workflow. Stay organized, secure, and in full control"/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-10">  
    {data.map((item) => (
        <div key={item.id} style={{ borderColor: item.color }} className=" relative w-[380px] h-[430px] flex flex-col justify-center items-center gap-4 rounded-2xl border-2  text-center p-10">
        <div style={{ backgroundColor: item.color }} className="absolute h-[84px] w-[84px] flex justify-center items-center rounded-full top-0 left-0 translate-x-[170%] translate-y-[-50%]">
          <Image src={`/icon2.png`} height={25} width={25} alt=""/>
        </div>
        <div className="text-2xl">{item.title}</div>
        <p className="text-[#4F4F4F]">{item.description}</p>
      </div>
    ))}
    </div>
    </section>
}