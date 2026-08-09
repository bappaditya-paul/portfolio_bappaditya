"use client";

import { Code, Cpu, Server, Layout, Cloud } from "lucide-react";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      color: "text-[#4F9DFF]",
      skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "Bash"],
    },
    {
      title: "AI & Data Science",
      icon: Cpu,
      color: "text-[#8B5CF6]",
      skills: [
        "PyTorch",
        "TensorFlow",
        "OpenCV",
        "Scikit-learn",
        "LangChain",
        "LlamaIndex",
        "Hugging Face",
      ],
    },
    {
      title: "Backend & Systems",
      icon: Server,
      color: "text-emerald-400",
      skills: ["FastAPI", "Node.js", "Express", "Redis", "PostgreSQL", "Docker", "REST APIs"],
    },
    {
      title: "Frontend & UI",
      icon: Layout,
      color: "text-amber-400",
      skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
    },
    {
      title: "Cloud & Tools",
      icon: Cloud,
      color: "text-pink-400",
      skills: ["AWS", "GCP", "Vercel", "Git", "GitHub Actions", "Linux", "Jupyter"],
    },
  ];

  return (
    <section className="py-12 md:py-16 border-b border-zinc-800/80" id="skills">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Technical Skills
          </h2>
          <span className="font-mono text-xs text-zinc-500">// stack & tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-[#121212]/80 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <cat.icon className={`size-4.5 ${cat.color}`} />
                </div>
                <h3 className="font-mono text-base font-semibold text-white">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-[#4F9DFF]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
