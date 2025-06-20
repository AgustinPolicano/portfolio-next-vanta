"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import VantaEffectExperience from "./vantaEffectExperience";

const pageTransition = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.4 },
};

export default function ContactSection() {
  return (
    <motion.section
      key="contact"
      className="py-20 px-6 text-center flex flex-col items-center justify-center h-screen relative bg-[#101014]"
      {...pageTransition}
    >
      <VantaEffectExperience />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-xl"
      >
        <h2 className="text-4xl font-bold mb-4 text-white">
          Get In Touch <span className="text-red-500">.</span>
        </h2>
        <p className="text-muted-foreground mb-4">
          I'm always interested in new opportunities, collaborations, or just a chat.
        </p>

        <p className="text-sm text-white/40 mb-8 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" /> Buenos Aires — Available for freelance
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button variant="outline" asChild>
            <a href="mailto:agustin@example.com" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com" target="_blank" className="flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </Button>
        </div>

        <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
          <Download className="w-5 h-5 mr-2" /> Download CV
        </Button>
      </motion.div>


      {/* Frase inspiradora */}
      <p className="absolute bottom-4 text-xs italic text-white/30">
        Let’s build something great together.
      </p>
    </motion.section>
  );
}
