"use client";

import dynamic from "next/dynamic";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { FileTextIcon } from "@/components/icons/FileTextIcon";

const MagneticButton = dynamic(() => import("@/components/MagneticButton"), { ssr: false });

const socialLinks = [
  {
    href: "https://github.com/bappaditya-paul",
    label: "GitHub",
    icon: GithubIcon,
    newTab: true,
    fill: "#18181b",
    textColor: "#fafafa",
    sweepColor: "#4078c8",
    sweepTextColor: "#ffffff",
    borderOptions: { color: "#3f3f46", width: 1 },
  },
  {
    href: "https://www.linkedin.com/in/bappaditya987/",
    label: "LinkedIn",
    icon: LinkedinIcon,
    newTab: true,
    fill: "#0a66c2",
    textColor: "#ffffff",
    sweepColor: "#004182",
    sweepTextColor: "#ffffff",
    borderOptions: { color: "#0a66c2", width: 1 },
  },
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=bappadityap89@gmail.com",
    label: "Mail",
    icon: MailIcon,
    newTab: true,
    fill: "var(--background)",
    textColor: "var(--muted-foreground)",
    sweepColor: "var(--foreground)",
    sweepTextColor: "var(--background)",
    borderOptions: { color: "var(--edge)", width: 1 },
  },
  {
    href: "https://drive.google.com/file/d/1YMafC7v-3ZVpLCnATcqASHJTp3dm5UTu/view?usp=sharing",
    label: "Resume",
    icon: FileTextIcon,
    newTab: true,
    fill: "var(--background)",
    textColor: "var(--muted-foreground)",
    sweepColor: "var(--foreground)",
    sweepTextColor: "var(--background)",
    borderOptions: { color: "var(--edge)", width: 1 },
  },
];

export function ConnectSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="connect">
      <header className="screen-line-after px-4">
        <h2 className="font-pixelify text-2xl font-semibold tracking-tight py-4">Connect</h2>
      </header>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-3 pb-1">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <MagneticButton
                key={link.label}
                link={link.href}
                newTab={link.newTab}
                label={link.label}
                fill={link.fill}
                textColor={link.textColor}
                sweepColor={link.sweepColor}
                sweepTextColor={link.sweepTextColor}
                border={true}
                borderOptions={link.borderOptions}
                paddingX={20}
                paddingY={10}
                radius={10}
                magnet={8}
                font={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: "1em",
                  letterSpacing: "-0.01em",
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.3,
                }}
                style={{ gap: 6 }}
              />
            );
          })}
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Feel free to reach out — always open to interesting conversations and opportunities.
        </p>
      </div>
    </section>
  );
}
