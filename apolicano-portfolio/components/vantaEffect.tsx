// components/VantaEffect.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";

interface VantaProps {
  instanceKey: string;
}

export default function VantaEffect({ instanceKey }: VantaProps) {
  const ref = useRef<HTMLDivElement>(null);

  const effectRef = useRef<any>(null);
  useEffect(() => {
    console.log("mounted", instanceKey);
    // Antes de crear nueva instancia, destruye la anterior si existe
    if (effectRef.current) {
      effectRef.current.destroy();
      effectRef.current = null;
      console.log("destruido");
      console.log(instanceKey);
    }

    if (ref.current) {
      const isHome = instanceKey === "home";
      effectRef.current = WAVES({
        el: ref.current,
        THREE,
        color: 0x101014,
        zoom: 0.7,
        shiness: isHome ? 100 : 0,
        waveSpeed: isHome ? 1 : 0,
        backgroundColor: 0x101014,
      });
    }

    // Cleanup al desmontar el componente
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [instanceKey]);

  return (
    console.log("render"),
    <div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 5 }}
    />
  );
}
