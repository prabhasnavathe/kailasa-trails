import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog";
import { Clock, User, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Blog Listing Page - Premium Wilderness Aesthetic
 * Displays all blog posts with filtering by category
 */

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

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
          <h1 className="text-lg font-bold text-foreground">Expedition Stories</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Knowledge & Insights
            </p>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Expedition Stories & Guides
            </h1>
            <p className="text-xl text-white/70">
              Learn from our experts about mountain trekking, training, culture,
              and sustainable adventure travel
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={
                selectedCategory === null
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }
            >
              All Articles
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
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className="relative h-96 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setLocation(`/blog/${filteredPosts[0].slug}`)}
              >
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-full">
                  Featured
                </span>
              </div>

              <div>
                <span className="text-sm text-primary font-semibold">
                  {filteredPosts[0].category}
                </span>
                <h2 className="text-4xl font-bold text-foreground mt-2 mb-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {filteredPosts[0].excerpt}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>{filteredPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{filteredPosts[0].readTime} min read</span>
                  </div>
                </div>

                <Button
                  onClick={() => setLocation(`/blog/${filteredPosts[0].slug}`)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h3 className="text-4xl font-bold mb-12">
            {selectedCategory ? `${selectedCategory} Articles` : "All Articles"}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-border"
                onClick={() => setLocation(`/blog/${post.slug}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs text-primary font-semibold uppercase">
                    {post.category}
                  </span>
                  <h4 className="text-xl font-bold text-foreground mt-3 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min</span>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container max-w-2xl text-center">
          <h3 className="text-4xl font-bold mb-6">
            Get Expert Tips in Your Inbox
          </h3>
          <p className="text-xl text-white/70 mb-8">
            Subscribe to our newsletter for expedition stories, training guides,
            and mountain wisdom
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              Subscribe
            </Button>
          </div>
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
