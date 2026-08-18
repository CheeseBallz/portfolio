import { createElement } from "react"
import type { ReactNode } from "react"
import {
  SiBurpsuite,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiKalilinux,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiOwasp,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWireshark,
} from "react-icons/si"

export interface Project {
  id: string
  title: string
  slug: string
  category: string
  year: string
  description: string
  role: string
  technologies: string[]
  features: string[]
  images: string[]
  github?: string
  liveDemo?: string
  overview: string
  problem: string
  solution: string
  results: string[]
}

export interface Experience {
  category: string
  company: string
  role: string
  period: string
  description: string
  location?: string
  companyUrl?: string
  link?: string
}

export interface StackCategory {
  category: string
  items: string[]
}

export interface SocialLink {
  label: string
  url: string
}

export interface TechLogo {
  node: ReactNode
  title: string
  href?: string
}

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const

export const personal = {
  name: "Sumaid Ahmed",
  role: "Developer & Security Engineer",
  titles: ["Cybersecurity Specialist", "SOC Analyst", "Red Team Analyst"],
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/CheeseBallz" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sumaid-ahmed-ab0386388/" },
  { label: "Email", url: "mailto:sumaidlinkedin@gmail.com" },
  { label: "Website", url: "https://sumaid.vercel.app/" },
]

export interface ContactChannel {
  label: string
  value: string
  url: string
}

export const contactChannels: ContactChannel[] = [
  { label: "Email", value: "sumaidlinkedin@gmail.com", url: "mailto:sumaidlinkedin@gmail.com" },
  { label: "LinkedIn", value: "Connect", url: "https://www.linkedin.com/in/sumaid-ahmed-ab0386388/" },
  { label: "GitHub", value: "CheeseBallz", url: "https://github.com/CheeseBallz" },
  { label: "Website", value: "sumaid.vercel.app", url: "https://sumaid.vercel.app/" },
]

export const contact = {
  subheading: "Available for freelance, contract, and founder collaborations.",
}

export const experience: Experience[] = [
  {
    category: "Certification",
    company: "Web Red Team Analyst",
    role: "CyberWareFare Labs",
    period: "2025",
    description: "",
    link: "https://labs.cyberwarfare.live/credential/achievement/698de1bb5f7c23c92b92f8ce",
  },
  {
    category: "Certification",
    company: "ISO/IEC 27001 Information Security Associate™",
    role: "SkillFront",
    period: "2026",
    description: "",
    link: "https://www.skillfront.com/Badges/14047639942139",
  },
  {
    category: "Certification",
    company: "Certified Cybersecurity Educator Professional (CCEP)",
    role: "Red Team Leaders",
    period: "Nov 17, 2025",
    description: "",
    link: "https://courses.redteamleaders.com/exam-completion/5d2c879ef237a422",
  },
  {
    category: "Certification",
    company: "Cyber Threat Intelligence 101",
    role: "arcX",
    period: "June 2026",
    description: "",
    link: "https://arcx.io/verify-certificate?id=fd6f828d05c79de415135ec4f4cc25d834243165&k=b1d6d0cc87f34e469c13660f80e76554",
  },
]

export const timeline: Experience[] = [
  {
    category: "Ethical Hacker Intern",
    company: "Axeronix Tech",
    role: "Ethical Hacker Intern",
    period: "July 2026 – Present",
    description:
      "Supported hands-on security engagements across ethical hacking, penetration testing, and web application security. Performed reconnaissance and vulnerability assessments across web, network, and application surfaces, and deepened practical command of exploitation and bug bounty methodology through structured security labs and real-world scenarios.",
    location: "Islamabad · Remote",
    companyUrl: "https://www.axeronixtech.com/",
  },
  {
    category: "Team Lead – R&D",
    company: "Devlink",
    role: "Team Lead",
    period: "2025 — Present",
    description:
      "Led the R&D team across web development projects, delegating tasks and owning delivery from requirements to launch. Audited client websites to surface technical issues and drove improvements that raised quality and performance. Worked directly with clients to translate requirements into concrete solutions and coordinate releases.",
    location: "Islamabad · Remote",
    companyUrl: "https://devlink.live/",
  },
]

