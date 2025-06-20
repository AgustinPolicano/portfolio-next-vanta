"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
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
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ height: "100%" });
    }
  }, [inView, controls]);

  return (
    <motion.section
      key="experience"
      className="relative min-h-screen py-20 px-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <VantaEffectExperience />
      <div className="relative z-10 max-w-3xl mx-auto" ref={containerRef}>
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Experience</h2>

        <div className="relative">
          {/* Línea de fondo */}
          <div className="absolute left-[20px] top-[30px] bottom-10 w-[2px] bg-white/20" />
          
          {/* Línea animada */}
          <motion.div
            ref={timelineRef}
            initial={{ height: "0%" }}
            animate={controls}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[20px] top-[30px] w-[2px] bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 origin-top shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          />

          <div className="space-y-12">
            {experienceData.map((job, idx) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true });
              const cardControls = useAnimation();

              useEffect(() => {
                if (cardInView) {
                  cardControls.start({ opacity: 1, x: 0 });
                }
              }, [cardInView, cardControls]);

              return (
                <motion.div
                  ref={cardRef}
                  key={idx}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  animate={cardControls}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.3 }}
                >
                  {/* Círculo del timeline */}
                  <motion.div
                    className="absolute left-[14px] top-[30px] w-[16px] h-[16px] rounded-full bg-black border-4 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 + idx * 0.3 }}
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
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
