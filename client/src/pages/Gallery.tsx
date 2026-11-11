import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { testimonials, galleryImages } from "@/lib/testimonials";
import { Star, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Gallery & Testimonials Page - Premium Wilderness Aesthetic
 * Showcases client reviews and expedition photography
 */

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(galleryImages.map((img) => img.category)));
  const filteredImages = selectedCategory
    ? galleryImages.filter((img) => img.category === selectedCategory)
    : galleryImages;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <button
            onClick={() => setLocation("/")}
            className="text-foreground hover:text-primary transition-colors font-semibold"
          >
            ← Home
          </button>
          <h1 className="text-lg font-bold text-foreground">Gallery & Reviews</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Client Experiences
            </p>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Gallery & Testimonials
            </h1>
            <p className="text-xl text-white/70">
              See the moments and memories from our expeditions through the eyes
              of our adventurers
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              What Our Adventurers Say
            </p>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Read authentic reviews from trekkers who've conquered their peaks
              with Kailasa Trails
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>

                <p className="text-sm font-semibold text-primary">
                  Trek: {testimonial.trek}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Expedition Photography
            </p>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Moments from the Mountains
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={
                selectedCategory === null
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }
            >
              All Photos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg h-64 cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-semibold">{image.alt}</p>
                  <p className="text-white/80 text-sm">{image.trek}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No photos in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">500+</p>
              <p className="text-lg text-white/70">Successful Expeditions</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">1000+</p>
              <p className="text-lg text-white/70">Happy Adventurers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">4.9★</p>
              <p className="text-lg text-white/70">Average Rating</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">15+</p>
              <p className="text-lg text-white/70">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h3 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of adventurers who have conquered their peaks with
            Kailasa Trails. Your expedition awaits.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
          >
            Explore Treks <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-12 text-white">
        <div className="container text-center">
          <p className="text-white/60">
            © 2026 Kailasa Trails. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
