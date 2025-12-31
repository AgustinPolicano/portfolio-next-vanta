"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileCode2,
  Palette,
  Server,
  Wrench,
  Code,
  MonitorSmartphone,
  Database,
  Cloud,
  GitBranch,
  Layers,
  Zap,
  Globe,
  Box,
  Atom,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import "../styles/SkillsSection.css";

interface Skill {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  color: string;
  position: { x: number; y: number };
}

const skills: Skill[] = [
  {
    icon: <FileCode2 className="w-8 h-8" />,
    titleKey: "skills.typescript.title",
    descriptionKey: "skills.typescript.description",
    color: "from-red-500 to-red-600",
    position: { x: 15, y: 25 },
  },
  {
    icon: <Atom className="w-8 h-8" />,
    titleKey: "skills.react.title",
    descriptionKey: "skills.react.description",
    color: "from-red-500 to-red-600",
    position: { x: 35, y: 15 },
  },
  {
    icon: <Globe className="w-8 h-8" />,
    titleKey: "skills.nextjs.title",
    descriptionKey: "skills.nextjs.description",
    color: "from-red-500 to-red-600",
    position: { x: 55, y: 10 },
  },
  {
    icon: <Palette className="w-8 h-8" />,
    titleKey: "skills.uiux.title",
    descriptionKey: "skills.uiux.description",
    color: "from-red-500 to-red-600",
    position: { x: 75, y: 20 },
  },
  {
    icon: <Layers className="w-8 h-8" />,
    titleKey: "skills.angular.title",
    descriptionKey: "skills.angular.description",
    color: "from-red-500 to-red-600",
    position: { x: 90, y: 35 },
  },
  {
    icon: <Server className="w-8 h-8" />,
    titleKey: "skills.nodejs.title",
    descriptionKey: "skills.nodejs.description",
    color: "from-red-500 to-red-600",
    position: { x: 85, y: 55 },
  },
  {
    icon: <Code className="w-8 h-8" />,
    titleKey: "skills.python.title",
    descriptionKey: "skills.python.description",
    color: "from-red-500 to-red-600",
    position: { x: 70, y: 75 },
  },
  {
    icon: <Database className="w-8 h-8" />,
    titleKey: "skills.database.title",
    descriptionKey: "skills.database.description",
    color: "from-red-500 to-red-600",
    position: { x: 50, y: 85 },
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    titleKey: "skills.devops.title",
    descriptionKey: "skills.devops.description",
    color: "from-red-500 to-red-600",
    position: { x: 30, y: 80 },
  },
  {
    icon: <Box className="w-8 h-8" />,
    titleKey: "skills.docker.title",
    descriptionKey: "skills.docker.description",
    color: "from-red-500 to-red-600",
    position: { x: 10, y: 60 },
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    titleKey: "skills.git.title",
    descriptionKey: "skills.git.description",
    color: "from-red-500 to-red-600",
    position: { x: 5, y: 40 },
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    titleKey: "skills.tools.title",
    descriptionKey: "skills.tools.description",
    color: "from-red-500 to-red-600",
    position: { x: 25, y: 50 },
  },
  {
    icon: <Code className="w-8 h-8" />,
    titleKey: "skills.architecture.title",
    descriptionKey: "skills.architecture.description",
    color: "from-red-500 to-red-600",
    position: { x: 45, y: 60 },
  },
  {
    icon: <Zap className="w-8 h-8" />,
    titleKey: "skills.automation.title",
    descriptionKey: "skills.automation.description",
    color: "from-red-500 to-red-600",
    position: { x: 60, y: 45 },
  },
];

