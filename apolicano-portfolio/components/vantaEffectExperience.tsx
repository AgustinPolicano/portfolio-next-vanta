// components/VantaEffect.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import TOPOLOGY from "vanta/dist/vanta.topology.min.js";

export default function VantaEffectExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && ref.current) {
      setVantaEffect(
        TOPOLOGY({
          el: ref.current,
          THREE,
          color: 0x313c2f,
          backgroundColor: 0x0,
        })
      );
    }
    return () => vantaEffect?.destroy?.();
  }, [vantaEffect]);

  return <div ref={ref} className="absolute top-0 left-0 w-full h-full z-0" />;
}
