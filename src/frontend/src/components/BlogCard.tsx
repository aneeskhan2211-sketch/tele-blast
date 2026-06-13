import { Link } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  author: string;
  index?: number;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({
  title,
  excerpt,
  slug,
  date,
  readTime,
  author,
  index = 0,
}: BlogCardProps) {
  return (
    <article
      data-ocid={`blog.item.${index + 1}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Colored top accent bar */}
      <div className="h-1.5 bg-accent" />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Date badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
            {formatDate(date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-3">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60 gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
            <User className="w-3.5 h-3.5" />
            {author}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/blog/$slug"
          params={{ slug }}
          data-ocid={`blog.link.${index + 1}`}
          className="inline-flex items-center justify-center w-full mt-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Read article: ${title}`}
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
