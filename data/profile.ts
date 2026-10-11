export const profile = {
  name: "Hariom Tiwari",
  headline: "Building digital ideas with code & AI.",
  introduction:
    "I'm an MCA student at MDU Rohtak, a Java developer, and an aspiring AI engineer. I enjoy building practical software projects while exploring AI-powered solutions to real-world problems.",
  shortBio:
    "I’m an MCA student at Maharshi Dayanand University, Rohtak, building a strong foundation in software development. I enjoy working with Java and web technologies, and I’m exploring how AI can make applications more helpful.",
  email: "tiwarihariom211@gmail.com",
  phonePrimary: "+91 6206152782",
  phoneSecondary: "+91 7859031017",
  github: "https://github.com/HARIOM45-67",
  linkedin: "https://www.linkedin.com/in/hariom-tiwari-913a8537a",
};

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#assistant", label: "AI Assistant" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export const skills = [
  { group: "Programming", items: ["Java"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript"] },
  { group: "Frameworks", items: ["Next.js", "React", "Tailwind CSS"] },
  { group: "Tools", items: ["Git", "GitHub"] },
  { group: "AI", items: ["AI fundamentals", "API integration"] },
];

export const projects = [
  {
    number: "01",
    title: "Student Management System",
    category: "Java / Database",
    description:
      "A student record management application designed to organize student information and simplify common academic tasks.",
    technologies: ["Java", "MySQL", "OOP"],
    repoUrl: null,
    demoUrl: null,
    icon: "graduation",
  },
  {
    number: "02",
    title: "AI Portfolio Assistant",
    category: "Generative AI / API",
    description:
      "An AI assistant designed to answer questions about my portfolio, skills and projects using configured profile information.",
    technologies: ["Next.js", "TypeScript", "OpenAI API"],
    repoUrl: null,
    demoUrl: null,
    icon: "bot",
  },
  {
    number: "03",
    title: "Personal Developer Portfolio",
    category: "Web Development",
    description:
      "A responsive personal website showcasing my skills, projects, resume and contact information.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    repoUrl: null,
    demoUrl: null,
    icon: "code",
  },
];

export const suggestedPrompts = [
  "What technologies does Hariom use?",
  "Tell me about the Student Management System.",
  "What is Hariom learning about AI?",
];
