"use client";

import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  project: {
    name: string;
    type: string;
    description: string;
    link: string;
    image: string;
  };
  index: number;
  isMobile?: boolean;
}

function ProjectCard({ project, index, isMobile = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobileDevice ? ["0deg", "0deg"] : ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobileDevice ? ["0deg", "0deg"] : ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1, filter: "brightness(0.7)" },
    hover: { 
      scale: 1.1, 
      filter: "brightness(1)",
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const contentVariants = {
    rest: { y: 0, opacity: 1 },
    hover: { 
      y: -10, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const glowVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={!isMobileDevice ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : {}}
      className={`snap-start shrink-0 basis-full sm:basis-full md:basis-[60%] lg:basis-[40%] group relative`}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 via-purple-500/50 to-red-500/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      />
      
      {/* Main card */}
      <motion.div
        variants={contentVariants}
        className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl"
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"
          animate={isHovered ? {
            background: [
              "linear-gradient(135deg, rgba(239,68,68,0) 0%, rgba(0,0,0,0) 50%, rgba(168,85,247,0) 100%)",
              "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(0,0,0,0) 50%, rgba(168,85,247,0.2) 100%)",
              "linear-gradient(135deg, rgba(239,68,68,0) 0%, rgba(0,0,0,0) 50%, rgba(168,85,247,0) 100%)",
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Image container */}
        <div className="relative w-full h-56 overflow-hidden">
          <motion.div
            variants={imageVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="relative w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"
              style={{ transform: isHovered ? "translateX(100%)" : "translateX(-100%)" }}
            />
          </motion.div>
          
          {/* Type badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="absolute top-4 left-4 z-30"
          >
            <span className="px-3 py-1 text-xs font-semibold bg-red-500/90 backdrop-blur-sm text-white rounded-full border border-red-400/50 shadow-lg">
              {project.type}
            </span>
          </motion.div>

          {/* External link icon - floating */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 hover:border-red-500/50 transition-all duration-300 group/link"
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight className="w-5 h-5 text-white group-hover/link:text-red-500 transition-colors" />
          </motion.a>
        </div>

        {/* Content */}
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/40">
          <div className="space-y-3">
            <motion.h3 
              className="text-2xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 transition-all duration-300"
            >
              {project.name}
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors duration-300"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Animated underline */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 w-0 group-hover:w-full transition-all duration-500 mt-4"
            style={{ backgroundSize: "200% 100%" }}
            animate={isHovered ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </CardContent>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { t } = useLanguage();

  const projects = [
    {
      name: t("projects.items.rankmycv.name"),
      type: t("projects.items.rankmycv.type"),
      description: t("projects.items.rankmycv.description"),
      link: "https://rankmycv.app/",
      image: "/output.webp"
    },
    {
      name: t("projects.items.beersech.name"),
      type: t("projects.items.beersech.type"),
      description: t("projects.items.beersech.description"),
      link: "https://beersech.com/",
      image: "/business-intelligence-big-data-scaled.webp"
    },
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
      link: "https://nadirperfumes.com/",
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
      className="relative min-h-screen px-6 py-20 bg-[#101014] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
        <SectionHeader 
          title={t("projects.title")}
          description={t("projects.description")}
        />

        {/* Enhanced Carousel */}
        <div className="flex-1 flex flex-col justify-center pb-8">
          <div ref={emblaRef} className="overflow-hidden mb-4">
            <div className="flex gap-8 md:gap-6">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={idx}
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Pagination */}
          <div className="mobile-dots">
            <div className="flex items-center justify-center gap-4">
              {scrollSnaps.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className="relative p-2"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      selectedIndex === idx
                        ? "bg-red-500 shadow-lg shadow-red-500/50 scale-110"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                  {selectedIndex === idx && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500 blur-md -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0.4 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