export const projects: Project[] = [
  {
    id: "01",
    title: "Steganography Tool",
    slug: "steganography-tool",
    category: "Web Security Tool",
    year: "2026",
    description:
      "A secure image steganography tool that hides and extracts data within images using encryption and LSB-based steganography techniques.",
    role: "Creator & Developer",
    technologies: ["Python", "Flask", "AES", "Image Processing", "Cryptography", "Steganography"],
    features: [
      "LSB-based image steganography for PNG files",
      "AES encryption before embedding for layered protection",
      "Drag-and-drop web interface",
      "Encode and decode workflows with passphrase protection",
      "Real-time processing feedback",
    ],
    images: [
      "/project-images/Steganography%20Tool/1.png",
      "/project-images/Steganography%20Tool/2.png",
      "/project-images/Steganography%20Tool/3.png",
    ],
    liveDemo: "https://stegovault-rgoa.onrender.com/",
    overview:
      "The Steganography Tool embeds messages in the least-significant bits of image pixels so the change is invisible to the eye. Messages are AES-encrypted before embedding, and the tool provides both encode and decode workflows behind a clean web interface.",
    problem:
      "Sometimes the goal is not just encryption — it is hiding the fact that communication is happening at all. Practical steganography tools often leave out encryption or lack a usable interface.",
    solution:
      "Messages are encrypted before embedding, then written into the image's least-significant bits. A Flask interface provides drag-and-drop upload, encoding feedback, and a mirrored decoding flow protected by a passphrase.",
    results: [
      "A usable end-to-end tool for hiding and retrieving encrypted messages",
      "Firsthand experience with bit-level image manipulation",
      "A clear path toward supporting more formats and larger payloads",
    ],
  },
  {
    id: "02",
    title: "Smart Parking System",
    slug: "smart-parking-system",
    category: "Digital Logic",
    year: "2025",
    description:
      "An Arduino-based smart parking system that detects parking-slot occupancy, controls an automated barrier, and implements parking-full logic using digital logic gates.",
    role: "Creator & Developer",
    technologies: [
      "Arduino Uno",
      "IR Sensors",
      "Ultrasonic Sensor",
      "Servo Motor",
      "7404 NOT Gate",
      "7408 AND Gate",
      "C++",
    ],
    features: [
      "Real-time parking-slot occupancy detection",
      "Automatic servo-controlled barrier",
      "Ultrasonic vehicle detection at the entrance",
      "Hardware parking-full logic using 7404 NOT and 7408 AND gates",
      "Buzzer alert when the lot is full",
    ],
    images: [
      "/project-images/Smart%20Parking%20System/1.jpg",
      "/project-images/Smart%20Parking%20System/2.jpg",
      "/project-images/Smart%20Parking%20System/3.jpg",
      "/project-images/Smart%20Parking%20System/4.jpg",
    ],
    github: "https://github.com/CheeseBallz/Smart-Parking-System",
    overview:
      "Smart Parking System is a Digital Logic Design project that models a real parking lot. IR sensors track slot occupancy, an ultrasonic sensor watches the entrance, a servo raises the barrier, 7404 NOT and 7408 AND gates compute the parking-full state directly in hardware, and a buzzer alerts drivers to the lot's status.",
    problem:
      "Finding a free slot in a busy lot wastes time and fuel while poorly managed barriers leave cars queuing at unmonitored gates. Beyond the practical problem, many implementations bury the occupancy logic in software, losing the value of real gate-level design.",
    solution:
      "Occupancy signals from each slot are combined through 7404 NOT and 7408 AND gates so full-vs-available is decided in hardware. When space remains the servo lets vehicles in; when full the barrier holds and the buzzer alerts drivers.",
    results: [
      "A functioning smart-parking prototype with occupancy sensing, an automated barrier, and full-lot alerting",
      "Firsthand application of digital logic fundamentals (NOT/AND gates) to a real system",
      "A scalable reference model for occupancy detection and entrance control",
    ],
  },
  {
    id: "03",
    title: "Anti-Sleeping Alarm",
    slug: "anti-sleeping-alarm",
    category: "Embedded Systems",
    year: "2025",
    description:
      "An Arduino-based driver safety system that monitors eye activity and detects prolonged eye closure to provide an immediate drowsiness alert.",
    role: "Creator & Developer",
    technologies: [
      "Arduino Nano",
      "Embedded Systems",
      "IR Sensor (HW-201)",
      "Relay Module",
      "Buzzer",
      "DC Motor",
    ],
    features: [
      "Real-time eye blink detection",
      "Drowsiness detection via IR eye sensor",
      "Buzzer alert after prolonged eye closure",
      "Automatic motor control via relay module",
      "Time-based detection to reduce false triggers",
    ],
    images: [
      "/project-images/Anti-Sleeping%20Alarm/1.jpg",
      "/project-images/Anti-Sleeping%20Alarm/2.jpg",
      "/project-images/Anti-Sleeping%20Alarm/3.jpg",
      "/project-images/Anti-Sleeping%20Alarm/4.jpg",
    ],
    github: "https://github.com/CheeseBallz/anti-aleeping-alarm",
    overview:
      "Anti-Sleeping Alarm is a hardware driver-safety system built for an Applied Physics project. It tracks blink activity with an infrared eye sensor, and when the eyes stay closed past a calibrated threshold it raises an immediate drowsiness alert.",
    problem:
      "Driver fatigue is a leading cause of road accidents. Camera-based drowsiness detection is effective but expensive and hard to deploy reliably in a low-cost embedded setting that can sit on a real vehicle.",
    solution:
      "An IR sensor monitors blink activity in real time. When the eyes remain closed beyond a tuned time window, the system sounds a buzzer and automatically cuts power to a DC motor through a relay module — a direct cue for the driver to stop or rest.",
    results: [
      "A working drowsiness-detection prototype with an audible alert and automatic motor cutoff",
      "Hands-on experience designing and debugging embedded hardware and control logic",
      "A low-cost demonstration of how hardware can address a real road-safety problem",
    ],
  },
]

