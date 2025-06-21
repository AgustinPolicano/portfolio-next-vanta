import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  motionProps?: any;
}

export default function SectionContainer({ children, className = "", motionProps = {} }: SectionContainerProps) {
  return (
    <motion.section
      className={`relative px-6 py-20 bg-[#101014] text-white overflow-hidden min-h-screen ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      {...motionProps}
    >
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center h-full">
        {children}
      </div>
    </motion.section>
  );
} 