import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Search, Tag } from "lucide-react";
import { Link } from "wouter";
import type { Update } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: updates = [], isLoading } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  // Only show published updates
  const publishedUpdates = updates.filter((update) => update.published);

  // Get all unique tags
  const allTags = Array.from(
    new Set(publishedUpdates.flatMap((update) => update.tags))
  );

  // Filter updates
  const filteredUpdates = publishedUpdates.filter((update) => {
    const matchesSearch =
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = !selectedTag || update.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Blog & <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Updates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on development, projects, and technology
          </p>
        </motion.div>

        {/* Search and Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-blog"
            />
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                data-testid="button-tag-all"
              >
                All Posts
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  data-testid={`button-tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Blog Posts */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredUpdates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-lg">
              {publishedUpdates.length === 0
                ? "No blog posts yet. Check back soon!"
                : "No posts found matching your criteria."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredUpdates.map((update, index) => (
              <motion.div
                key={update._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                data-testid={`card-blog-${update.slug}`}
              >
                <Link href={`/blog/${update.slug}`}>
                  <a className="block h-full">
                    <Card className="p-6 hover-elevate transition-all duration-300 h-full flex flex-col">
                      {/* Tags */}
                      {update.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {update.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="font-bold text-2xl mb-3 hover:text-primary transition-colors line-clamp-2">
                        {update.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {update.contentMarkdown.substring(0, 150)}...
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {update.publishedAt
                              ? formatDistanceToNow(new Date(update.publishedAt), {
                                  addSuffix: true,
                                })
                              : "Recently"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{getReadTime(update.contentMarkdown)}</span>
                        </div>
                      </div>
                    </Card>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
