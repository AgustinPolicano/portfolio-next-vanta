// components/PortfolioContent.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VantaEffect from "@/components/VantaEffect";
import { ThemeProvider } from "@/components/theme-provider";
import ExperienceTimeline from "@/components/ExperiencieTimeline";
import ProjectsSection from "@/components/ProyectsSection";
import SkillsShowcase from "@/components/SkillsSection";
import ContactSection from "@/components/ContactoSection";
import TopSocialNavbar from "@/components/TopSocialNavbar";
import LanguageToggle from "@/components/ui/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home as HomeIcon, Briefcase, Code, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "navigation.home", section: "home", icon: HomeIcon },
  { name: "navigation.experience", section: "experience", icon: Briefcase },
  { name: "navigation.projects", section: "projects", icon: Code },
  { name: "navigation.skills", section: "skills", icon: User },
  { name: "navigation.contact", section: "contact", icon: Mail },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [nextSection, setNextSection] = useState<string | null>(null);
  const { t } = useLanguage();

  const currentSection = nextSection || activeSection;

  const handleSectionChange = (section: string) => {
    if (section === activeSection || nextSection) return;
    console.log("section", section);
    setNextSection(section);
  };

  const pageTransition = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4 },
  };

  // Cada sección monta su propio fondo Vanta dentro del motion.section
  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return (
          <motion.section
            key="home"
            className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
            {...pageTransition}
          >
            <VantaEffect instanceKey="home" />
            <div className="z-10 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{t("home.title")}</h1>
                <p className="text-xl text-muted-foreground mb-2">{t("home.subtitle")}</p>
                <Button size="lg" onClick={() => handleSectionChange("projects")} className="rounded-xl">
                  {t("home.viewProjects")}
                </Button>
              </motion.div>
            </div>
          </motion.section>
        );

      case "projects":
        return (
          <motion.section
            key="projects"
            className="relative min-h-screen overflow-hidden"
            {...pageTransition}
          >
            <VantaEffect instanceKey="projects" />
            <ProjectsSection />
          </motion.section>
        );

      case "experience":
        return (
          <motion.section
            key="experience"
            className="relative min-h-screen overflow-hidden"
            {...pageTransition}
          >
            <VantaEffect instanceKey="experience" />
            <ExperienceTimeline />
          </motion.section>
        );

      case "skills":
        return (
          <motion.section
            key="skills"
            className="relative min-h-screen overflow-hidden"
            {...pageTransition}
          >
            <VantaEffect instanceKey="skills" />
            <SkillsShowcase />
          </motion.section>
        );

      case "contact":
        return (
          <motion.section
            key="contact"
            className="relative min-h-screen overflow-hidden"
            {...pageTransition}
          >
            <VantaEffect instanceKey="contact" />
            <ContactSection />
          </motion.section>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background relative overflow-hidden">
        
        <AnimatePresence mode="wait" onExitComplete={() => {
          if (nextSection) {
            setActiveSection(nextSection);
            setNextSection(null);
          }
        }}>
          {renderSection()}
        </AnimatePresence>

        {/* Navegación */}
        <TopSocialNavbar />
        <nav className="fixed z-50 bottom-0 left-0 right-0 flex justify-around items-center h-16 w-full bg-black/50 backdrop-blur-md border-t border-white/10 md:top-1/2 md:right-8 md:bottom-auto md:left-auto md:translate-y-[-50%] md:w-16 md:h-auto md:flex-col md:justify-between md:py-8 md:rounded-3xl md:border md:border-white/10 md:shadow-xl">
          <div className="flex md:flex-col items-center justify-around md:justify-start md:gap-8 w-full md:w-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleSectionChange(item.section)}
                    className={`p-3 transition-all duration-300 rounded-xl hover:scale-110 ${
                      activeSection === item.section
                        ? "text-red-500 bg-white/10"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  <span className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 text-xs text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                    {t(item.name)}
                  </span>
                </div>
              );
            })}
            <div className="hidden md:block px-3">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      </div>
    </ThemeProvider>
  );
}
