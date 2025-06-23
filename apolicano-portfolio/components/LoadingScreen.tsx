"use client";

import { motion } from "framer-motion";
import { Code, Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101014]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* Logo/Icon animado */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5, 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 border-4 border-red-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Code className="w-6 h-6 text-red-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Agustin Policano
          </h1>
          <p className="text-sm md:text-base text-white/70">
            Frontend Developer
          </p>
        </motion.div>

        {/* Indicador de loading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-white/50"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Cargando portfolio...</span>
        </motion.div>

        {/* Barra de progreso animada */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
          className="mt-8 mx-auto max-w-xs"
        >
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-red-400 h-1 rounded-full shadow-lg shadow-red-500/25"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 