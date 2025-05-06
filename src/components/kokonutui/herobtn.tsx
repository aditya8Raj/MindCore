"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface Btn03Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
  attractRadius?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function HeroBtn({
  className,
  particleCount = 12,
  attractRadius = 50,
  ...props
}: Btn03Props) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (attractRadius * 2) - attractRadius,
      y: Math.random() * (attractRadius * 2) - attractRadius,
    }));
    setParticles(newParticles);
  }, [particleCount, attractRadius]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    // Ensure particles array is not empty and i is a valid index
    if (particles.length > 0) {
      await particlesControl.start((i) => ({
        x: particles[i]?.x ?? 0, // Use optional chaining and nullish coalescing for safety
        y: particles[i]?.y ?? 0, // Use optional chaining and nullish coalescing for safety
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      }));
    }
  }, [particlesControl, particles]);

  return (
    <Button
      className={cn(
        "min-w-40 relative touch-none",
        "bg-violet-100 dark:bg-violet-900",
        "hover:bg-violet-200 dark:hover:bg-violet-800",
        "text-violet-600 dark:text-violet-300",
        "border border-violet-300 dark:border-violet-700",
        "transition-all duration-300 cursor-pointer",
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map(
        (
          particle,
          index // Changed _ to particle for clarity
        ) => (
          <motion.div
            key={particle.id} // Use particle.id for a more stable key
            custom={index}
            initial={{ x: particle.x, y: particle.y }}
            animate={particlesControl}
            className={cn(
              "absolute w-1.5 h-1.5 rounded-full",
              "bg-violet-400 dark:bg-violet-300",
              "transition-opacity duration-300",
              isAttracting ? "opacity-100" : "opacity-40"
            )}
          />
        )
      )}
      <span className="relative w-full flex items-center justify-center gap-2">
        {isAttracting ? "Start Exploring" : "Start Exploring"}
      </span>
    </Button>
  );
}
