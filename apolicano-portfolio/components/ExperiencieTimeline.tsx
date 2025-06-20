"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import VantaEffectExperience from "./vantaEffectExperience";

const experienceData = [
  {
    company: "TechCorp Inc.",
    role: "Senior Frontend Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    responsibilities: [
      "Led development of customer-facing web applications serving 100K+ users",
      "Implemented design system reducing development time by 40%",
    ],
  },
  {
    company: "InnoSoft",
    role: "Frontend Engineer",
    duration: "2020 - 2022",
    location: "New York, NY",
    responsibilities: [
      "Built reusable component libraries",
      "Collaborated with backend team on API integration",
    ],
  },
  {
    company: "Creative Studio",
    role: "Web Developer",
    duration: "2018 - 2020",
    location: "Remote",
    responsibilities: [
      "Developed landing pages and marketing websites",
      "Worked with designers to translate Figma designs into code",
    ],
  },
];

export default function ExperienceTimeline() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const containerRef = useRef(null);
  const timelineRef = useRef(null);
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
    if (inView) {
      controls.start({ height: "100%" });
    }
  }, [inView, controls]);

  return (
    <motion.section
      key="experience"
      className="relative px-6 py-20 bg-[#101014] text-white overflow-hidden min-h-screen"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <VantaEffectExperience />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col justify-center h-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            Experience <span className="text-red-500">.</span>
          </h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative" ref={containerRef}>
          <div className="absolute left-[20px] top-[30px] bottom-10 w-[2px] bg-white/20" />
          <motion.div
            ref={timelineRef}
            initial={{ height: "0%" }}
            animate={controls}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[20px] top-[30px] w-[2px] bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 origin-top shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          />

          <div className="space-y-12">
            {experienceData.map((job, idx) => (
              <motion.div
                key={idx}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.3 }}
              >
                <motion.div
                  className="absolute left-[14px] top-[30px] w-[16px] h-[16px] rounded-full bg-black border-4 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.3 }}
                />

                <Card className="bg-black/60 backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-orange-400">{job.role}</h3>
                        <p className="text-white/90 font-medium">{job.company}</p>
                      </div>
                      <div className="text-sm text-white/70 flex flex-col gap-1">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {job.duration}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {job.responsibilities.map((res, idx2) => (
                        <li key={idx2} className="flex items-start gap-2">
                          <span className="text-orange-500">•</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {experienceData.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="snap-center shrink-0 w-[85%] rounded-2xl border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg"
                >
                  <Card className="bg-transparent border-none shadow-none">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-orange-400">{job.role}</h3>
                          <p className="text-white/90 font-medium">{job.company}</p>
                        </div>
                        <div className="text-sm text-white/70 flex flex-col gap-1">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {job.duration}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-white/70">
                        {job.responsibilities.map((res, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
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
      </div>
    </motion.section>
  );
}
