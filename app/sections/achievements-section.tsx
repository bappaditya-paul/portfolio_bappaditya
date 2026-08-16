"use client";

interface AchievementItem {
  title: string;
  description: string;
}

const achievements: AchievementItem[] = [
  {
    title: "NIRMAAN IIT Madras",
    description: "Selected as part of a startup team under the NIRMAAN IIT Madras innovation and pre-incubation initiative. Secured funding opportunities worth up to ₹2 Lakhs.",
  },
  {
    title: "HackEclipse Hackathon",
    description: "Secured 4th Position in HackEclipse Hackathon organized by GeeksforGeeks among 100+ nationwide participants.",
  },
  {
    title: "International Olympiad of Science",
    description: "Selected participant in the International Olympiad of Science (2022–23) for excellence in scientific aptitude and analytical problem-solving.",
  },
  {
    title: "Open Source Contributor",
    description: "Actively contributing to open-source AI projects focused on computer vision and intelligent healthcare systems.",
  },
];

export function AchievementsSection() {
  return (
    <section className="screen-line-before screen-line-after border-x border-edge" id="achievements">
      <header className="screen-line-after px-4">
        <h2 className="font-serif text-3xl font-semibold tracking-tight py-4">Achievements</h2>
      </header>
      <div className="pr-2 pl-4">
        {achievements.map((item, i) => (
          <div key={i} className="screen-line-after space-y-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center select-none">
                <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
              <h3 className="text-lg leading-snug font-medium">{item.title}</h3>
            </div>
            <div className="relative space-y-2 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
