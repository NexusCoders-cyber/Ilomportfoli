import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import type { Update } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: updates = [], isLoading } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  const update = updates.find((u) => u.slug === slug && u.published);

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or hasn't been published yet.
          </p>
          <Link href="/blog">
            <a>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/blog">
            <a className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </a>
          </Link>

          <div className="mb-8">
            {update.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {update.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{update.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {update.publishedAt
                    ? formatDistanceToNow(new Date(update.publishedAt), { addSuffix: true })
                    : "Recently"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{getReadTime(update.contentMarkdown)}</span>
              </div>
            </div>
          </div>

          <Card className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{update.contentMarkdown}</ReactMarkdown>
            </div>
          </Card>
        </motion.div>
      </article>
    </div>
  );
}
