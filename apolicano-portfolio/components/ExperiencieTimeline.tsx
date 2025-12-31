"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/ExperiencieTimeline.css";
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

  interface TimelineItemProps {
    job: {
      company: string;
      role: string;
      duration: string;
      location: string;
      responsibilities: string[];
    };
    idx: number;
  }

  function TimelineItem({ job, idx }: TimelineItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div
        className="relative pl-12 group"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.1 }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced timeline dot with glow */}
        <motion.div
          className="absolute left-[14px] top-[30px] w-[20px] h-[20px] rounded-full bg-black border-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-10"
          initial={{ scale: 0 }}
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            boxShadow: isHovered 
              ? "0 0 25px rgba(239,68,68,1), 0 0 40px rgba(239,68,68,0.6)"
              : "0 0 15px rgba(239,68,68,0.8)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            delay: idx * 0.1 
          }}
        >
          {/* Inner pulsing dot */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: isHovered ? [0.8, 0.3, 0.8] : [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Glow effect behind card */}
        <motion.div
          className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-red-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateX(-20px)" }}
        />
        
        {/* Enhanced card */}
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl group/card relative">
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"
              style={{ transform: isHovered ? "translateX(100%)" : "translateX(-100%)" }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-300" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-red-500" />
                    <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent group-hover/card:from-red-300 group-hover/card:to-red-500 transition-all duration-300">
                      {job.role}
                    </h3>
                  </div>
                  <p className="text-white/90 font-medium text-lg">{job.company}</p>
                </div>
                <div className="text-sm text-white/70 flex flex-col gap-2">
                  <motion.p 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Calendar className="w-4 h-4 text-red-500" /> 
                    <span>{job.duration}</span>
                  </motion.p>
                  <motion.p 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="w-4 h-4 text-red-500" /> 
                    <span>{job.location}</span>
                  </motion.p>
                </div>
              </div>
              
              {/* Enhanced responsibilities list */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/50 to-transparent rounded-full" />
                <ul className="space-y-3 text-sm text-white/80 pl-4">
                  {job.responsibilities.map((res, idx2) => (
                    <motion.li 
                      key={idx2} 
                      className="flex items-start gap-3 group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + idx2 * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed group-hover/item:text-white transition-colors">
                        {res}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  const experienceData = [
    {
      company: t("experience.jobs.current.company"),
      role: t("experience.jobs.current.role"),
      duration: t("experience.jobs.current.duration"),
      location: t("experience.jobs.current.location"),
      responsibilities: [
        t("experience.jobs.current.responsibilities.0"),
        t("experience.jobs.current.responsibilities.1"),
        t("experience.jobs.current.responsibilities.2"),
        t("experience.jobs.current.responsibilities.3"),
      ],
    },
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
    {
      company: t("experience.jobs.seenka.company"),
      role: t("experience.jobs.seenka.role"),
      duration: t("experience.jobs.seenka.duration"),
      location: t("experience.jobs.seenka.location"),
      responsibilities: [
        t("experience.jobs.seenka.responsibilities.0"),
        t("experience.jobs.seenka.responsibilities.1"),
        t("experience.jobs.seenka.responsibilities.2"),
        t("experience.jobs.seenka.responsibilities.3"),
      ],
    },
    {
      company: t("experience.jobs.banhaia.company"),
      role: t("experience.jobs.banhaia.role"),
      duration: t("experience.jobs.banhaia.duration"),
      location: t("experience.jobs.banhaia.location"),
      responsibilities: [
        t("experience.jobs.banhaia.responsibilities.0"),
        t("experience.jobs.banhaia.responsibilities.1"),
        t("experience.jobs.banhaia.responsibilities.2"),
        t("experience.jobs.banhaia.responsibilities.3"),
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
          {/* Background timeline line */}
          <div className="absolute left-[20px] top-[30px] bottom-10 w-[2px] bg-white/20 pointer-events-none" />
          
          {/* Animated gradient timeline */}
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "96%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[20px] top-[30px] w-[2px] bg-gradient-to-b from-red-500 via-red-400 to-red-300 origin-top shadow-[0_0_20px_rgba(239,68,68,0.6)] pointer-events-none"
          />
          
          {/* Animated particles along timeline */}
          {experienceData.map((_, idx) => (
            <motion.div
              key={`particle-${idx}`}
              className="absolute left-[18px] w-[6px] h-[6px] rounded-full bg-red-500/60 blur-sm pointer-events-none"
              style={{ top: `${30 + (idx * (96 / experienceData.length))}%` }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          <div className="space-y-12 overflow-y-auto pr-4 max-h-[calc(100vh-280px)] no-scrollbar" style={{ pointerEvents: 'auto' }}>
            {experienceData.map((job, idx) => (
              <TimelineItem key={idx} job={job} idx={idx} />
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
                  <Card className="mobile-card group/card">
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 rounded-lg"
                    />
                    
                    <CardContent className="mobile-card-content relative z-10">
                      <div className="flex flex-col gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-red-500" />
                            <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent leading-tight">
                              {job.role}
                            </h3>
                          </div>
                          <p className="text-white/90 font-medium text-sm">{job.company}</p>
                        </div>
                        <div className="text-xs text-white/70 flex flex-col gap-1.5">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-red-500" /> 
                            <span>{job.duration}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-red-500" /> 
                            <span>{job.location}</span>
                          </p>
                        </div>
                        <div className="relative mt-2">
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/50 to-transparent rounded-full" />
                          <ul className="space-y-2 text-xs text-white/70 flex-1 overflow-hidden pl-3">
                            {job.responsibilities.slice(0, 3).map((res, i) => (
                              <li key={i} className="flex items-start gap-2 group/item">
                                <span className="text-red-500 flex-shrink-0 text-xs">•</span>
                                <span className="leading-relaxed group-hover/item:text-white transition-colors">{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
