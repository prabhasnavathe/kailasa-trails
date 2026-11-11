import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog";
import { Clock, User, Calendar, ArrowRight } from "lucide-react";
import { useParams, useLocation } from "wouter";

/**
 * Blog Post Detail Page - Premium Wilderness Aesthetic
 * Displays full blog post with related articles
 */

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");
  const [, setLocation] = useLocation();

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => setLocation("/blog")}
            className="bg-primary hover:bg-primary/90"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <button
            onClick={() => setLocation("/blog")}
            className="text-foreground hover:text-primary transition-colors font-semibold"
          >
            ← Blog
          </button>
          <h1 className="text-lg font-bold text-foreground truncate">
            {post.title}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative pt-32 pb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </section>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-8 text-muted-foreground border-t border-b border-border py-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("#")) {
                const level = paragraph.match(/^#+/)?.[0].length || 1;
                const text = paragraph.replace(/^#+\s/, "");
                const headingClass = `font-bold text-foreground mb-4 ${
                  level === 1 ? "text-4xl" : level === 2 ? "text-3xl" : "text-2xl"
                }`;
                
                if (level === 1) return <h2 key={idx} className={headingClass}>{text}</h2>;
                if (level === 2) return <h3 key={idx} className={headingClass}>{text}</h3>;
                return <h4 key={idx} className={headingClass}>{text}</h4>;
              }

              if (paragraph.startsWith("-")) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 mb-6">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace(/^-\s/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (paragraph.match(/^\d+\./)) {
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-2 mb-6">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace(/^\d+\.\s/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p
                  key={idx}
                  className="text-lg text-muted-foreground leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-3xl">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                {post.author}
              </h4>
              <p className="text-muted-foreground mb-4">
                Expert contributor at Kailasa Trails. Passionate about mountain
                exploration and sustainable adventure travel.
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Follow Author
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <h3 className="text-4xl font-bold mb-12">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="group cursor-pointer"
                  onClick={() => setLocation(`/blog/${relatedPost.slug}`)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm text-primary font-semibold">
                    {relatedPost.category}
                  </span>
                  <h4 className="text-xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container text-center">
          <h3 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h3>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Apply the insights from this article to your next trek. Explore our
            expeditions and start planning your journey today.
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