export const stackCategories: StackCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Security",
    items: ["Cryptography", "Web Security", "Network Security", "Application Security"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "GraphQL", "Python", "WebSockets"],
  },
  {
    category: "DevOps & Infrastructure",
    items: ["Docker", "Linux", "CI/CD", "GitHub Actions", "Vercel"],
  },
]

export const techLogos: TechLogo[] = [
  { node: createElement(SiReact), title: "React", href: "https://react.dev" },
  { node: createElement(SiNextdotjs), title: "Next.js", href: "https://nextjs.org" },
  { node: createElement(SiTypescript), title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: createElement(SiTailwindcss), title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: createElement(SiFramer), title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: createElement(SiNodedotjs), title: "Node.js", href: "https://nodejs.org" },
  { node: createElement(SiExpress), title: "Express", href: "https://expressjs.com" },
  { node: createElement(SiGraphql), title: "GraphQL", href: "https://graphql.org" },
  { node: createElement(SiPython), title: "Python", href: "https://www.python.org" },
  { node: createElement(SiDocker), title: "Docker", href: "https://www.docker.com" },
  { node: createElement(SiLinux), title: "Linux", href: "https://www.linux.org" },
  { node: createElement(SiGit), title: "Git", href: "https://git-scm.com" },
  { node: createElement(SiGithubactions), title: "GitHub Actions", href: "https://github.com/features/actions" },
  { node: createElement(SiVercel), title: "Vercel", href: "https://vercel.com" },
  { node: createElement(SiKalilinux), title: "Kali Linux", href: "https://www.kali.org" },
  { node: createElement(SiBurpsuite), title: "Burp Suite", href: "https://portswigger.net" },
  { node: createElement(SiWireshark), title: "Wireshark", href: "https://www.wireshark.org" },
  { node: createElement(SiOwasp), title: "OWASP", href: "https://owasp.org" },
]
