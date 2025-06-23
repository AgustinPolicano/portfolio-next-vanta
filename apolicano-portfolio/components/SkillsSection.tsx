"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Pencil,
  Code,
  MonitorSmartphone,
  ArrowUpRight,
  FileCode2,
  Palette,
  Server,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import "../styles/SkillsSection.css";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  {
    icon: <FileCode2 className="w-6 h-6 text-red-500" />,
    titleKey: "skills.typescript.title",
    descriptionKey: "skills.typescript.description",
  },
  {
    icon: <Palette className="w-6 h-6 text-red-500" />,
    titleKey: "skills.uiux.title",
    descriptionKey: "skills.uiux.description",
  },
  {
    icon: <Server className="w-6 h-6 text-red-500" />,
    titleKey: "skills.devops.title",
    descriptionKey: "skills.devops.description",
  },
  {
    icon: <Wrench className="w-6 h-6 text-red-500" />,
    titleKey: "skills.tools.title",
    descriptionKey: "skills.tools.description",
  },
  {
    icon: <Code className="w-6 h-6 text-red-500" />,
    titleKey: "skills.architecture.title",
    descriptionKey: "skills.architecture.description",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-red-500" />,
    titleKey: "skills.automation.title",
    descriptionKey: "skills.automation.description",
  },
];

// Agrupar skills de 2 en 2 para mobile
const skillPairs: (typeof skills)[] = [];
for (let i = 0; i < skills.length; i += 2) {
  skillPairs.push(skills.slice(i, i + 2));
}

export default function SkillsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { t } = useLanguage();

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
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        <SectionHeader
          title={t("skills.title")}
          description={t("skills.description")}
        />

        {/* Mobile: Embla Carousel con slides de 2 elementos */}
        <div className="md:hidden flex-1 flex flex-col">
          <div ref={emblaRef} className="overflow-hidden flex-1">
            <div className="flex">
              {skillPairs.map((pair, pairIdx) => (
                <div key={pairIdx} className="flex-[0_0_100%] px-4">
                  <div className="grid grid-cols-1 gap-6 h-full">
                    {pair.map((skill, idx) => (
                      <motion.div
                        key={skill.titleKey}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl group border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg flex flex-col w-full h-[200px]"
                      >
                        <Card className="bg-transparent border-none shadow-none flex-1 flex flex-col">
                          <CardContent className="p-0 space-y-2 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="mb-3">{skill.icon}</div>
                              <h3 className="text-lg font-bold text-white leading-tight">
                                {t(skill.titleKey)}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {t(skill.descriptionKey)}
                              </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition self-start mt-2" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots para mobile */}
          <div className="mt-8 mobile-dots">
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

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 w-full flex-1 items-center">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl group border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg flex flex-col w-[350px] h-[200px]"
            >
              <Card className="bg-transparent border-none shadow-none flex-1 flex flex-col">
                <CardContent className="p-0 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="mb-3">{skill.icon}</div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {t(skill.titleKey)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed sm:line-clamp-4">
                      {t(skill.descriptionKey)}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition self-start mt-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
