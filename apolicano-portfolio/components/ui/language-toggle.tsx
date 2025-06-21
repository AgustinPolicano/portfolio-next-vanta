"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: t('language.es'), flag: '🇪🇸' },
    { code: 'en', name: t('language.en'), flag: '🇺🇸' }
  ];

  return (
    <div className="relative group flex items-center justify-center">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="p-3 rounded-xl transition-all duration-300 hover:scale-110 text-white/70 hover:text-white flex items-center justify-center"
    >
      <Globe className="w-5 h-5" />
    </button>
  
    {/* Tooltip */}
    <span className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 text-xs text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
      {t('language.title') || "Language"}
    </span>
  
    {/* Dropdown (igual que antes) */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full right-0 mb-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-xl z-50"
        >
          <div className="flex flex-col gap-1 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'es' | 'en');
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  language === lang.code
                    ? 'bg-red-500/20 text-red-500'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  
  );
}
