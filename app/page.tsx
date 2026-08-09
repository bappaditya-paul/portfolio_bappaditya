import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ConnectSection } from "@/app/sections/connect-section";
import { GitHubSection } from "@/components/GitHubSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/app/sections/education-section";
import { AchievementsSection } from "@/app/sections/achievements-section";
import { QuoteSection } from "@/app/sections/quote-section";
import { DividerPattern } from "@/components/divider-pattern";
import { TopPattern } from "@/components/top-pattern";

export default function Home() {
  return (
    <>
      <TopPattern />
      <HeroSection />
      <DividerPattern />
      <AboutSection />
      <DividerPattern />
      <ConnectSection />
      <DividerPattern />
      <GitHubSection />
      <DividerPattern />
      <ExperienceSection />
      <DividerPattern />
      <EducationSection />
      <DividerPattern />
      <AchievementsSection />
      <DividerPattern />
      <QuoteSection />
      <DividerPattern />
    </>
  );
}
