import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Facial Recognition Attendance System | Track Nexus",
    description: "Contactless clock-in with facial recognition technology. Biometric attendance, identity verification, and secure access control for modern workplaces.",
    keywords: "facial recognition, biometric attendance, contactless clock-in, face recognition attendance, identity verification",
    alternates: { canonical: "https://tracknexus.com/facial-recognition" },
    openGraph: {
        title: "Facial Recognition Attendance System | Track Nexus",
        description: "Contactless clock-in with facial recognition technology for secure biometric attendance.",
        url: "https://tracknexus.com/facial-recognition",
    },
}

export default function FacialRecognitionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 