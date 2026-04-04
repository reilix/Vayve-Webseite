"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import Container from "@/components/layout/Container";
import GalleryFilter from "./GalleryFilter";

const galleryItems = [
  { id: 1, category: "silent_disco", span: "col-span-1 row-span-1", label: "Silent Disco Run" },
  { id: 2, category: "silent_disco", span: "col-span-1 md:col-span-2 row-span-1", label: "Silent Disco Crowd" },
  { id: 3, category: "beach", span: "col-span-1 row-span-1", label: "Beach Sunrise" },
  { id: 4, category: "corporate", span: "col-span-1 row-span-1", label: "Corporate Event" },
  { id: 5, category: "weddings", span: "col-span-1 row-span-1", label: "Wedding Ceremony" },
  { id: 6, category: "beach", span: "col-span-1 md:col-span-2 row-span-1", label: "Beach Disco" },
  { id: 7, category: "silent_disco", span: "col-span-1 row-span-1", label: "Headphones" },
  { id: 8, category: "corporate", span: "col-span-1 row-span-1", label: "Team Event" },
  { id: 9, category: "weddings", span: "col-span-1 row-span-1", label: "Wedding Details" },
  { id: 10, category: "beach", span: "col-span-1 row-span-1", label: "Beach Vibes" },
  { id: 11, category: "corporate", span: "col-span-1 row-span-1", label: "Conference" },
  { id: 12, category: "weddings", span: "col-span-1 md:col-span-2 row-span-1", label: "Wedding Party" },
];

const gradients: Record<string, string> = {
  silent_disco: "from-primary/20 to-accent/10",
  beach: "from-secondary/20 to-accent/10",
  corporate: "from-primary/10 to-dark/10",
  weddings: "from-secondary/10 to-primary/10",
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section className="py-8 md:py-12 bg-background">
      <Container>
        <div className="mb-8 md:mb-12">
          <GalleryFilter active={filter} onChange={setFilter} />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={item.span}
              >
                <div
                  className={`aspect-[4/3] rounded-[12px] bg-gradient-to-br ${gradients[item.category]} flex items-center justify-center group cursor-pointer overflow-hidden relative hover:shadow-[0_4px_12px_rgba(15,10,26,0.12)] transition-shadow`}
                >
                  <Camera size={32} className="text-dark/10" />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
