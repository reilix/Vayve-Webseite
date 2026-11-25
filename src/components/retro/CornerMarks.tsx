import { cn } from "@/lib/utils";

/** Passermarken in den vier Ecken eines relativ positionierten Containers. */
export default function CornerMarks({
  className,
  size = "size-3",
}: {
  className?: string;
  size?: string;
}) {
  const base = cn("pointer-events-none absolute z-10 border-acid", size, className);
  return (
    <>
      <span aria-hidden className={cn(base, "left-0 top-0 border-l-2 border-t-2")} />
      <span aria-hidden className={cn(base, "right-0 top-0 border-r-2 border-t-2")} />
      <span aria-hidden className={cn(base, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(base, "bottom-0 right-0 border-b-2 border-r-2")} />
    </>
  );
}
