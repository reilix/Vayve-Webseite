"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/layout/Container";
import GalleryFilter from "./GalleryFilter";

const galleryItems = [
  {
    id: 1,
    category: "silent_disco",
    span: "col-span-1 md:col-span-2 row-span-1",
    label: "Main Stage",
    src: "/images/events/event-main-stage.jpg",
  },
  {
    id: 2,
    category: "silent_disco",
    span: "col-span-1 row-span-1",
    label: "DJ Booth",
    src: "/images/events/event-dj-booth.jpg",
  },
  {
    id: 3,
    category: "silent_disco",
    span: "col-span-1 row-span-1",
    label: "Crowd",
    src: "/images/events/event-crowd-phone.jpg",
  },
  {
    id: 4,
    category: "silent_disco",
    span: "col-span-1 row-span-1",
    label: "Fan Love",
    src: "/images/events/event-heart-fan.jpg",
  },
  {
    id: 5,
    category: "silent_disco",
    span: "col-span-1 md:col-span-2 row-span-1",
    label: "Festival Atmosphere",
    src: "/images/events/event-crowd-aerial.jpg",
  },
];

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
                <div className="aspect-[4/3] rounded-[12px] flex items-center justify-center group cursor-pointer overflow-hidden relative hover:shadow-[0_4px_12px_rgba(15,10,26,0.12)] transition-shadow">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
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
