"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Pencil,
  Code,
  MonitorSmartphone,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import VantaEffectExperience from "./vantaEffectExperience";

const skills = [
  {
    icon: <Pencil className="w-6 h-6 text-red-500" />,
    titleKey: "skills.frontend.title",
    descriptionKey: "skills.frontend.description",
  },
  {
    icon: <Code className="w-6 h-6 text-red-500" />,
    titleKey: "skills.backend.title",
    descriptionKey: "skills.backend.description",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-red-500" />,
    titleKey: "skills.fullstack.title",
    descriptionKey: "skills.fullstack.description",
  },
  {
    icon: <Pencil className="w-6 h-6 text-red-500" />,
    titleKey: "skills.design.title",
    descriptionKey: "skills.design.description",
  },
];

export default function SkillsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { t } = useLanguage();

  // Update on select
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <motion.section
      key="skills"
      className="relative h-screen px-6 py-20 bg-[#101014] text-white overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <VantaEffectExperience />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        <SectionHeader 
          title={t("skills.title")}
          description={t("skills.description")}
        />

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden flex-1 flex items-center">
          <div className="flex gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[70%] sm:w-[50%] md:w-[30%] rounded-2xl group border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg overflow-hidden h-[240px] flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">{skill.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{t(skill.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(skill.descriptionKey)}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition self-end" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-2 h-[40px] items-center">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === idx
                  ? "bg-red-500 scale-110 shadow"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
