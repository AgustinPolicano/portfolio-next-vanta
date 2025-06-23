"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/ExperiencieTimeline.css"; // Estilos custom para mobile
import SectionHeader from "./ui/section-header";

export default function ExperienceTimeline() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { t } = useLanguage();

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

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

  useEffect(() => {
    if (inView) controls.start({ width: "100%" });
  }, [inView, controls]);

  const experienceData = [
    {
      company: t("experience.jobs.techcorp.company"),
      role: t("experience.jobs.techcorp.role"),
      duration: t("experience.jobs.techcorp.duration"),
      location: t("experience.jobs.techcorp.location"),
      responsibilities: [
        t("experience.jobs.techcorp.responsibilities.0"),
        t("experience.jobs.techcorp.responsibilities.1"),
        t("experience.jobs.techcorp.responsibilities.2"),
        t("experience.jobs.techcorp.responsibilities.3"),
      ],
    },
    {
      company: t("experience.jobs.innosoft.company"),
      role: t("experience.jobs.innosoft.role"),
      duration: t("experience.jobs.innosoft.duration"),
      location: t("experience.jobs.innosoft.location"),
      responsibilities: [
        t("experience.jobs.innosoft.responsibilities.0"),
        t("experience.jobs.innosoft.responsibilities.1"),
        t("experience.jobs.innosoft.responsibilities.2"),
        t("experience.jobs.innosoft.responsibilities.3"),
      ],
    },
    {
      company: t("experience.jobs.accusys.company"),
      role: t("experience.jobs.accusys.role"),
      duration: t("experience.jobs.accusys.duration"),
      location: t("experience.jobs.accusys.location"),
      responsibilities: [
        t("experience.jobs.accusys.responsibilities.0"),
        t("experience.jobs.accusys.responsibilities.1"),
        t("experience.jobs.accusys.responsibilities.2"),
        t("experience.jobs.accusys.responsibilities.3"),
      ],
    },
  ];

  return (
    <section
      className="experienceSection"
    >
      <div className="experienceContainer">
        <SectionHeader
          title={t("experience.title")}
          description={t("projects.description")}
        />

        {/* Desktop timeline */}
        <div className="hidden md:block relative flex-1" ref={containerRef}>
          <div className="absolute left-[20px] top-[30px] bottom-10 w-[2px] bg-white/20" />
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[20px] top-[30px] w-[2px] bg-gradient-to-b from-red-500 via-red-400 to-red-300 origin-top shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          />
          <div className="space-y-12 overflow-y-auto pr-4 max-h-[calc(100vh-280px)] no-scrollbar">
            {experienceData.map((job, idx) => (
              <motion.div
                key={idx}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute left-[14px] top-[30px] w-[16px] h-[16px] rounded-full bg-black border-4 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
                />
                <Card className="bg-black/60 backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-red-500">{job.role}</h3>
                        <p className="text-white/90 font-medium">{job.company}</p>
                      </div>
                      <div className="text-sm text-white/70 flex flex-col gap-1">
                        <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {job.duration}</p>
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {job.responsibilities.map((res, idx2) => (
                        <li key={idx2} className="flex items-start gap-2"><span className="text-red-500">•</span><span>{res}</span></li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile horizontal timeline */}
        <div className="md:hidden relative flex-1 flex flex-col mobile-carousel-container" ref={containerRef}>
          <div className="timeline-baseline" />
          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="timeline-progress"
            style={{ width: `${((selectedIndex + 1) / experienceData.length) * 80}%` }}
          />
          <div ref={emblaRef} className="overflow-hidden flex-1 mobile-carousel-viewport">
            <div className="flex items-center mobile-carousel-wrapper">
              {experienceData.map((job, idx) => (
                <motion.div
                  key={idx}
                  className="snap-center shrink-0 mobile-carousel-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div className="timeline-dot" />
                  <Card className="mobile-card">
                    <CardContent className="mobile-card-content">
                      <div className="flex flex-col gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-red-500 leading-tight">{job.role}</h3>
                          <p className="text-white/90 font-medium text-sm">{job.company}</p>
                        </div>
                        <div className="text-xs text-white/70 flex flex-col gap-1">
                          <p className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {job.duration}</p>
                          <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {job.location}</p>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-white/70 flex-1 overflow-hidden">
                          {job.responsibilities.slice(0, 3).map((res, i) => (
                            <li key={i} className="flex items-start gap-2"><span className="text-red-500 flex-shrink-0 text-xs">•</span><span className="leading-relaxed">{res}</span></li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mobile-dots">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`mobile-dot-button ${selectedIndex === idx ? 'active' : ''}`}>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
