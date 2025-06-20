"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import VantaEffectExperience from "./vantaEffectExperience";

const projects = [
  {
    name: "E-Commerce Platform",
    type: "Full-Stack Application",
    description:
      "Modern e-commerce platform built with Next.js, featuring real-time inventory and payment processing.",
    link: "https://github.com",
    image: "/images/ecommerce-dark.jpg",
  },
  {
    name: "AI Content Generator",
    type: "AI Tool",
    description:
      "Content tool powered by OpenAI API with prompt templates and export system.",
    link: "https://github.com",
    image: "/images/aigenerator-dark.jpg",
  },
  {
    name: "Portfolio Website",
    type: "Frontend",
    description: "Interactive portfolio built with Next.js 14 and Framer Motion.",
    link: "https://github.com",
    image: "/images/portfolio-dark.jpg",
  },
];

export default function ProjectsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
      key="projects"
      className="relative h-screen px-6 py-20 bg-[#101014] text-white overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <VantaEffectExperience />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center h-full">
        <div className="text-left mb-12 max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center">
            Projects <span className="text-red-500">.</span>
          </h2>
          <p className="text-muted-foreground text-center">
            A selection of my most recent work, built with modern technologies and clean design.
          </p>
        </div>

        {/* Embla Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[40%] rounded-2xl group border border-white/10 p-4 backdrop-blur bg-black/60 shadow-lg"
              >
                <Card className="bg-transparent border-none shadow-none">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover opacity-70 hover:opacity-90 transition"
                    />
                  </div>
                  <CardContent className="p-0 space-y-2">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <p className="text-sm text-orange-400 font-medium">{project.type}</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white inline-block mt-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </CardContent>
                </Card>
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
