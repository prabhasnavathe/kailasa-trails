export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  trek: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  trek: string;
  category: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Adventure Photographer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote:
      "Kailasa Trails transformed my perspective on mountain trekking. The guides were knowledgeable, the expeditions well-prepared, and the experience absolutely unforgettable. I've already booked my next adventure!",
    trek: "Mountain Expedition",
    rating: 5,
  },
  {
    id: "2",
    name: "James Chen",
    role: "Corporate Executive",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote:
      "The sunrise above the mountain ridges was the most rewarding experience of my life. The team's professionalism and attention to detail made me feel completely safe while pushing my limits.",
    trek: "High-Altitude Trek",
    rating: 5,
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    role: "Travel Blogger",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    quote:
      "The expedition exceeded all my expectations. Remote, authentic, and beautifully organized. Kailasa Trails doesn't just offer treks, they offer life-changing transformations.",
    trek: "Wilderness Expedition",
    rating: 5,
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Retired Teacher",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    quote:
      "At 62, I wasn't sure I could conquer high-altitude passes. The guides believed in me, supported me every step, and I stood on the summit at sunrise! Age is just a number with the right team.",
    trek: "Alpine Ridge Trek",
    rating: 5,
  },
  {
    id: "5",
    name: "Emma Watson",
    role: "Environmental Scientist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote:
      "What impressed me most was Kailasa Trails' commitment to sustainable tourism and leave-no-trace wilderness practices. They deeply respect mountain environments and local communities.",
    trek: "Eco Mountain Expedition",
    rating: 5,
  },
  {
    id: "6",
    name: "Michael Park",
    role: "Fitness Coach",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote:
      "The physical training guidance and acclimatization support from Kailasa Trails was exceptional. Professional expedition planning at its finest.",
    trek: "Peak Ascent Expedition",
    rating: 5,
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Mountain summit sunrise",
    trek: "Alpine Ridge Trek",
    category: "landscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
    alt: "Trekkers on high trail",
    trek: "High-Altitude Trek",
    category: "people",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Dramatic mountain cliff",
    trek: "Peak Ascent Expedition",
    category: "landscape",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
    alt: "Summit celebration",
    trek: "Mountain Expedition",
    category: "people",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Pristine alpine valleys",
    trek: "Wilderness Expedition",
    category: "landscape",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
    alt: "Basecamp under starlight",
    trek: "Alpine Ridge Trek",
    category: "camp",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Glacial valley panorama",
    trek: "High-Altitude Trek",
    category: "landscape",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
    alt: "High-altitude mountain shrine",
    trek: "Eco Mountain Expedition",
    category: "culture",
  },
];
