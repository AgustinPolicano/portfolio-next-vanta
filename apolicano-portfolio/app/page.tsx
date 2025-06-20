"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useTransform, useScroll } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VantaEffect from "@/components/vantaEffect";
import { ThemeProvider } from "@/components/theme-provider";
import ExperienceTimeline from "@/components/ExperiencieTimeline";

const navigation = [
  { name: "Home", section: "home", icon: HomeIcon },
  { name: "Experience", section: "experience", icon: Briefcase },
  { name: "Projects", section: "projects", icon: Code },
  { name: "Skills", section: "skills", icon: User },
  { name: "Contact", section: "contact", icon: Mail },
];

const projects = [
  {
    name: "E-Commerce Platform",
    type: "Full-Stack Application",
    description:
      "Modern e-commerce platform built with Next.js, featuring real-time inventory, payment processing, and admin dashboard.",
    link: "https://github.com",
  },
  {
    name: "AI Content Generator",
    type: "AI Tool",
    description:
      "Content generation tool powered by OpenAI API with custom prompts, templates, and export functionality.",
    link: "https://github.com",
  },
];


const skills = {
  Languages: ["JavaScript", "TypeScript", "Python"],
  Frameworks: ["React", "Next.js", "Node.js"],
  Tools: ["Git", "Docker", "Figma"],
};

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pageTransition = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4 },
  };

  const handleSectionChange = (section: string) => {
    if (section === activeSection || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
    }, 600);
  };

  const renderSection = (): JSX.Element | null => {
    switch (activeSection) {
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
        return (
          <motion.section
            key="projects"
            className="py-20 px-6"
            {...pageTransition}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.name} className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {project.type}
                          </p>
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>
        );
        case "experience":
          return (
            <ExperienceTimeline
  
          />
          );
      case "skills":
        return (
          <motion.section
            key="skills"
            className="py-20 px-6"
            {...pageTransition}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Skills</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                  <Card key={category} className="shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill} className="rounded-full px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>
        );
      case "contact":
        return (
          <motion.section
            key="contact"
            className="py-20 px-6 text-center"
            {...pageTransition}
          >
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-6">
              I'm always interested in new opportunities and collaborations.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <Button variant="outline" asChild>
                <a
                  href="mailto:agustin@example.com"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Email
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com" target="_blank">
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://linkedin.com" target="_blank">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </Button>
            </div>
            <Button>
              <Download className="w-5 h-5 mr-2" /> Download CV
            </Button>
          </motion.section>
        );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 origin-left z-40 bg-[#101014]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>

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
