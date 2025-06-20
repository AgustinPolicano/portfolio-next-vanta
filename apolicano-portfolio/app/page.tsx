"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  Calendar,
  Code,
  Download,
  ExternalLink,
  Github,
  Home as HomeIcon,
  Linkedin,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VantaEffect from "@/components/vantaEffect";
import { ThemeProvider } from "@/components/theme-provider";
import ExperienceTimeline from "@/components/ExperiencieTimeline";
import ProjectsSection from "@/components/ProyectsSection";
import SkillsShowcase from "@/components/SkillsSection";
import ContactSection from "@/components/ContactoSection";
import TopSocialNavbar from "@/components/TopSocialNavbar";

const navigation = [
  { name: "Home", section: "home", icon: HomeIcon },
  { name: "Experience", section: "experience", icon: Briefcase },
  { name: "Projects", section: "projects", icon: Code },
  { name: "Skills", section: "skills", icon: User },
  { name: "Contact", section: "contact", icon: Mail },
];

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [nextSection, setNextSection] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    if (section === activeSection || nextSection) return;
    setNextSection(section);
  };

  const pageTransition = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4 },
  };

  const renderSection = (section: string): JSX.Element | null => {
    switch (section) {
      case "home":
        return (
          <motion.section
            key="home"
            className="min-h-screen flex items-center justify-center px-6"
            {...pageTransition}
          >
            <VantaEffect />
            <div className="z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  Agustin Policano
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                  Frontend Developer
                </p>
                <Button
                  size="lg"
                  onClick={() => handleSectionChange("projects")}
                  className="rounded-xl"
                >
                  View Projects
                </Button>
              </motion.div>
            </div>
          </motion.section>
        );

      case "projects":
        return <ProjectsSection key="projects" />;

      case "experience":
        return <ExperienceTimeline key="experience" />;

      case "skills":
        return <SkillsShowcase key="skills" />;

      case "contact":
        return <ContactSection key="contact" />;
    }
    return null;
  };

  const currentSection = nextSection || activeSection;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (nextSection) {
            setActiveSection(nextSection);
            setNextSection(null);
          }
        }}
      >
        {renderSection(currentSection)}
      </AnimatePresence>

      {/* Navegación */}
      <TopSocialNavbar />
      <nav className="fixed z-50 bottom-0 left-0 right-0 flex flex-row justify-around items-center h-16 w-full bg-black/50 backdrop-blur-md border-t border-white/10 md:top-1/2 md:right-8 md:bottom-auto md:left-auto md:translate-y-[-50%] md:w-16 md:h-auto md:flex-col md:justify-start md:py-8 md:gap-8 rounded-none md:rounded-3xl md:border md:border-white/10 md:shadow-xl">
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
              <span className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 text-xs text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                {item.name}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PortfolioContent />
    </ThemeProvider>
  );
}
