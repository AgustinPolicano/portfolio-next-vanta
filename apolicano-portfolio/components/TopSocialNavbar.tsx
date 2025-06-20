// components/TopSocialNavbar.tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function TopSocialNavbar() {
  return (
    <div className="hidden md:flex fixed top-10 right-[180px] z-50 items-center gap-5">
      <a
        href="https://github.com/tuusuario"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/70 hover:text-red-500 transition-all duration-300 hover:scale-110"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://linkedin.com/in/tuusuario"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/70 hover:text-red-500 transition-all duration-300 hover:scale-110"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="mailto:tuemail@example.com"
        className="text-white/70 hover:text-red-500 transition-all duration-300 hover:scale-110"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
}