// Skills reducidos para móvil con posiciones diferentes
const mobileSkills: Skill[] = [
  {
    icon: <FileCode2 className="w-8 h-8" />,
    titleKey: "skills.typescript.title",
    descriptionKey: "skills.typescript.description",
    color: "from-red-500 to-red-600",
    position: { x: 20, y: 20 },
  },
  {
    icon: <Atom className="w-8 h-8" />,
    titleKey: "skills.react.title",
    descriptionKey: "skills.react.description",
    color: "from-red-500 to-red-600",
    position: { x: 50, y: 15 },
  },
  {
    icon: <Globe className="w-8 h-8" />,
    titleKey: "skills.nextjs.title",
    descriptionKey: "skills.nextjs.description",
    color: "from-red-500 to-red-600",
    position: { x: 80, y: 25 },
  },
  {
    icon: <Server className="w-8 h-8" />,
    titleKey: "skills.nodejs.title",
    descriptionKey: "skills.nodejs.description",
    color: "from-red-500 to-red-600",
    position: { x: 15, y: 50 },
  },
  {
    icon: <Database className="w-8 h-8" />,
    titleKey: "skills.database.title",
    descriptionKey: "skills.database.description",
    color: "from-red-500 to-red-600",
    position: { x: 50, y: 55 },
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    titleKey: "skills.devops.title",
    descriptionKey: "skills.devops.description",
    color: "from-red-500 to-red-600",
    position: { x: 85, y: 60 },
  },
  {
    icon: <Palette className="w-8 h-8" />,
    titleKey: "skills.uiux.title",
    descriptionKey: "skills.uiux.description",
    color: "from-red-500 to-red-600",
    position: { x: 20, y: 80 },
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    titleKey: "skills.git.title",
    descriptionKey: "skills.git.description",
    color: "from-red-500 to-red-600",
    position: { x: 80, y: 85 },
  },
];

interface SkillNodeProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  t: (key: string) => string;
}

