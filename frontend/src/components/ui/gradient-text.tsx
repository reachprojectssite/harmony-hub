"use client"
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof React.ComponentProps<typeof motion.div>> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-flex bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export { GradientText }