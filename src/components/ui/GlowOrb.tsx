import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  primary: "bg-primary/20",
  secondary: "bg-secondary/20",
  accent: "bg-accent/20",
};

const sizeMap = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
};

export default function GlowOrb({
  color = "primary",
  size = "md",
  className,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full blur-[100px] pointer-events-none",
        colorMap[color],
        sizeMap[size],
        className
      )}
    />
  );
}
