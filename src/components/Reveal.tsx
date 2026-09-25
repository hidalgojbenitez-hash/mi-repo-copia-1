import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 40,
        scale: shouldReduceMotion ? 1 : 0.95,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)"
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      }}
      exit={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : -20,
        scale: shouldReduceMotion ? 1 : 0.95,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)"
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
