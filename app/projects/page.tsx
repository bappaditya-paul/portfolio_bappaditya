import { ProjectsSection } from "@/app/sections/projects-section";

export const metadata = {
  title: "Projects — Bappaditya Paul",
  description: "Explore AI/ML, Computer Vision, and Deep Learning projects built by Bappaditya Paul.",
};

export default function ProjectsPage() {
  return (
    <div className="py-6">
      <ProjectsSection />
    </div>
  );
}
