"use client";

import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";

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
    href: "tel:+917005327623",
    label: "Phone",
    icon: Phone,
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
        <div className="flex flex-wrap items-center gap-3 overflow-visible pb-1 sm:gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="touch-manipulation active:opacity-75"
            >
              <div className="justify-center rounded-xl border transition-all duration-200 border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 shadow-sm hover:shadow-md h-9 px-3 flex items-center gap-2 whitespace-nowrap select-none">
                <link.icon className="size-[14px] shrink-0 text-neutral-800 dark:text-white/80" />
                <span className="text-xs font-medium leading-none text-neutral-800 dark:text-white/80">
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
