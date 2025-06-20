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
import VantaEffectExperience from "./vantaEffectExperience";

const skills = [
  {
    icon: <Pencil className="w-6 h-6 text-red-500" />,
    title: "Frontend",
    description: "React, Next.js, Tailwind y diseño UI/UX.",
  },
  {
    icon: <Code className="w-6 h-6 text-red-500" />,
    title: "Backend",
    description: "Node.js, REST APIs, MongoDB y PostgreSQL.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-red-500" />,
    title: "Full-Stack",
    description: "Productos escalables end-to-end.",
  },
  {
    icon: <Pencil className="w-6 h-6 text-red-500" />,
    title: "UI Design",
    description: "Figma, wireframes y prototipado ágil.",
  },
];

export default function SkillsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center h-full">
        <div className="text-left mb-12 max-w-xl">
          <h2 className="text-4xl font-bold mb-2">
            Skills <span className="text-red-500">.</span>
          </h2>
          <p className="text-muted-foreground">
            Herramientas y tecnologías que uso para desarrollar productos modernos y escalables.
          </p>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[30%] rounded-2xl group border border-white/10 p-6 backdrop-blur bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg overflow-hidden"
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
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
    </motion.section>
  );
}
