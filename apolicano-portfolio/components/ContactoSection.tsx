"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin, Twitter } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

const pageTransition = {  
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.4 },
};

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <motion.section
      key="contact"
      className="py-20 px-6 text-center flex flex-col items-center justify-center h-screen relative bg-[#101014]"
      {...pageTransition}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-xl mx-auto flex flex-col h-full justify-center"
      >
        <SectionHeader 
          title={t("contact.title")}
          description={t("contact.description")}
        />

        <p className="text-sm text-white/40 mb-8 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" /> {t("contact.location")}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button variant="outline" asChild className="w-[140px]">
            <a href="mailto:agustinpolicanodev@gmail.com" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {t("contact.email")}
            </a>
          </Button>
          <Button variant="outline" asChild className="w-[140px]">
            <a href="https://github.com/AgustinPolicano" target="_blank" className="flex items-center gap-2">
              <Github className="w-4 h-4" /> {t("contact.github")}
            </a>
          </Button>
          <Button variant="outline" asChild className="w-[140px]">
            <a href="https://www.linkedin.com/in/agustin-policano/" target="_blank" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> {t("contact.linkedin")}
            </a>
          </Button>
          <Button variant="outline" asChild className="w-[140px]">
            <a href="https://x.com/PolicanoAgustin" target="_blank" className="flex items-center gap-2">
              <Twitter className="w-4 h-4" /> {t("contact.twitter")}
            </a>
          </Button>
        </div>

        <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
          <Download className="w-5 h-5 mr-2" /> {t("contact.downloadCV")}
        </Button>

        {/* Espaciador para mantener consistencia con otras secciones */}
        <div className="h-[40px] mt-8"></div>
      </motion.div>

      {/* Frase inspiradora */}
      <p className="absolute bottom-4 text-xs italic text-white/30 z-10">
        {t("contact.inspirational")}
      </p>
    </motion.section>
  );
}