function SkillNode({ skill, index, isHovered, onHover, t }: SkillNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  
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
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobileDevice ? ["0deg", "0deg"] : ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobileDevice ? ["0deg", "0deg"] : ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobileDevice) return;
    
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 2;
    const yPct = (mouseY / rect.height - 0.5) * 2;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (!isMobileDevice) {
      onHover(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobileDevice) {
      e.stopPropagation();
      setIsTouched(true);
      onHover(index); // Esto cerrará automáticamente el anterior
    }
  };

  const handleTouchEnd = () => {
    // No cerramos automáticamente, solo cuando se toque otro
  };

  return (
    <motion.div
      ref={ref}
      className="absolute skill-node"
      style={{
        left: `${skill.position.x}%`,
        top: `${skill.position.y}%`,
        transform: "translate(-50%, -50%)",
        rotateX: !isMobileDevice ? rotateX : undefined,
        rotateY: !isMobileDevice ? rotateY : undefined,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobileDevice && onHover(index)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={(e) => {
        if (isMobileDevice) {
          e.stopPropagation();
          // Toggle: si ya está abierto, cerrarlo. Si no, abrirlo
          onHover(isHovered ? null : index);
        }
      }}
    >
      {/* Connection lines will be rendered in parent container */}

      {/* Skill orb */}
      <motion.div
        className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-1 cursor-pointer group touch-none border border-white/20"
        animate={{
          scale: (isHovered || isTouched) ? 1.2 : 1,
          boxShadow: (isHovered || isTouched)
            ? `0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)`
            : `0 0 20px rgba(255, 255, 255, 0.05)`,
          borderColor: (isHovered || isTouched) ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner glow */}
        <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            className="text-white/90"
            animate={{ rotate: (isHovered || isTouched) ? 360 : 0 }}
            transition={{ duration: 2, repeat: (isHovered || isTouched) ? Infinity : 0, ease: "linear" }}
          >
            {skill.icon}
          </motion.div>
        </div>

        {/* Pulsing ring */}
        {(isHovered || isTouched) && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/40"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Tooltip/Info panel */}
      <AnimatePresence>
        {(isHovered || isTouched) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 ${
              isMobileDevice ? 'w-[280px]' : 'w-64 md:w-80'
            }`}
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
              <h3 className="text-base md:text-lg font-bold mb-2 text-red-500">
                {t(skill.titleKey)}
              </h3>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                {t(skill.descriptionKey)}
              </p>
            </div>
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 border-l border-t border-white/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Cerrar tooltip al tocar fuera en móvil
    if (isMobileDevice && hoveredIndex !== null) {
      const handleClickOutside = (e: MouseEvent | TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.skill-node')) {
          setHoveredIndex(null);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [hoveredIndex, isMobileDevice]);

  return (
    <motion.section
      key="skills"
      className="relative min-h-screen px-6 py-20 bg-[#101014] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
        <SectionHeader
          title={t("skills.title")}
          description={t("skills.description")}
        />

        {/* Mobile: Cards expandibles apiladas con efectos visuales */}
        <div className="md:hidden flex-1 relative overflow-y-auto overflow-x-hidden pb-20">
          <div className="space-y-4 px-2 w-full">
            {mobileSkills.map((skill, index) => {
              const isExpanded = hoveredIndex === index;
              
              return (
                <motion.div
                  key={`mobile-card-${skill.titleKey}`}
                  className="relative w-full overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Glow effect behind card */}
                  {isExpanded && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 blur-2xl rounded-3xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1.05, opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                      style={{ left: '-10%', right: '-10%', top: '-10%', bottom: '-10%' }}
                    />
                  )}
                  
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl border ${
                      isExpanded ? 'border-white/30' : 'border-white/10'
                    } backdrop-blur-xl cursor-pointer w-full ${
                      isExpanded ? 'shadow-2xl shadow-white/10' : 'shadow-lg'
                    }`}
                    style={{
                      background: isExpanded
                        ? `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%)`
                        : `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 100%)`
                    }}
                    animate={{
                      y: isExpanded ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setHoveredIndex(isExpanded ? null : index)}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden"
                      style={{ width: '150%' }}
                      animate={{
                        x: isExpanded ? ['-50%', '150%'] : '-50%',
                      }}
                      transition={{
                        duration: 2,
                        repeat: isExpanded ? Infinity : 0,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Card content */}
                    <div className="relative p-5 z-10">
                      {/* Header */}
                      <motion.div
                        className={`flex items-center justify-between ${isExpanded ? 'mb-4' : 'mb-2'}`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon container */}
                          <motion.div
                            className="w-14 h-14 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20"
                            animate={{
                              scale: isExpanded ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-white/90">
                              {skill.icon}
                            </div>
                          </motion.div>
                          
                          <div>
                            <h3 className="font-bold text-lg text-white transition-colors duration-300">
                              {t(skill.titleKey)}
                            </h3>
                            {!isExpanded && (
                              <motion.p
                                className="text-xs text-white/60 mt-1 line-clamp-1"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {t(skill.descriptionKey).substring(0, 40)}...
                              </motion.p>
                            )}
                          </div>
                        </div>
                        
                        {/* Expand icon */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={isExpanded ? 'text-white' : 'text-white/60'}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </motion.div>
                      </motion.div>
                      
                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-white/10">
                              <p className="text-sm text-white/80 leading-relaxed">
                                {t(skill.descriptionKey)}
                              </p>
                              
                              {/* Decorative line */}
                              <motion.div
                                className="h-0.5 bg-gradient-to-r from-white/40 to-transparent mt-4 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Constelación interactiva */}
        <div className="hidden md:block flex-1 relative">
          <div className="relative w-full h-full min-h-[500px] skills-constellation">
            {/* SVG para las líneas de conexión */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {skills.map((skill, index) => 
                skills.slice(index + 1).map((otherSkill, offset) => {
                  const otherIndex = index + offset + 1;
                  const x1 = skill.position.x;
                  const y1 = skill.position.y;
                  const x2 = otherSkill.position.x;
                  const y2 = otherSkill.position.y;
                  const isActive = hoveredIndex === index || hoveredIndex === otherIndex;
                  
                  return (
                    <motion.line
                      key={`${index}-${otherIndex}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={isActive ? "rgba(239, 68, 68, 0.8)" : "rgba(239, 68, 68, 0.25)"}
                      strokeWidth={isActive ? "2" : "1.5"}
                      strokeDasharray={isActive ? "0" : "4,4"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: isActive ? 1 : 0.4 
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (index + offset) * 0.05 
                      }}
                    />
                  );
                })
              )}
            </svg>
            
            {/* Skill nodes */}
            {skills.map((skill, index) => (
              <SkillNode
                key={skill.titleKey}
                skill={skill}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
