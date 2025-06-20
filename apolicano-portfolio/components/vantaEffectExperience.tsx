// components/VantaEffect.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import WAVES from "vanta/dist/vanta.waves.min";

export default function VantaEffectExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && ref.current) {
      setVantaEffect(
        WAVES({
          el: ref.current,
          THREE,
          color: 0x101014,
          zoom: 0.7,
          shiness: 0,
          waveSpeed: 0,
          backgroundColor: 0x101014,
        })
      );
    }
    return () => vantaEffect?.destroy?.();
  }, [vantaEffect]);

  return <div ref={ref} className="absolute top-0 left-0 w-full h-full z-0" />;
}
