"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/bappadityapaul",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/bappadityapaul",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:bappadityap89@gmail.com",
    label: "Mail",
    icon: Mail,
  },
  {
    href: "/resume.pdf",
    label: "Resume",
    icon: FileText,
  },
];

export function ConnectSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="connect">
      <header className="screen-line-after px-4">
        <h2 className="font-pixel text-3xl font-semibold py-4">Connect</h2>
      </header>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="touch-manipulation active:opacity-75"
            >
              <div className="flex items-center gap-1.5 whitespace-nowrap select-none rounded-lg border border-edge bg-background px-3 h-8 text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground hover:border-muted-foreground/30">
                <link.icon className="size-[13px] shrink-0" />
                <span className="font-mono text-xs leading-none">
                  {link.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
