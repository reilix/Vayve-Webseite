export type Locale = "de" | "en";

export interface NavLink {
  key: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface ProcessStep {
  title: string;
  description: string;
}
