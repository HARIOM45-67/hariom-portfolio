"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

import { navItems, profile, projects, skills, suggestedPrompts } from "@/data/profile";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function PortfolioPage({ hasResume }: { hasResume: boolean }) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Hariom’s portfolio assistant. Ask about the tech stack, projects, or what he is learning about AI.",
    },
  ]);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || sending) {
      return;
    }

    setQuestion("");
    setChatError("");

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "The assistant is unavailable right now.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setChatError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="site-shell overflow-x-hidden text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3 text-base font-semibold tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/40 bg-violet-400/10 font-mono text-sm text-violet-200">
              HT
            </span>
            <span>
              hariom<span className="text-violet-300">.dev</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-violet-300/40 bg-violet-400/10 px-4 py-2 text-violet-100 transition hover:bg-violet-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Let&apos;s talk
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-slate-950/90 px-5 py-4 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-2 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-violet-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-20 pt-28 md:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              MCA student • Building and learning
            </div>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-violet-300">
              Hello, I&apos;m {profile.name}
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Building digital ideas with <span className="gradient-text">code & AI.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              {profile.introduction}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Explore Projects
                <ArrowUpRight size={16} />
              </a>

              {hasResume ? (
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-violet-300/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Download Resume
                  <ArrowDown size={16} />
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full border border-amber-400/35 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-100">
                  Resume PDF pending
                </span>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-violet-300/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Github size={17} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>
              <span className="h-4 w-px bg-white/10" aria-hidden="true" />
              <span>Open to learning and internship opportunities</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-8 rounded-full bg-violet-600/15 blur-[80px]" />
            <div className="glass-card relative rounded-[28px] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Terminal size={16} className="text-violet-300" />
                  <span>hariom / developer.ts</span>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
              </div>

              <pre className="space-y-4 py-6 font-mono text-xs leading-6 text-slate-200 sm:text-sm">
                <code>{`const developer = {\n  name: "Hariom Tiwari",\n  education: "MCA · MDU Rohtak",\n  focus: ["Java", "Web", "AI"],\n  mindset: "Always learning"\n};`}</code>
              </pre>

              <div className="rounded-2xl border border-violet-300/15 bg-violet-300/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-violet-200">
                  <Sparkles size={15} />
                  <span className="text-xs font-medium">Current Mission</span>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  Growing from Java development into intelligent, AI-powered applications.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 top-12 rounded-2xl border border-blue-300/20 bg-slate-900/95 p-3 shadow-xl sm:-right-6">
              <Cpu size={20} className="text-blue-300" />
            </div>
            <div className="absolute -bottom-4 -left-3 rounded-2xl border border-violet-300/20 bg-slate-900/95 p-3 shadow-xl sm:-left-6">
              <Code2 size={20} className="text-violet-300" />
            </div>
          </motion.div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 transition hover:text-violet-200"
        >
          <ArrowDown size={18} />
        </a>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8">
        <SectionHeading eyebrow="A little about me" title="Curious mind. Builder’s mindset." />

        <div className="mt-10 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card rounded-[28px] p-7 md:p-9">
            <p className="text-lg leading-8 text-slate-300">{profile.shortBio}</p>
            <p className="mt-5 leading-7 text-slate-400">
              My current goal is to strengthen problem-solving, build projects I can explain clearly,
              and prepare for development internships and future AI engineering opportunities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <InfoTile
              icon={<GraduationCap size={18} />}
              label="Education"
              value="MCA · 1st Semester"
              detail="MDU Rohtak"
            />
            <InfoTile
              icon={<Bot size={18} />}
              label="Learning focus"
              value="Software + AI"
              detail="Building step by step"
            />
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-y border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading eyebrow="My toolkit" title="Skills I’m building with" />

          <p className="mt-4 max-w-2xl text-slate-400">
            A focused toolkit for building reliable applications and learning how AI can solve practical
            problems.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {skills.map((group, index) => (
              <motion.div
                key={group.group}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-[24px] p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">
                  {group.group}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8">
        <SectionHeading eyebrow="Selected work" title="Projects with a purpose" />

        <p className="mt-4 max-w-2xl text-slate-400">
          A few projects that reflect my learning journey and practical development work.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="glass-card group flex h-full flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-200">
                  {project.icon === "graduation" && <GraduationCap size={22} />}
                  {project.icon === "bot" && <Bot size={22} />}
                  {project.icon === "code" && <Code2 size={22} />}
                </div>
                <span className="font-mono text-[11px] text-slate-600">/{project.number}</span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                {project.category}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 transition hover:text-violet-200"
                  >
                    <Github size={15} />
                    Repository
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate-500">Repository TBD</span>
                )}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-2 text-slate-300 transition hover:text-violet-200"
                  >
                    Demo
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate-500">Demo TBD</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="assistant" className="scroll-mt-24 border-y border-violet-300/10 bg-gradient-to-r from-violet-950/25 via-sky-950/20 to-slate-950/10 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1fr_auto] md:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm text-violet-200">
              <Sparkles size={16} />
              Portfolio AI
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Curious about my work?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Ask my portfolio assistant about my skills, project goals, or technology choices. It uses the
              verified profile information configured for this site and will say when information is missing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-300 px-6 py-3 font-medium text-slate-950 transition hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Bot size={18} />
            Ask Hariom&apos;s AI
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section id="resume" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8">
        <div className="glass-card flex flex-col items-start justify-between gap-6 rounded-[28px] p-7 md:flex-row md:items-center md:p-9">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-violet-300/10 p-3 text-violet-200">
              <FileText size={23} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Resume and experience</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                {hasResume
                  ? "Your verified resume is available to download below. Replace it with the latest version when needed."
                  : "The resume PDF has not been added yet. Save your verified PDF at public/resume.pdf and the download will become available."}
              </p>
            </div>
          </div>

          {hasResume ? (
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-violet-300/35 bg-violet-400/10 px-5 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Download Resume
              <ArrowDown size={15} />
            </a>
          ) : (
            <div className="rounded-full border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Resume pending: add <span className="font-semibold">public/resume.pdf</span>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 pt-8 md:px-8">
        <div className="glass-card relative overflow-hidden rounded-[32px] p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[90px]" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
              Have an opportunity?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s build something <span className="gradient-text">meaningful.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
              I&apos;m keen to learn, collaborate on projects, and explore suitable developer internships.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Mail size={17} />
                Email me
                <ArrowUpRight size={16} />
              </a>
              <a
                href={`tel:${profile.phonePrimary.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-violet-300/35 hover:bg-white/10"
              >
                Call me
              </a>
            </div>

            <div className="mt-8 grid gap-4 text-left text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              <ContactItem icon={<Mail size={16} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactItem icon={<PhoneIcon />} label="Phone 1" value={profile.phonePrimary} href={`tel:${profile.phonePrimary.replace(/\s+/g, "")}`} />
              <ContactItem icon={<PhoneIcon />} label="Phone 2" value={profile.phoneSecondary} href={`tel:${profile.phoneSecondary.replace(/\s+/g, "")}`} />
              <ContactItem icon={<Github size={16} />} label="GitHub" value="HARIOM45-67" href={profile.github} external />
              <ContactItem icon={<Linkedin size={16} />} label="LinkedIn" value="Hariom Tiwari" href={profile.linkedin} external />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-5 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. Built with curiosity.</span>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-violet-200">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-violet-200">
              LinkedIn
            </a>
            <a href="#home" className="transition hover:text-violet-200">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {chatOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setChatOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio AI assistant"
            className="glass-card flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] shadow-2xl shadow-violet-950/40"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-300/10 p-2 text-violet-200">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-medium text-white">Hariom&apos;s AI assistant</p>
                  <p className="text-xs text-slate-500">Portfolio Q&A</p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close assistant"
                onClick={() => setChatOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4" aria-live="polite">
              <div className="mt-1 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto bg-violet-300 text-slate-950"
                        : "border border-white/10 bg-white/[0.04] text-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {sending && <p className="text-xs text-violet-200">Thinking…</p>}
                {chatError && (
                  <p role="alert" className="text-xs text-rose-300">
                    {chatError}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setQuestion(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-violet-300/35 hover:text-violet-100"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={(event) => void handleSend(event)} className="flex gap-2">
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  rows={1}
                  maxLength={500}
                  placeholder="Ask about skills or projects…"
                  className="min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-300/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending || !question.trim()}
                  aria-label="Send message"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300 text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={17} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="glass-card rounded-[24px] p-5">
      <div className="mb-4 inline-flex rounded-xl bg-violet-300/10 p-2.5 text-violet-200">{icon}</div>
      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300 transition hover:border-violet-300/35 hover:bg-white/[0.06]"
    >
      <div className="mb-2 inline-flex items-center gap-2 text-violet-200">
        {icon}
        <span className="text-[11px] uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="break-words text-base font-medium text-white">{value}</p>
    </a>
  );
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.94.37 1.86.72 2.72a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.36-1.24a2 2 0 0 1 2.11-.45c.86.35 1.78.59 2.72.72A2 2 0 0 1 22 16.92Z" /></svg>;
}
