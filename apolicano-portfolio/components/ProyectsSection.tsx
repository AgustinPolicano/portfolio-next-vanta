"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import VantaEffectExperience from "./VantaEffect";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { t } = useLanguage();

  const projects = [
    {
      name: t("projects.items.ffdiamond.name"),
      type: t("projects.items.ffdiamond.type"),
      description: t("projects.items.ffdiamond.description"),
      link: "https://ffdiamondzone.com/",
      image: "/82fe305f7dbb9f25e68996f8f719e576.webp"
    },
    {
      name: t("projects.items.archivio.name"),
      type: t("projects.items.archivio.type"),
      description: t("projects.items.archivio.description"),
      link: "https://know-bot-landing.vercel.app/",
      image: "/ChatGPT Image 21 jun 2025, 13_41_26.webp"
    },
    {
      name: t("projects.items.alchimie.name"),
      type: t("projects.items.alchimie.type"),
      description: t("projects.items.alchimie.description"),
      link: "https://alchimieparfums.com/",
      image: "/joppe-spaa-Y8kwv9_Vay8-unsplash.webp"
    },
    {
      name: t("projects.items.beersech.name"),
      type: t("projects.items.beersech.type"),
      description: t("projects.items.beersech.description"),
      link: "https://beersech.com/",
      image: "/business-intelligence-big-data-scaled.webp"
    },
    {
      name: t("projects.items.ecochoice.name"),
      type: t("projects.items.ecochoice.type"),
      description: t("projects.items.ecochoice.description"),
      link: "https://ecochoice.com.ar/",
      image: "/Zw.webp"
    },
    {
      name: t("projects.items.dakari.name"),
      type: t("projects.items.dakari.type"),
      description: t("projects.items.dakari.description"),
      link: "https://incendiocassi.com/",
      image: "/hero_dakari.webp"
    },

  ];

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
    className="relative h-screen px-6 py-20 bg-[#101014] text-white overflow-hidden"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.2 }}
    >

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-full">
        <SectionHeader 
          title={t("projects.title")}
          description={t("projects.description")}
        />

        {/* Embla Carousel */}
        <div ref={emblaRef} className="overflow-hidden items-center">
          <div className="flex gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
               className="snap-start shrink-0 basis-full sm:basis-full md:basis-[60%] lg:basis-[40%] rounded-2xl group border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg"

              >
                <Card className="bg-transparent border-none shadow-none flex-1 flex flex-col">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover opacity-70 hover:opacity-90 transition"
                    />
                  </div>
                  <CardContent className="p-0 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white leading-tight">{project.name}</h3>
                      <p className="text-xs text-red-500 font-medium">{project.type}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed sm:line-clamp-4">{project.description}</p>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white inline-block self-start mt-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
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
    </motion.section>
  );
}
